import { APP_RUNTIME_CONFIG, AppRuntimeConfig } from '@app/app.config';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger as TypeOrmLogger } from 'typeorm';

export class DatabaseLogger implements TypeOrmLogger {
  private readonly logger = new Logger(DatabaseLogger.name);
  private readonly appRuntimeConfig: AppRuntimeConfig;

  constructor(configService: ConfigService) {
    this.appRuntimeConfig = configService.get<AppRuntimeConfig>(APP_RUNTIME_CONFIG);
  }
  logQuery(query: string, parameters?: unknown[]) {
    if (this.appRuntimeConfig.logSQL) {
      this.logger.log(`${query} -- Parameters: ${this.stringifyParameters(parameters)}`);
    }
  }

  logQueryError(error: string, query: string, parameters?: unknown[]) {
    this.logger.error(`${query} -- Parameters: ${this.stringifyParameters(parameters)} -- ${error}`);
  }

  logQuerySlow(time: number, query: string, parameters?: unknown[]) {
    this.logger.warn(`Time: ${time} -- Parameters: ${this.stringifyParameters(parameters)} -- ${query}`);
  }

  logMigration(message: string) {
    this.logger.log(message);
  }

  logSchemaBuild(message: string) {
    this.logger.log(message);
  }

  log(level: 'log' | 'info' | 'warn', message: string) {
    if (level === 'log') {
      return this.logger.log(message);
    }
    if (level === 'info') {
      return this.logger.debug(message);
    }
    if (level === 'warn') {
      return this.logger.warn(message);
    }
  }

  private stringifyParameters(parameters?: unknown[]) {
    try {
      return JSON.stringify(parameters);
    } catch {
      return '';
    }
  }
}
