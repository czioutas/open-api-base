import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { configuration } from './app.config';
import { AppModule } from './app.module';
import { logger } from './logging';

async function bootstrap() {
  const appConfig = configuration().appRuntime;

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger,
    rawBody: true,
    cors: true,
  });

  await app.listen(appConfig.appPort || 3000);
}

bootstrap();
