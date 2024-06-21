import express from 'express';

import { spotifyLogin } from '../../controllers/spotifyController/auth/spotifyLogin';
import { spotifyCallback } from '../../controllers/spotifyController/auth/spotifyCallback';

export const authRouter = express.Router();

authRouter.get('/login', spotifyLogin);
authRouter.get('/callback', spotifyCallback);