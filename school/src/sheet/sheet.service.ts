import { Injectable } from '@nestjs/common';
import { google, sheets_v4 } from 'googleapis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleSheetsService {
  private sheets: sheets_v4.Sheets;
  private sheetId: string;

  constructor(private readonly cfg: ConfigService) {
    /*------------------------------------------------------------------
      ConfigService#get<T>() → T | undefined
      → 기본값('')을 주고, 직후 필수 값 검증
    ------------------------------------------------------------------*/
    this.sheetId = this.cfg.get<string>('google.sheetId', '');

    const serviceEmail = this.cfg.get<string>('google.email', '');
    const privateKey = this.cfg.get<string>('google.key', '');

    if (!this.sheetId || !serviceEmail || !privateKey) {
      throw new Error(
        'Google 서비스 계정 환경변수가 설정되지 않았습니다. .env 파일을 확인하십시오.',
      );
    }

    const auth = new google.auth.JWT(serviceEmail, undefined, privateKey, [
      'https://www.googleapis.com/auth/spreadsheets.readonly',
    ]);

    this.sheets = google.sheets({ version: 'v4', auth });
  }

  async read(range = 'Sheet1!A1:Z1000') {
    const { data } = await this.sheets.spreadsheets.values.get({
      spreadsheetId: this.sheetId,
      range,
    });
    return data.values ?? [];
  }
}
