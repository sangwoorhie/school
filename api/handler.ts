import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
// import { createRequestHandler } from '@vercel/node'; // Vercel에서 직접 라우팅

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors({
    origin: [/\.imweb\.me$/, 'http://localhost'],
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'x-imweb-api-key', 'x-imweb-signature'],
  });
  await app.init();
}

let isBootstrapped = false;

server.all('*', async (req, res, next) => {
  if (!isBootstrapped) {
    await bootstrap();
    isBootstrapped = true;
  }
  next(); // ✅ Nest 라우터로 요청 전달
});

export default server; // ✅ Express 인스턴스를 default export
