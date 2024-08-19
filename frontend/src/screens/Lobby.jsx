import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider.jsx";
import { useNavigate } from "react-router-dom";

const Lobby = () => {
  const [email, setEmail] = useState("");
  const [roomId, setRoomId] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, roomId });
    },
    [email, roomId, socket]
  );

  const handleJoinRoom = useCallback((data) => {
    const { email, roomId } = data;
    navigate(`/room/${roomId}`);
  }, []);

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);

    return () => socket.off("room:join", handleJoinRoom);
  }, [socket, handleJoinRoom]);

  return (
    <div>
      <h1>Lobby</h1>
      <form onSubmit={handleSubmit}>
        <p>Email Id</p>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <p>Room Id</p>
        <input
          type="text"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <input type="submit" value="Join" />
      </form>
    </div>
  );
};

export default Lobby;
