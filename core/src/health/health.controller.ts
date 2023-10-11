import { Permissions } from '@app/auth/decorators/permissions.decorator';
import { Public } from '@app/auth/decorators/public.decorator';
import { Permission } from '@app/auth/permission.enum';
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
  @Permissions(Permission.CREATE_COMPANY)
  checkQuick() {
    return 1;
  }
}
