import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PlaylistsPage.css"; // Import the CSS file

function PlaylistsPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getPlaylists");
        const { message, playlists } = response.data;

        if (message === "Playlists fetched successfully") {
          setIsSuccess(true);
          setPlaylists(playlists);
        } else {
          setIsSuccess(false);
          setError("Failed to fetch playlists");
        }
      } catch (error) {
        setIsSuccess(false);
        setError("Failed to fetch playlists");
        console.error("Error fetching playlists:", error);
      }
    };

    fetchData();
  }, []);

  const handlePlaylistClick = (playlist: any) => {
    setSelectedPlaylist(playlist);
  };

  return (
    <div className="container">
      <h1 className="header">Playlists Page</h1>
      {isSuccess ? (
        <ul className="playlist-list">
          {playlists.map((playlist) => (
            <li
              key={playlist.id}
              className={`playlist-item ${
                selectedPlaylist === playlist ? "selected" : ""
              }`}
              onClick={() => handlePlaylistClick(playlist)}
            >
              {playlist.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="error-message">{error || "Loading..."}</p>
      )}
    </div>
  );
}

export default PlaylistsPage;
