"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const spotifyLogin_1 = require("../controllers/spotifyController/spotifyLogin");
const spotifyCallback_1 = require("../controllers/spotifyController/spotifyCallback");
exports.authRouter = express_1.default.Router();
exports.authRouter.get('/', spotifyLogin_1.spotifyLogin);
exports.authRouter.get('/callback', spotifyCallback_1.spotifyCallback);
