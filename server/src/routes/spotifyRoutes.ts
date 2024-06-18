import express from 'express';
import { getAlbums } from '../controllers/spotifyController/getAlbums';

export const spotifyRouter = express.Router();

spotifyRouter.get('/albums', getAlbums);