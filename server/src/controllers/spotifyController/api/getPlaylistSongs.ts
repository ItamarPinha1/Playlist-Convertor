import { Request, Response } from 'express';
import axios from 'axios';
import { readTokens } from '../../../utils/tokenService';

// Get songs from a specific playlist by ID
export const getPlaylistSongs = async (req: Request, res: Response) => {
  const tokens = readTokens();
  
  if (!tokens || !tokens.accessToken) {
    return res.status(400).send('No access token found. Please authenticate first.');
  }

  if (new Date() > new Date(tokens.expiresAt)) {
    return res.status(401).send('Access token expired. Please re-authenticate.');
  }

  const playlistId = req.params.playlistId; // Extract playlistId from the request URL

  if (!playlistId) {
    return res.status(400).send('Playlist ID is required.');
  }

  try {
    let offset = 0;
    const limit = 50; // Maximum limit for Spotify API
    let allTracks: any[] = [];

    // Fetch tracks from the playlist in batches of 'limit' until all tracks are retrieved
    while (true) {
      const tracksResponse = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=${limit}&offset=${offset}`, {
        headers: {
          'Authorization': `Bearer ${tokens.accessToken}`
        }
      });

      const tracks = tracksResponse.data.items;
      allTracks.push(...tracks);

      // If the number of tracks returned is less than the limit, we have fetched all tracks
      if (tracks.length < limit) break;

      // Increment offset for the next batch
      offset += limit;
    }

    // Respond with the playlist tracks
    res.json({
      message: `Fetched ${allTracks.length} songs from playlist ${playlistId}`,
      tracks: allTracks.map((item: any) => ({
        name: item.track.name,
        artist: item.track.artists.map((artist: any) => artist.name).join(', '),
        album: item.track.album.name
      }))
    });
  } catch (error: any) {
    console.error('Error fetching playlist songs:', error.response?.data || error.message);
    res.status(500).send('Failed to fetch playlist songs');
  }
};
