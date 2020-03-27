import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { MongoError } from 'mongodb';
import { MyLogger } from './logger/my-logger.service';


@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  private readonly logger: MyLogger;

  constructor() {
    this.logger = new MyLogger();
    this.logger.setContext('MongoException');
  }

  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = HttpStatus.BAD_REQUEST;
    let message = exception.name;
    const details = exception.errmsg;

    switch (exception.code) {
      case 11000:
        status = HttpStatus.CONFLICT;
        message = 'Conflict';
        break;
    }

    this.logger.error(
      'message: ' + message + '\n' +
      'details: ' + details + '\n',
      null,
      exception.name
    );

    response
      .status(status)
      .json({
        statusCode: status,
        message,
        details,
        timestamp: new Date().toISOString(),
        path: request.url,
      });


  }
}
