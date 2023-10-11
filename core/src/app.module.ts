import { PGSQL_CONFIG, PgsqlDbConfig, configuration } from '@app/app.config';
import { AuthController } from '@app/auth/auth.controller';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { PermissionGuard } from '@app/auth/guards/permission.guard';
import { AllExceptionsFilter } from '@app/filters/all-exceptions.filter';
import HealthModule from '@app/health/health.module';
import { DatabaseLogger } from '@app/lib/database_logger';
import { AppLoggerMiddleware } from '@app/middleware/app_logger.middleware';
import { classes } from '@automapper/classes';
import {
  MiddlewareConsumer,
  Module,
  UnprocessableEntityException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomapperModule } from '@timonmasberg/automapper-nestjs';
import { AuthModule } from './auth/auth.module';
import { CommunicationModule } from './communication/communication.module';
import { HealthController } from './health/health.controller';
import { UserRoleModule } from './user-role/user-role.module';
import { UserModule } from './users/user.module';
import { SeederService } from './seeder/seeder.service';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const pgsqlConfig = configService.get<PgsqlDbConfig>(PGSQL_CONFIG);
        return {
          logger: new DatabaseLogger(configService),
          type: 'postgres',
          host: pgsqlConfig.host,
          port: pgsqlConfig.port,
          username: pgsqlConfig.appRuntimeUsername,
          password: pgsqlConfig.appRuntimeUserPassword,
          database: pgsqlConfig.dbName,
          autoLoadEntities: true,
          ssl: pgsqlConfig.shouldUseSsl,
          extra: {
            ssl: {
              rejectUnauthorized: pgsqlConfig.rejectUnauthorized,
            },
          },
        };
      },
    }),
    TerminusModule,
    UserModule,
    AuthModule,
    CommunicationModule,
    HealthModule,
    UserRoleModule,
    SeederModule,
  ],
  controllers: [AuthController, HealthController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        exceptionFactory: (errors): any => {
          const formattedErrors = formatErrors(errors);
          return new UnprocessableEntityException(formattedErrors);
        },
      }),
    },
    {
      provide: APP_FILTER,
      useValue: new AllExceptionsFilter(),
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
    SeederService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}

const formatErrors = (errors: ValidationError[], parentName = ''): Array<any> => {
  const formattedErrors = [];

  for (const error of errors) {
    if (Array.isArray(error.value) && !error.constraints) {
      formattedErrors.push(formatErrors(error.children, error.property));
    } else if (Array.isArray(error.children) && error.children.length) {
      const ob = { name: `${parentName}.${error.property}`, errors: [] };
      ob.errors = formatErrors(error.children);
      formattedErrors.push(ob);
    } else {
      const err = {};
      err[error.property] = Object.keys(error.constraints).map((p) => error.constraints[p]);
      formattedErrors.push(err);
    }
  }

  return formattedErrors.flat();
};
