"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeTokens = exports.readTokens = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Define the path to the tokens file
const tokensFilePath = path_1.default.resolve(__dirname, '../../src/config/tokens.json');
// Read tokens from the file
const readTokens = () => {
    if (fs_1.default.existsSync(tokensFilePath)) {
        const data = fs_1.default.readFileSync(tokensFilePath, 'utf8');
        return JSON.parse(data);
    }
    return null;
};
exports.readTokens = readTokens;
// Write tokens to the file
const writeTokens = (tokens) => {
    fs_1.default.writeFileSync(tokensFilePath, JSON.stringify(tokens, null, 2));
};
exports.writeTokens = writeTokens;
