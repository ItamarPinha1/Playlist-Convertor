import express from 'express';
import { authRouter } from './authRoutes';
import { spotifyRouter } from './spotifyRoutes';

export const indexRouter = express.Router();

indexRouter.use('/auth', authRouter);
indexRouter.use('/spotify', spotifyRouter);
