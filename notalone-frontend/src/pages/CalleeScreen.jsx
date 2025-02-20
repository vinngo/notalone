import React from "react";
import { useEffect, useState } from "react";
import { useSocket } from "../SocketContext";
import CallUI from "./CallUI";

const CalleeScreen = ({ peer, role }) => {
  const { socket } = useSocket();
  const [peerConnection, setPeerConnection] = useState(null);

  useEffect(() => {
    const connectione = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
  });

  return <CallUI>YOU ARE A {role}</CallUI>;
};

export default CalleeScreen;
