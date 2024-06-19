import fs from 'fs';
import path from 'path';

// Define the path to the tokens file
const tokensFilePath = path.resolve(__dirname, '../../src/config/tokens.json');

// Interface to type-check token structure
interface Tokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: string; // Store as ISO string
}

// Read tokens from the file
export const readTokens = (): Tokens | null => {
  if (fs.existsSync(tokensFilePath)) {
    const data = fs.readFileSync(tokensFilePath, 'utf8');
    return JSON.parse(data);
  }
  return null;
};

// Write tokens to the file
export const writeTokens = (tokens: Tokens): void => {
  fs.writeFileSync(tokensFilePath, JSON.stringify(tokens, null, 2));
};
