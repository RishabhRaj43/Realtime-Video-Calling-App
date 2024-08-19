import React from "react";
import { Routes, Route } from "react-router-dom";
import Lobby from "./screens/Lobby";
import Room from "./screens/Room";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/room/:roomId" element={<Room />} />
      </Routes>
    </>
  );
};

export default App;
