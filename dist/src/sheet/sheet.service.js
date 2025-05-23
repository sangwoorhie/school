"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleSheetsService = void 0;
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
const config_1 = require("@nestjs/config");
let GoogleSheetsService = class GoogleSheetsService {
    constructor(cfg) {
        this.cfg = cfg;
        /*------------------------------------------------------------------
          ConfigService#get<T>() → T | undefined
          → 기본값('')을 주고, 직후 필수 값 검증
        ------------------------------------------------------------------*/
        this.sheetId = this.cfg.get('google.sheetId', '');
        const serviceEmail = this.cfg.get('google.email', '');
        const privateKey = this.cfg.get('google.key', '');
        if (!this.sheetId || !serviceEmail || !privateKey) {
            throw new Error('Google 서비스 계정 환경변수가 설정되지 않았습니다. .env 파일을 확인하십시오.');
        }
        const auth = new googleapis_1.google.auth.JWT(serviceEmail, undefined, privateKey, [
            'https://www.googleapis.com/auth/spreadsheets.readonly',
        ]);
        this.sheets = googleapis_1.google.sheets({ version: 'v4', auth });
    }
    async read(range = 'Sheet1!A1:Z1000') {
        const { data } = await this.sheets.spreadsheets.values.get({
            spreadsheetId: this.sheetId,
            range,
        });
        return data.values ?? [];
    }
};
exports.GoogleSheetsService = GoogleSheetsService;
exports.GoogleSheetsService = GoogleSheetsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], GoogleSheetsService);
