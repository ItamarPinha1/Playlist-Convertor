import express from 'express';
import { spotifyLogin } from '../controllers/spotifyController/spotifyLogin';
import { spotifyCallback } from '../controllers/spotifyController/spotifyCallback';

export const authRouter = express.Router();

authRouter.get('/login', spotifyLogin);
authRouter.get('/callback', spotifyCallback);
