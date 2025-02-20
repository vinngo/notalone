import React from "react";
import { useEffect, useState } from "react";
import CallUI from "./CallUI";
import { useSocket } from "../SocketContext";

const CallerScreen = ({ peer, role }) => {
  const { socket } = useSocket();
  const [peerConnection, setPeerConnection] = useState(null);

  useEffect(() => {
    const connection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    setPeerConnection(connection);

    //listen for ice candidates
    connection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          target: peer,
          candidate: event.candidate,
        });
      }
    };

    const startCall = async () => {
      try {
        const offer = await connection.createOffer();
        await connection.setLocalDescription(offer);
        socket.emit("offer", {
          target: peer,
          sdp: connection.localDescription,
        });
      } catch (e) {
        console.error("Error creating offer", e);
      }
    };

    startCall();

    socket.on("answer", async ({ sdp }) => {
      await connection.setRemoteDescription(new RTCSessionDescription(sdp));
    });

    return () => {
      socket.off("answer");
    };
  }, [peer, role, socket]);

  return <CallUI>YOU ARE A {role}</CallUI>;
};

export default CallerScreen;
