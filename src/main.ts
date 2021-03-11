import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  app.use(json({ limit: '50mb' }));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
