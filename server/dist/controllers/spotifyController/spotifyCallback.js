"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spotifyCallback = void 0;
const dotenv_1 = require("../../config/dotenv");
const axios_1 = __importDefault(require("axios"));
const spotifyCallback = async (req, res) => {
    const code = req.query.code;
    try {
        const authResponse = await axios_1.default.post('https://accounts.spotify.com/api/token', new URLSearchParams({
            code: code,
            redirect_uri: dotenv_1.REDIRECT_CALLBACK,
            grant_type: 'authorization_code',
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${dotenv_1.CLIENT_ID}:${dotenv_1.CLIENT_SECRET}`).toString('base64'),
            },
        });
        const { access_token, refresh_token } = authResponse.data;
        //res.send(`Access Token: ${access_token}<br>Refresh Token: ${refresh_token}<br><a href="/spotify/albums">View My Albums</a>`);
    }
    catch (error) {
        console.error('Error getting tokens:', error.response?.data || error.message);
        res.status(500).send('Failed to authenticate with Spotify');
    }
};
exports.spotifyCallback = spotifyCallback;
