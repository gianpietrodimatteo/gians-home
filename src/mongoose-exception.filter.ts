import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { Error } from 'mongoose';
import { MyLogger } from './logger/my-logger.service';

@Catch(Error)
export class MongooseExceptionFilter implements ExceptionFilter {
  private readonly logger: MyLogger;

  constructor() {
    this.logger = new MyLogger();
    this.logger.setContext('MongooseException');
  }
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = HttpStatus.BAD_REQUEST;
    const message = exception.name + ': ' + exception.message;
    let details = exception.name + ': ' + exception.message;

    switch (exception.name) {
      case 'MongooseError':
        details = 'general Mongoose error';
        break;
      case 'CastError':
        details = 'Mongoose could not convert a value to the type defined in the schema path. May be in a ValidationError class errors property. This might be an invalid ID format error.';
        break;
      case 'DisconnectedError':
        details = 'This connection timed out in trying to reconnect to MongoDB and will not successfully reconnect to MongoDB unless you explicitly reconnect.';
        break;
      case 'DivergentArrayError':
        details = 'You attempted to save() an array that was modified after you loaded it with a $elemMatch or similar projection';
        break;
      case 'MissingSchemaError':
        details = 'You tried to access a model with mongoose.model() that was not defined';
        break;
      case 'DocumentNotFoundError':
        details = 'The document you tried to save() was not found';
        break;
      case 'ValidatorError':
        details = 'error from an individual schema path\'s validator';
        break;
      case 'ValidationError':
        details = 'error returned from validate() or validateSync(). Contains zero or more ValidatorError instances in .errors property.';
        break;
      case 'MissingSchemaError':
        details = 'You called mongoose.Document() without a schema';
        break;
      case 'ObjectExpectedError':
        details = 'Thrown when you set a nested path to a non-object value with strict mode set.';
        break;
      case 'ObjectParameterError':
        details = 'Thrown when you pass a non-object value to a function which expects an object as a paramter';
        break;
      case 'OverwriteModelError':
        details = 'Thrown when you call mongoose.model() to re-define a model that was already defined.';
        break;
      case 'ParallelSaveError':
        details = 'Thrown when you call save() on a document when the same document instance is already saving.';
        break;
      case 'StrictModeError':
        details = 'Thrown when you set a path that isn\'t the schema and strict mode is set to throw.';
        break;
      case 'VersionError':
        details = 'Thrown when the document is out of sync';
        break;
    }

    this.logger.error(
      'message: ' + message + '\n' +
      'details: ' + details + '\n'
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
