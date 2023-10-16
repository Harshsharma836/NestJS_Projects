// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS for cross-origin requests
  app.enableCors();

  // Serve static files from the 'uploads' directory
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads', // Set the prefix for the static files
  });

  await app.listen(4001);
}

bootstrap();
