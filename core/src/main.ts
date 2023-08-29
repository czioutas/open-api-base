import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const config = new DocumentBuilder()
    .setTitle('OpenAPIBase')
    .setDescription('The OpenAPIBase API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(appConfig.appPort || 3000);
}

bootstrap();
