import express from 'express';
import { getAlbums } from '../../controllers/spotifyController/api/getAlbums';
import { getPlaylists } from '../../controllers/spotifyController/api/getPlaylist';

export const spotifyRouter = express.Router();

spotifyRouter.get("/getAlbums", getAlbums);
spotifyRouter.get("/getPlaylists", getPlaylists);