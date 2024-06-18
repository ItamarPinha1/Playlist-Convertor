"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spotifyLogin = void 0;
const dotenv_1 = require("../../config/dotenv");
const spotifyLogin = (req, res) => {
    const scope = 'user-read-private user-read-email user-library-read';
    const params = new URLSearchParams({
        response_type: 'code',
        client_id: dotenv_1.CLIENT_ID,
        scope: scope,
        redirect_uri: dotenv_1.REDIRECT_CALLBACK,
    });
    res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
};
exports.spotifyLogin = spotifyLogin;
