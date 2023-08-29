import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import winstonDailyRotateFile from 'winston-daily-rotate-file';
import { configuration } from './app.config';

const appConfig = configuration().appRuntime;

const logtail = new Logtail(appConfig.logserviceToken);

export const transports = {
  console: new winston.transports.Console({
    level: 'silly',
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      winston.format.colorize({
        colors: {
          info: 'blue',
          debug: 'yellow',
          error: 'red',
        },
      }),
      winston.format.printf((info) => {
        return `${info.timestamp} [${info.level}] [${info.context ? info.context : info.stack}] ${info.message}`;
      }),
      // winston.format.align(),
    ),
  }),
  combinedFile: new winstonDailyRotateFile({
    dirname: 'logs',
    filename: 'combined',
    extension: '.log',
    level: 'info',
    maxFiles: '14d',
  }),
  errorFile: new winstonDailyRotateFile({
    dirname: 'logs',
    filename: 'error',
    extension: '.log',
    level: 'error',
    maxFiles: '28d',
  }),
  logtail: new LogtailTransport(logtail),
};

const getTransports = (): winston.transport | winston.transport[] => {
  if (process.env.ENABLE_DEBUG_LOG_FILES) {
    return [transports.console, transports.errorFile, transports.combinedFile];
  }
  return [transports.console, transports.logtail];
};

export const logger = WinstonModule.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
  ),
  transports: getTransports(),
});
