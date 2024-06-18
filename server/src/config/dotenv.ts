import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const CLIENT_ID = process.env.CLIENT_ID || '';
export const CLIENT_SECRET = process.env.CLIENT_SECRET || '';
export const REDIRECT_CALLBACK = process.env.REDIRECT_CALLBACK || 'http://localhost:3000/callback';