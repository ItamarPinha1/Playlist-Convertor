"use strict";
// import { Request, Response } from 'express';
// import axios from 'axios';
// const client_id = process.env.CLIENT_ID || '';
// const client_secret = process.env.CLIENT_SECRET || '';
// const redirect_uri = "http://localhost:3000/auth/callback";
// export const spotifyLogin = (req: Request, res: Response) => {
//   const scope = 'user-read-private user-read-email user-library-read';
//   const params = new URLSearchParams({
//     response_type: 'code',
//     client_id: client_id,
//     scope: scope,
//     redirect_uri: redirect_uri,
//   });
//   res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
// };
// export const spotifyCallback = async (req: Request, res: Response) => {
//   const code = req.query.code as string;
//   try {
//     const authResponse = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
//       code: code,
//       redirect_uri: redirect_uri,
//       grant_type: 'authorization_code',
//     }), {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
//       },
//     });
//     const { access_token, refresh_token } = authResponse.data;
//     res.send(`Access Token: ${access_token}<br>Refresh Token: ${refresh_token}<br><a href="/spotify/albums">View My Albums</a>`);
//   } catch (error: any) {
//     console.error('Error getting tokens:', error.response?.data || error.message);
//     res.status(500).send('Failed to authenticate with Spotify');
//   }
// };
// export const getAlbums = async (req: Request, res: Response) => {
//   const access_token = req.headers.authorization?.replace('Bearer ', '');
//   if (!access_token) {
//     return res.status(401).send('Access token is missing. Please log in again.');
//   }
//   try {
//     const albumsResponse = await axios.get('https://api.spotify.com/v1/me/albums', {
//       headers: {
//         'Authorization': `Bearer ${access_token}`
//       }
//     });
//     const albums = albumsResponse.data.items;
//     res.send(albums.map((album: any) => `Album: ${album.album.name} by ${album.album.artists.map((artist: any) => artist.name).join(', ')}`).join('<br>'));
//   } catch (error: any) {
//     console.error('Error fetching albums:', error.response?.data || error.message);
//     res.status(500).send('Failed to fetch user albums');
//   }
// };
