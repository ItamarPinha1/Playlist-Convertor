"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexRouter = void 0;
const express_1 = __importDefault(require("express"));
const authRoutes_1 = require("./authRoutes");
const spotifyRoutes_1 = require("./spotifyRoutes");
exports.indexRouter = express_1.default.Router();
exports.indexRouter.use('/auth', authRoutes_1.authRouter);
exports.indexRouter.use('/spotify', spotifyRoutes_1.spotifyRouter);
