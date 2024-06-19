"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const spotifyController_1 = require("../controllers/spotifyController");
exports.authRouter = express_1.default.Router();
exports.authRouter.get('/login', spotifyController_1.spotifyLogin);
exports.authRouter.get('/callback', spotifyController_1.spotifyCallback);
