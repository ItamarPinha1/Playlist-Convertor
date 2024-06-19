"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spotifyRouter = void 0;
const express_1 = __importDefault(require("express"));
const getAlbums_1 = require("../controllers/spotifyController/getAlbums");
exports.spotifyRouter = express_1.default.Router();
exports.spotifyRouter.get("/getAlbums", getAlbums_1.getAlbums);
