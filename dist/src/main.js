"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [/\.imweb\.me$/, 'http://localhost'], // 아임웹 미리보기·퍼블릭 모두 허용
        methods: ['GET'],
        allowedHeaders: [
            'Content-Type',
            'x-imweb-api-key',
            'x-imweb-signature',
        ],
    }); /* 공식 CORS 옵션 예시 :contentReference[oaicite:0]{index=0} */
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
