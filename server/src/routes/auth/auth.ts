import express from 'express';

import { spotifyLogin } from '../../controllers/spotifyController/auth/spotifyLogin';
import { spotifyCallback } from '../../controllers/spotifyController/auth/spotifyCallback';
import { checkAuth } from '../../controllers/spotifyController/auth/checkAuth';

export const authRouter = express.Router();

authRouter.get('/login', spotifyLogin);
authRouter.get('/callback', spotifyCallback);
authRouter.get('/check-auth', checkAuth);