import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { ServerException } from '../exceptions/server.exception';

@Catch(ServerException)
export class ServerExceptionFilter implements ExceptionFilter {
  catch(exception: ServerException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const errorCode = exception.code;
    const message = exception.getResponse();

    response.status(status).json({
      errorCode,
      message,
      status,
    });
  }
}
