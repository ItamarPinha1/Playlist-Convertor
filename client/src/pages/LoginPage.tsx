import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function LoginPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [msgCode, setmsgCode] = useState("");

  useEffect(() => {
    // Check if there's an authorization code in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      setmsgCode(code);
      // Send the authorization code to the backend to get the tokens
      axios
        .post("http://localhost:3000/auth/callback", { code })
        .then((response) => {
          console.log("Successfully authenticated with Spotify");
          setIsAuthenticated(true);
        })
        .catch((error) => {
          console.error("Failed to authenticate with Spotify:", error);
        });
    }
  }, []);

  const handleLogin = () => {
    // Request the Spotify authorization URL from the backend
    axios
      .get("http://localhost:3000/login")
      .then((response) => {
        // Redirect the user to Spotify's authorization page
        window.location.href = response.data.url;
      })
      .catch((error) => {
        console.error("Error fetching the authorization URL:", error);
      });
  };
  return (
    <>
      <h1>Login Page</h1>

      <div>
        {isAuthenticated ? (
          <p>Successfully authenticated with Spotify! {msgCode}</p>
        ) : (
          <button onClick={handleLogin}>Login with Spotify</button>
        )}
      </div>
    </>
  );
}

export default LoginPage;
