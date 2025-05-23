import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import googleConfig from '../config/google.config';
import { GoogleSheetsService } from './sheet.service';
import { SheetController } from './sheet.controller';

@Module({
  imports: [ConfigModule.forFeature(googleConfig)],
  controllers: [SheetController],
  providers: [GoogleSheetsService],
})
export class SheetModule {}
