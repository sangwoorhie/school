"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('google', () => ({
    sheetId: process.env.GOOGLE_SHEET_ID,
    email: process.env.SA_EMAIL,
    key: (process.env.SA_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
}));
