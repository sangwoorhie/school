import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SheetModule } from './sheet/sheet.module';

@Module({
  /* .env 로딩을 전역으로 활성화 */
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SheetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
