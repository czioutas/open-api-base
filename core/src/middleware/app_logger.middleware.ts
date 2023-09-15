import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AppLoggerMiddleware.name);

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, baseUrl: url, body } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('close', () => {
      const { statusCode, statusMessage } = response;
      const contentLength = response.get('content-length');

      const message = JSON.stringify({
        method,
        url,
        statusCode,
        statusMessage,
        userAgent,
        ip,
        contentLength,
        body,
      });

      if (statusCode >= 500) {
        return this.logger.error(message);
      }

      if (statusCode >= 400) {
        return this.logger.warn(message);
      }

      return this.logger.log(message);
    });

    next();
  }
}
