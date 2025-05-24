import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const server = express();
let app: any; // Nest.js 애플리케이션 인스턴스 저장

async function initializeApp() {
  if (!app) {
    app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    app.enableCors({
      origin: [/\.imweb\.me$/, 'http://localhost', 'https://school-bhwx.vercel.app'],
      methods: ['GET'],
      allowedHeaders: ['Content-Type', 'x-imweb-api-key', 'x-imweb-signature'],
    });
    await app.init();
  }
  return app;
}

// Vercel 서버리스 함수 핸들러
export default async function handler(req: VercelRequest, res: VercelResponse) {
  await initializeApp();

  // Express 서버로 요청 전달
  server(req as any, res as any);
}