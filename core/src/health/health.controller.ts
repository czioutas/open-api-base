import { Public } from '@app/auth/decorators/public.decorator';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Public()
@ApiTags('Health')
@Controller({
  path: '/health',
  version: '1',
})
export class HealthController {
  constructor(
    private healthCheckService: HealthCheckService,
    private typeOrmHealthIndicator: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([() => this.typeOrmHealthIndicator.pingCheck('database')]);
  }

  @Get('/q')
  @HealthCheck()
  checkQuick() {
    return 1;
  }
}
