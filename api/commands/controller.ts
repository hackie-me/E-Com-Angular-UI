import { args, BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import StubRoot from '../app/stubs/main.ts'

export default class Controller extends BaseCommand {
  static commandName = 'gen:controller'
  static description = 'Create a new HTTP controller class'

  static options: CommandOptions = {}

  @args.string({ description: 'The name of the controller to generate' })
  declare name: string

  async run() {
    try {
      let stubRootInstance = new StubRoot();
      if (!this.name || !this.isValidName(this.name)) {
        this.logger.error('Invalid controller name. Please provide a valid name.');
        return;
      }

      const codemods = await this.createCodemods();
      await codemods.makeUsingStub(stubRootInstance.path, 'make/controller.stub', {
        flags: this.parsed.flags,
        entity: this.app.generators.createEntity(this.name),
        singular: false,
      });

      this.logger.success(`Controller ${this.name} has been successfully created.`);
    } catch (error) {
      this.logger.error(`Error while creating controller: ${error.message}`);
    }
  }

  isValidName(name: string) {
    // Basic validation for controller names (e.g., check for special characters or empty names)
    const validPattern = /^[a-zA-Z]+$/;
    return validPattern.test(name);
  }
}