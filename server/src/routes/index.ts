import express from 'express';
import { authRouter } from './auth';
import { spotifyRouter } from './spotifyRoutes';

export const indexRouter = express.Router();

indexRouter.use('/', authRouter);
indexRouter.use('/spotify', spotifyRouter);
