import { useState, useEffect } from "react";
import axios from "axios";

function LoginPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if we're returning from Spotify auth
    const urlParams = new URLSearchParams(window.location.search);
    const authSuccess = urlParams.get("auth_success");

    if (authSuccess === "true") {
      setIsAuthenticated(true);
    } else if (authSuccess === "false") {
      setError("Authentication failed. Please try again.");
    }
  }, []);

  const handleLogin = async () => {
    try {
      // Get the auth URL from your server
      const response = await axios.get("http://localhost:3000/login");

      // Redirect the user to Spotify's auth page
      window.location.href = response.data.authUrl;
    } catch (error) {
      console.error("Error during login:", error);
      setError("Failed to start authentication process. Please try again.");
    }
  };

  return (
    <>
      <h1>Login Page</h1>
      <div>
        {isAuthenticated ? (
          <p>Successfully authenticated with Spotify!</p>
        ) : (
          <>
            <button onClick={handleLogin}>Login with Spotify</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </>
        )}
      </div>
    </>
  );
}

export default LoginPage;
