import express from 'express';
import { authRouter } from './auth/auth';
import { spotifyRouter } from './spotify/spotifyRoutes';
import { homeRouter } from './home/homeRoute';

export const indexRouter = express.Router();

indexRouter.use("/", homeRouter);
indexRouter.use('/', authRouter);
indexRouter.use('/spotify', spotifyRouter);
