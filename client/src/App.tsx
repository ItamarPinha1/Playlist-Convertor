// File: App.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import LoginPage from "./routes/LoginPage";
import HomePage from "./routes/HomePage";
import PlaylistsPage from "./routes/PlaylistsPae/PlaylistsPage";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="login" element={<LoginPage />}></Route>
        <Route path="/getPlaylists" element={<PlaylistsPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
