import { REDIRECT_CALLBACK, CLIENT_ID, CLIENT_SECRET } from "../../config/dotenv";
import axios from "axios";
import { Request, Response } from 'express';

export const spotifyCallback = async (req: Request, res: Response) => {
    const code = req.query.code as string;
  
    try {
      const authResponse = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
        code: code,
        redirect_uri: REDIRECT_CALLBACK,
        grant_type: 'authorization_code',
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
        },
      });
  
      const { access_token, refresh_token } = authResponse.data;
      res.send(`Access Token: ${access_token}<br>Refresh Token: ${refresh_token}<br><a href="/spotify/albums">View My Albums</a>`);
    } catch (error: any) {
      console.error('Error getting tokens:', error.response?.data || error.message);
      res.status(500).send('Failed to authenticate with Spotify');
    }
  };