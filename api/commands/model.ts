
import { args, BaseCommand } from '@adonisjs/core/ace'
import StubRoot from '../app/stubs/main.ts';


export default class Model extends BaseCommand {
  static commandName = 'model'
  static description = 'Generate a new model'

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
      await codemods.makeUsingStub(stubRootInstance.path, 'make/model.stub', {
        flags: this.parsed.flags,
        entity: this.app.generators.createEntity(this.name),
      });

      this.logger.success(`Model ${this.name} has been successfully created.`);
    } catch (error) {
      this.logger.error(`Error while creating model: ${error.message}`);
    }
  }

  isValidName(name: string) {
    // Basic validation for model names (e.g., check for special characters or empty names)
    const validPattern = /^[a-zA-Z]+$/;
    return validPattern.test(name);
  }
}
