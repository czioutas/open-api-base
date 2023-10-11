import { HealthController } from '@app/health/health.controller';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [],
  exports: [],
})
export default class HealthModule {}
