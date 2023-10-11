import { SeederCommand } from '@app/seeder/seeder.command';
import { SeederService } from '@app/seeder/seeder.service';
import { UserRoleModule } from '@app/user-role/user-role.module';
import { Logger, Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';

/**
 * Import and provide seeder classes.
 *
 * @module
 */
@Module({
  imports: [ConsoleModule, UserRoleModule],
  providers: [SeederService, SeederCommand, Logger],
})
export class SeederModule {}
