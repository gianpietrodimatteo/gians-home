import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './logger/my-logger.service';
import { MongoExceptionFilter } from './mongo-exception.filter';
import { MongooseExceptionFilter } from './mongoose-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });
  app.useLogger(new MyLogger());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(
    new MongoExceptionFilter(),
    new MongooseExceptionFilter()
  );
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
