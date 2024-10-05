import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class MakeModelTest extends BaseCommand {
  static commandName = 'make:model-test'
  static description = ''

  static options: CommandOptions = {}

  async run() {
    this.logger.info('Hello world from "MakeModelTest"')
  }
}