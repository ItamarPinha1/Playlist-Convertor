import { Request, Response } from 'express';
import { CLIENT_ID, REDIRECT_CALLBACK } from "../../../config/dotenv";

export const spotifyLogin = (req: Request, res: Response) => {

  const scope = 'user-read-private user-read-email user-library-read';
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: scope,
    redirect_uri: REDIRECT_CALLBACK,
  });

  const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
  
  res.json({"authUrl": authUrl});
};