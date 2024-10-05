import { args, BaseCommand } from '@adonisjs/core/ace';
import type { CommandOptions } from '@adonisjs/core/types/ace';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class Generate extends BaseCommand {
  static commandName = 'generate'
  static description = 'Generate model class with properties based on migration'

  static options: CommandOptions = {}

  @args.string({ description: 'The name of the migration file (without timestamp)' })
  declare name: string

  async run() {
    this.logger.info('Starting model generation...')

    // Step 1: Identify the migration file to parse
    const migrationDir = path.join(__dirname, '../database/migrations')
    const migrationFiles = await fs.readdir(migrationDir)

    // Use regex to find the correct migration file by name
    const migrationRegex = new RegExp(`\\d+_create_${this.name}_table`, 'i')
    const migrationFile = migrationFiles.find(file => migrationRegex.test(file))

    if (!migrationFile) {
      throw new Error(`Migration file for '${this.name}' not found!`)
    }
    const migrationPath = path.join(migrationDir, migrationFile)
    const migrationContent = await fs.readFile(migrationPath, 'utf-8')

    // Step 2: Parse the migration file to extract fields
    const fields = this.extractFieldsFromMigration(migrationContent)

    // Step 3: Generate the model file based on the fields
    await this.generateModelFile(this.name, fields)

    this.logger.success('Model generated successfully!')
  }

  /**
   * Extract fields from migration content
   */
  private extractFieldsFromMigration(migrationContent: string) {
    const fieldRegex = /table\.(\w+)\s*\(['"`](\w+)['"`](?:,\s*\d+)?\)/g;
    const fields: { type: string, name: string }[] = []

    let match
    while ((match = fieldRegex.exec(migrationContent)) !== null) {
      if (match[1] === 'increments' && match[2] === 'id') continue;
      fields.push({ type: match[1], name: match[2] })
    }
    return fields
  }


  private toCamelCase(snakeCase: string): string {
    return snakeCase
      .toLowerCase()
      .split('_')
      .map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }

  /*
  * Execute a command in the terminal
  */
  // private async executeCommand(command: string): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     exec(command, (error, stdout, stderr) => {
  //       if (error) {
  //         reject(`Error: ${error.message}`);
  //         return;
  //       }
  //       if (stderr) {
  //         reject(`Stderr: ${stderr}`);
  //         return;
  //       }
  //       console.log('Stdout:', stdout);
  //       resolve(stdout);
  //     });
  //   });
  // }
  /**
   * Generate the model file
   */
  private async generateModelFile(modelName: string, fields: { type: string, name: string }[]) {
    // Run your custom command that generates the model using your custom stub
    // await this.executeCommand(`node ace model ${modelName}`)

    // Define the model directory and path
    const modelDir = path.join(__dirname, '../app/models')
    const modelPath = path.join(modelDir, `${modelName.slice(0, -1)}.ts`)

    // Read the existing model file created by the stub
    let modelContent = await fs.readFile(modelPath, 'utf-8')

    // Prepare properties from the extracted fields
    const existingProperties = modelContent.match(/declare\s+(\w+):/g)?.map(prop => prop.match(/declare\s+(\w+):/)?.[1]) || [];

    const properties = fields.map(field => {
      const camelCaseFieldName = this.toCamelCase(field.name);

      // Skip if the property is already declared
      if (existingProperties.includes(camelCaseFieldName)) {
        return ''; // Skip this property
      }

      return `\n\n\t@column({ columnName: '${field.name}' })\n\tdeclare ${camelCaseFieldName}: ${this.mapToTypescriptType(field.type)}\n`;
    }).filter(prop => prop !== '').join('\n'); // Filter out empty strings

    // Inject properties before the closing curly brace
    modelContent = modelContent.replace(/\s*}\s*$/, `${properties}\n\n}`);

    // Write the updated model content back to the file
    await fs.writeFile(modelPath, modelContent, 'utf-8')

    this.logger.info(`Model ${modelName} created and updated with properties at ${modelPath}`)
    this.mapToTypescriptType('')
  }

  /**
   * Map migration column type to TypeScript type
   */
  private mapToTypescriptType(migrationType: string): string {
    const typeMap: Record<string, string> = {
      // Common Types
      'string': 'string',
      'integer': 'number',
      'boolean': 'boolean',
      'text': 'string',
      'float': 'number',
      'decimal': 'number',
      'json': 'any',
      'uuid': 'string',
      'enum': 'string',

      // Specific Types
      'increments': 'number',
      'bigIncrements': 'number',
      'tinyint': 'number',
      'smallint': 'number',
      'mediumint': 'number',
      'bigint': 'number',
      'bigInteger': 'number',
      'date': 'Date',
      'dateTime': 'Date',
      'datetime': 'Date',
      'time': 'Date',
      'timestamp': 'Date',
      'geometry': 'any',
      'geography': 'any',
      'point': 'any',
      'binary': 'Buffer',
      'jsonb': 'any',
    }

    return typeMap[migrationType] || 'any';
  }
}
