import { args, BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import StubRoot from '../app/stubs/main.ts'

export default class Migration extends BaseCommand {
  static commandName = 'migration'
  static description = 'make a custom migration file'

  static options: CommandOptions = {}

  @args.string({ description: 'The name of the model to generate' })
  declare name: string
  
  async run() {
    try {
      let stubRootInstance = new StubRoot(); 
      if (!this.name || !this.isValidName(this.name)) {
        this.logger.error('Invalid model name. Please provide a valid name.');
        return;
      }

      const codemods = await this.createCodemods();
      await codemods.makeUsingStub(stubRootInstance.path, 'make/migration.stub', {
        flags: this.parsed.flags,
        entity: this.app.generators.createEntity(this.name),
      });

      this.logger.success(`Migration ${this.name} has been successfully created.`);
    } catch (error) {
      this.logger.error(`Error while creating migration: ${error.message}`);
    }
  }

  isValidName(name: string) {
    // Basic validation for model names (e.g., check for special characters or empty names)
    const validPattern = /^[a-zA-Z]+$/;
    return validPattern.test(name);
  }
}