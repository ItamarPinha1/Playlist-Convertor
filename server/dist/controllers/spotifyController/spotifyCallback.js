"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spotifyCallback = void 0;
const dotenv_1 = require("../../config/dotenv");
const axios_1 = __importDefault(require("axios"));
const tokenService_1 = require("../../utils/tokenService");
const spotifyCallback = async (req, res) => {
    const code = req.query.code || null;
    if (!code) {
        return res.status(400).send('Code is missing in callback query parameters');
    }
    try {
        const authResponse = await axios_1.default.post('https://accounts.spotify.com/api/token', new URLSearchParams({
            code: code.toString(),
            redirect_uri: dotenv_1.REDIRECT_CALLBACK,
            grant_type: 'authorization_code',
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${dotenv_1.CLIENT_ID}:${dotenv_1.CLIENT_SECRET}`).toString('base64'),
            },
        });
        console.log(authResponse.data);
        const access_token = authResponse.data.access_token;
        const refresh_token = authResponse.data.refresh_token;
        const expires_in = authResponse.data.expires_in;
        const expiresAt = new Date(Date.now() + expires_in * 1000).toISOString();
        (0, tokenService_1.writeTokens)({ accessToken: access_token, refreshToken: refresh_token, expiresAt });
        res.send(`Access Token: ${access_token}<br>Refresh Token: ${refresh_token}<br><a href="/spotify/getAlbums">View My Albums</a>`);
    }
    catch (error) {
        console.error('Error getting tokens:', error.response?.data || error.message);
        res.status(500).send('Failed to authenticate with Spotify');
    }
};
exports.spotifyCallback = spotifyCallback;
