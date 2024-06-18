"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REDIRECT_CALLBACK = exports.CLIENT_SECRET = exports.CLIENT_ID = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT || 3000;
exports.CLIENT_ID = process.env.CLIENT_ID || '';
exports.CLIENT_SECRET = process.env.CLIENT_SECRET || '';
exports.REDIRECT_CALLBACK = process.env.REDIRECT_CALLBACK || 'http://localhost:3000/callback';
