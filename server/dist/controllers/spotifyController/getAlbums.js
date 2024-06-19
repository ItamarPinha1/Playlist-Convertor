"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlbums = void 0;
const axios_1 = __importDefault(require("axios"));
const tokenService_1 = require("../../utils/tokenService");
const getAlbums = async (req, res) => {
    const tokens = (0, tokenService_1.readTokens)();
    if (!tokens || !tokens.accessToken) {
        return res.status(400).send('No access token found. Please authenticate first.');
    }
    if (new Date() > new Date(tokens.expiresAt)) {
        return res.status(401).send('Access token expired. Please re-authenticate.');
    }
    try {
        const albumsResponse = await axios_1.default.get('https://api.spotify.com/v1/me/albums', {
            headers: {
                'Authorization': `Bearer ${tokens.accessToken}`
            }
        });
        const albums = albumsResponse.data.items;
        res.send(albums.map((album) => `Album: ${album.album.name} by ${album.album.artists.map((artist) => artist.name).join(', ')}`).join('<br>'));
    }
    catch (error) {
        console.error('Error fetching albums:', error.response?.data || error.message);
        res.status(500).send('Failed to fetch user albums');
    }
};
exports.getAlbums = getAlbums;
