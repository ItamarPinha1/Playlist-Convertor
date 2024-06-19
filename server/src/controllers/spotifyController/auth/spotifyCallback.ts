import { REDIRECT_CALLBACK, CLIENT_ID, CLIENT_SECRET } from "../../../config/dotenv";
import axios from "axios";
import { Request, Response } from 'express';
import { writeTokens } from "../../../utils/tokenService";

export const spotifyCallback = async (req: Request, res: Response) => {
  const code = req.query.code || null;

  if (!code) {
    return res.status(400).send('Code is missing in callback query parameters');
  }

  try {
    const authResponse = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
      code: code.toString(),
      redirect_uri: REDIRECT_CALLBACK,
      grant_type: 'authorization_code',
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
      },
    });

    console.log(authResponse.data);

    const access_token = authResponse.data.access_token;
    const refresh_token = authResponse.data.refresh_token;
    const expires_in = authResponse.data.expires_in;

    const expiresAt = new Date(Date.now() + expires_in * 1000).toISOString();
    
    writeTokens({ accessToken: access_token, refreshToken: refresh_token, expiresAt });

    res.redirect('/home');

    //res.send(`Access Token: ${access_token}<br>Refresh Token: ${refresh_token}<br><a href="/spotify/getAlbums">View My Albums</a>`);
  } catch (error: any) {
    console.error('Error getting tokens:', error.response?.data || error.message);
    res.status(500).send('Failed to authenticate with Spotify');
  }
};