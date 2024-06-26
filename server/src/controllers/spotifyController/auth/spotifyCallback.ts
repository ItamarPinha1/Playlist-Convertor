import { Request, Response } from 'express';
import axios from 'axios';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_CALLBACK } from '../../../config/dotenv';
import { writeTokens } from '../../../utils/tokenService';

export const spotifyCallback = async (req: Request, res: Response) => {

  const code = req.query.code || null;

  if (!code) {
    return res.status(400).json({ error: 'missing_code' });
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

    const { access_token, refresh_token, expires_in } = authResponse.data;
    const expiresAt = new Date(Date.now() + expires_in * 1000).toISOString();

    await writeTokens({ accessToken: access_token, refreshToken: refresh_token, expiresAt });

    res.redirect('http://localhost:5173/login?auth_success=true');
  } catch (error) {
    console.error('Error getting tokens:', error);
    res.status(500).json({ error: 'auth_failed' });
  }
};