import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [/\.imweb\.me$/, 'http://localhost'], // 아임웹 미리보기·퍼블릭 모두 허용
    methods: ['GET'],
    allowedHeaders: [
      'Content-Type',
      'x-imweb-api-key',
      'x-imweb-signature',
    ],
  }); /* 공식 CORS 옵션 예시 :contentReference[oaicite:0]{index=0} */
  
  const config = new DocumentBuilder()
    .setTitle('School API')
    .setDescription('다번역성경 아임웹 연동용 API 문서입니다')
    .setVersion('1.0')
    .addTag('sheets') // 필요한 경우 태그
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document); // 접속: https://school-bhwx.vercel.app/api-docs

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
