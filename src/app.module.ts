import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressModule } from './address/address.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { DatingMiddleware } from './dating.middleware';
import { LoggerModule } from './logger/logger.module';
import { MongoExceptionFilter } from './mongo-exception.filter';
import { MongooseExceptionFilter } from './mongoose-exception.filter';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGOLAB_URI),
    AddressModule,
    CommonModule,
    LoggerModule,
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: MongoExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: MongooseExceptionFilter
    }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DatingMiddleware)
      .exclude(
        { path: '*', method: RequestMethod.OPTIONS },
        { path: '*', method: RequestMethod.HEAD },
        { path: '*', method: RequestMethod.GET },
        { path: '*', method: RequestMethod.DELETE }
      )
      .forRoutes('*');
  }

}
