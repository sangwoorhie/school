// school/api/handler.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { createServer, proxy } from 'aws-serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';

let cachedServer: any;

async function bootstrapServer() {
  const expressApp = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  app.enableCors({
    origin: [/\.imweb\.me$/, 'http://localhost'],
    methods: ['GET'],
    allowedHeaders: [
      'Content-Type',
      'x-imweb-api-key',
      'x-imweb-signature',
    ],
  });
  await app.init();
  return createServer(expressApp);
}

export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
