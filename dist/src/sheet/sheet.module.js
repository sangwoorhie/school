"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SheetModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const google_config_1 = require("../config/google.config");
const sheet_service_1 = require("./sheet.service");
const sheet_controller_1 = require("./sheet.controller");
let SheetModule = class SheetModule {
};
exports.SheetModule = SheetModule;
exports.SheetModule = SheetModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forFeature(google_config_1.default)],
        controllers: [sheet_controller_1.SheetController],
        providers: [sheet_service_1.GoogleSheetsService],
    })
], SheetModule);
//# sourceMappingURL=sheet.module.js.map