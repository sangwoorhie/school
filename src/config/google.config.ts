import { registerAs } from '@nestjs/config';

export default registerAs('google', () => ({
  sheetId: process.env.GOOGLE_SHEET_ID,
  email: process.env.SA_EMAIL,
  key:  (process.env.SA_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
}));
