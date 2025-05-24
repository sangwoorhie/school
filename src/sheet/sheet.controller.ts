import {
  Controller,
  Get,
  Param,
  Headers,
  ForbiddenException,
} from '@nestjs/common';
import { GoogleSheetsService } from './sheet.service';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Controller('sheets')
export class SheetController {
  constructor(
    private readonly sheets: GoogleSheetsService,
    private readonly cfg: ConfigService,
  ) {}

  private verifyApiKey(apiKey?: string): boolean {
    return apiKey === this.cfg.get<string>('IMWEB_API_KEY', '');
  }

  private verifyHmac(signature: string | undefined, payload: string): boolean {
    if (!signature) return false;
    const secret = this.cfg.get<string>('IMWEB_SECRET_KEY', '');
    const calc = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
    return signature === calc;
  }

  // GET /sheets/Sheet1!A1:E20
  @Get(':range')
  async getRange(
    @Param('range') range: string,
    @Headers('x-imweb-api-key') apiKey: string,
    @Headers('x-imweb-signature') sig: string,
  ) {

    // 방법 ① API Key 검증
    if (!this.verifyApiKey(apiKey)) {
      // 방법 ② HMAC 검증 (주석 해제 시 병행)
      if (!this.verifyHmac(sig, range))
        throw new ForbiddenException('인증 실패');
    }
    return await this.sheets.read(range);
  }
}
