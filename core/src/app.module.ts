import { PGSQL_CONFIG, PgsqlDbConfig, configuration } from '@app/app.config';
import { AuthController } from '@app/auth/auth.controller';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { AllExceptionsFilter } from '@app/filters/all-exceptions.filter';
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
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomapperModule } from '@timonmasberg/automapper-nestjs';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CommunicationModule } from './communication/communication.module';
import { UserModule } from './users/user.module';

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
    UserModule,
    AuthModule,
    CommunicationModule,
  ],
  controllers: [AppController, AuthController],
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
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: RlsInterceptor,
    // },
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
