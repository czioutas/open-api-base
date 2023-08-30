import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: Error, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const respObj = this.getResponseMessage(exception, request);
    response.status(respObj.statusCode).json(respObj);
  }

  getResponseMessage = (exception: Error, request: any): any => {
    const { name: errorType } = exception;

    if (exception instanceof HttpException) {
      const res: any = exception.getResponse();

      this.logger.error(
        JSON.stringify({
          error: exception.name,
          exception: exception.message,
          stack: exception.stack,
        }),
      );

      return {
        statusCode: res.statusCode ?? 500,
        path: request.url,
        errorType: res.error || errorType,
        errorMessage: res.message,
      };
    } else if (typeof exception === 'string') {
      this.logger.error(
        JSON.stringify({
          error: exception,
        }),
      );
      return {
        statusCode: exception['statusCode'] ?? HttpStatus.INTERNAL_SERVER_ERROR,
        path: request.url,
        errorType,
        exception,
      };
    } else {
      this.logger.error(
        JSON.stringify({
          error: exception.name,
          exception: exception.message,
          stack: exception.stack,
        }),
      );

      return {
        statusCode: exception['statusCode'] ?? HttpStatus.INTERNAL_SERVER_ERROR,
        path: request.url,
        errorType,
        exception,
      };
    }
  };
}
