import { Request, Response } from 'express';
import axios from 'axios';

export const getAlbums = async (req: Request, res: Response) => {
    const access_token = req.headers.authorization?.replace('Bearer ', '');
  
    if (!access_token) {
      return res.status(401).send('Access token is missing. Please log in again.');
    }
  
    try {
      const albumsResponse = await axios.get('https://api.spotify.com/v1/me/albums', {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      });
  
      const albums = albumsResponse.data.items;
      res.send(albums.map((album: any) => `Album: ${album.album.name} by ${album.album.artists.map((artist: any) => artist.name).join(', ')}`).join('<br>'));
    } catch (error: any) {
      console.error('Error fetching albums:', error.response?.data || error.message);
      res.status(500).send('Failed to fetch user albums');
    }
  };