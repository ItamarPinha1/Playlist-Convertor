import { Request, Response } from 'express';
import axios from 'axios';
import { readTokens } from '../../../utils/tokenService';

export const getAlbums = async (req: Request, res: Response) => {
  const tokens = readTokens();
  
  if (!tokens || !tokens.accessToken) {
      return res.status(400).send('No access token found. Please authenticate first.');
    }

    if (new Date() > new Date(tokens.expiresAt)) {
      return res.status(401).send('Access token expired. Please re-authenticate.');
    }
  
    try {
      const albumsResponse = await axios.get('https://api.spotify.com/v1/me/albums', {
        headers: {
          'Authorization': `Bearer ${tokens.accessToken}`
        }
      });
  
      const albums = albumsResponse.data.items;

      res.send(albums.map((album: any) => `Album: ${album.album.name} by ${album.album.artists.map((artist: any) => artist.name).join(', ')}`).join('<br>'));
    } catch (error: any) {
      console.error('Error fetching albums:', error.response?.data || error.message);
      res.status(500).send('Failed to fetch user albums');
    }
  };