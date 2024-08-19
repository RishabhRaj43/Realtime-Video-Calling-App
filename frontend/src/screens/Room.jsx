import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider.jsx";
import ReactPlayer from "react-player";

const Room = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [ mystream, setMystream ] = useState(null);

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`user ${email} joined`);
    setRemoteSocketId(id);
  });

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setMystream(stream);
    // socket.emit("call:user", { remoteSocketId });
  }, [socket, remoteSocketId]);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    return () => socket.off("user:joined", handleUserJoined);
  }, [socket, handleUserJoined]);

  return (
    <div>
      <h1>Room</h1>
      <h3>{remoteSocketId ? "Connected" : "Not Connected"}</h3>
      {remoteSocketId && <button onClick={handleCallUser}>Call</button>}
      {
        mystream && <ReactPlayer url={mystream} playing={true} width="100%" height="100%" />
      }
    </div>
  );
};

export default Room;
