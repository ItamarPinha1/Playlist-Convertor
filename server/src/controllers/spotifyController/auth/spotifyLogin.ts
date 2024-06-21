import { CLIENT_ID, REDIRECT_CALLBACK} from "../../../config/dotenv";
import { Request, Response } from 'express';

export const spotifyLogin = (req: Request, res: Response) => {
  const scope = 'user-read-private user-read-email user-library-read'; // Added user-library-read scope
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: scope,
    redirect_uri: REDIRECT_CALLBACK,
  });

  res.json({ url: `https://accounts.spotify.com/authorize?${params.toString()}` });
};