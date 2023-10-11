import { SeederService } from '@app/seeder/seeder.service';
import { Logger } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';

@Console()
export class SeederCommand {
  private readonly logger = new Logger(SeederCommand.name);

  constructor(private readonly seederService: SeederService) {}

  @Command({
    command: 'seed',
    description: '',
  })
  async seed(): Promise<void> {
    this.logger.log('Command Seed starting...');
    await this.seederService.seedAllAsync();
    this.logger.log('Command Seed ended.');
  }
}
