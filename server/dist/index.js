"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const client_id = process.env.CLIENT_ID; // Spotify Client ID
const client_secret = process.env.CLIENT_SECRET; // Spotify Client Secret
const redirect_uri = "http://localhost:3000/callback"; // Your redirect URI
if (!client_id || !client_secret) {
    throw new Error("Missing CLIENT_ID or CLIENT_SECRET in environment variables");
}
// To store tokens temporarily (consider a more secure storage for production)
let access_token = '';
let refresh_token = '';
// Route to start the Spotify login process
app.get('/', (req, res) => {
    const scope = 'user-read-private user-read-email user-library-read'; // Added user-library-read scope
    const params = new URLSearchParams({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
    });
    res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
});
// Callback route after Spotify login
app.get('/callback', async (req, res) => {
    const code = req.query.code || null;
    if (!code) {
        return res.status(400).send('Code is missing in callback query parameters');
    }
    try {
        const authResponse = await axios_1.default.post('https://accounts.spotify.com/api/token', new URLSearchParams({
            code: code.toString(),
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code',
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
            },
        });
        // Store the received tokens
        access_token = authResponse.data.access_token;
        refresh_token = authResponse.data.refresh_token;
        res.send(`Access Token: ${access_token}<br>Refresh Token: ${refresh_token}<br><a href="/albums">View My Albums</a>`);
    }
    catch (error) {
        console.error('Error getting tokens:', error.response?.data || error.message);
        res.status(500).send('Failed to authenticate with Spotify');
    }
});
// Route to get user's saved albums
app.get('/albums', async (req, res) => {
    if (!access_token) {
        return res.status(401).send('Access token is missing. Please log in again.');
    }
    try {
        const albumsResponse = await axios_1.default.get('https://api.spotify.com/v1/me/albums', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        const albums = albumsResponse.data.items;
        res.send(albums.map((album) => `Album: ${album.album.name} by ${album.album.artists.map((artist) => artist.name).join(', ')}`).join('<br>'));
    }
    catch (error) {
        console.error('Error fetching albums:', error.response?.data || error.message);
        res.status(500).send('Failed to fetch user albums');
    }
});
// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
