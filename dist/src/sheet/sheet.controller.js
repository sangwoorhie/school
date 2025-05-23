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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SheetController = void 0;
const common_1 = require("@nestjs/common");
const sheet_service_1 = require("./sheet.service");
const config_1 = require("@nestjs/config");
const crypto = require("crypto");
let SheetController = class SheetController {
    sheets;
    cfg;
    constructor(sheets, cfg) {
        this.sheets = sheets;
        this.cfg = cfg;
    }
    verifyApiKey(apiKey) {
        return apiKey === this.cfg.get('IMWEB_API_KEY', '');
    }
    verifyHmac(signature, payload) {
        if (!signature)
            return false;
        const secret = this.cfg.get('IMWEB_SECRET_KEY', '');
        const calc = crypto
            .createHmac('sha256', secret)
            .update(payload)
            .digest('hex');
        return signature === calc;
    }
    async getRange(range, apiKey, sig) {
        if (!this.verifyApiKey(apiKey)) {
            if (!this.verifyHmac(sig, range))
                throw new common_1.ForbiddenException('인증 실패');
        }
        return await this.sheets.read(range);
    }
};
exports.SheetController = SheetController;
__decorate([
    (0, common_1.Get)(':range'),
    __param(0, (0, common_1.Param)('range')),
    __param(1, (0, common_1.Headers)('x-imweb-api-key')),
    __param(2, (0, common_1.Headers)('x-imweb-signature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], SheetController.prototype, "getRange", null);
exports.SheetController = SheetController = __decorate([
    (0, common_1.Controller)('sheets'),
    __metadata("design:paramtypes", [sheet_service_1.GoogleSheetsService,
        config_1.ConfigService])
], SheetController);
//# sourceMappingURL=sheet.controller.js.map