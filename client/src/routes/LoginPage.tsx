import { useState, useEffect } from "react";
import axios from "axios";

function LoginPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get("success");
    const error = urlParams.get("error");

    if (success === "true") {
      setIsAuthenticated(true);
    } else if (error) {
      setError("Authentication failed. Please try again.");
    }

    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get("http://localhost:3000/check-auth");
      setIsAuthenticated(response.data.isAuthenticated);
      console.log(response);
    } catch (error) {
      console.error("Error checking auth status:", error);
    }
  };

  const handleLogin = () => {
    window.location.href = "http://localhost:3000/login";
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
