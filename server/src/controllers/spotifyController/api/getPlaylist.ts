import { Request, Response } from 'express';
import axios from 'axios';
import { readTokens, writeTokens } from '../../../utils/tokenService';

export const getPlaylists = async (req: Request, res: Response) => {

  const tokens = readTokens();
  
  if (!tokens || !tokens.accessToken) {
    return res.status(400).send('No access token found. Please authenticate first.');
  }

  if (new Date() > new Date(tokens.expiresAt)) {
    return res.status(401).send('Access token expired. Please re-authenticate.');
  }

  let limit = 10; // Set your desired limit (max 50)
  let offset = 0;
  let allPlaylists: any[] = []; // To store all playlists
  let playlistIds: string[] = []; // To store playlist IDs

  try {
    while (true) {
      const playlistsResponse = await axios.get(`https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`, {
        headers: {
          'Authorization': `Bearer ${tokens.accessToken}`
        }
      });

      const playlists = playlistsResponse.data.items;
      if (playlists.length === 0) break; // Exit loop if no more playlists are found

      allPlaylists.push(...playlists); // Add the current batch of playlists to the array

      // Extract and add playlist IDs to the playlistIds array
      playlistIds.push(...playlists.map((playlist: any) => playlist.id));

      offset += limit; // Increment offset to fetch the next batch

      // If the number of playlists returned is less than the limit, break the loop as there are no more playlists to fetch
      if (playlists.length < limit) break;
    }

    // For debugging, let's log the total number of playlists fetched
    console.log(`Total playlists fetched: ${allPlaylists.length}`);

    // Update tokens with playlist IDs and save them
    const updatedTokens = {
      ...tokens,
      playlistsIds: playlistIds
    };

    writeTokens(updatedTokens); // Save the updated tokens with playlist IDs

    // Send a response with playlist names and IDs
    const playlistNamesAndIds = allPlaylists.map((playlist: any) => ({
      name: playlist.name,
      id: playlist.id
    }));

    res.json({
      message: 'Playlists fetched successfully',
      playlists: playlistNamesAndIds,
      isSucces: true
    });
  } catch (error: any) {
    console.error('Error fetching playlists:', error.response?.data || error.message);
    res.status(500).send('Failed to fetch user playlists');
  }
};
