/* eslint-disable react-refresh/only-export-components */
'use client';
import { addConnection, removeConnection } from "@/store/chat/chatSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { createContext, useContext, useEffect, useState } from "react";
import socketio from "socket.io-client";

// Function to establish a socket connection with authorization token
const getSocket = (token?: string) => {
  if (!token) {
    console.error("No token found. Socket connection aborted.");
    return null;
  }
  const SOCKET_URI = process.env.NODE_ENV === 'production' 
    ? process.env.NEXT_PUBLIC_SOCKET_URI || 'https://lms-backend-mh2d.onrender.com'
    : 'http://localhost:8000';

    

  return socketio(SOCKET_URI!, {
    withCredentials: true,
    auth: { token },
  });
};

// Create a context to hold the socket instance
const SocketContext = createContext<{
  socket: ReturnType<typeof socketio> | null;
}>({
  socket: null,
});

// Custom hook to access the socket instance from the context
const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

// SocketProvider component to manage the socket instance and provide it through context
const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(null);
  const user = useAppSelector((state) => state.auth.user);
  const token = user?.accessToken;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token) return;

    const sc = getSocket(token);
    if (!sc) return;

    // Disconnect any existing socket before creating a new one
    setSocket((prevSocket) => {
      prevSocket?.disconnect();
      return sc;
    });

    sc.on("disconnect", () => {
      dispatch(removeConnection());
      if (process.env.NODE_ENV !== 'production') {
        console.log("Socket disconnected");
      }
    });

    sc.on("connect", () => {
      dispatch(addConnection());
      if (process.env.NODE_ENV !== 'production') {
        console.log("Socket connected");
      }
    });

    // Cleanup on component unmount
    return () => {
      sc.disconnect();
      if (process.env.NODE_ENV !== 'production') {
        console.log("Socket instance disconnected on cleanup");
      }
    };
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, useSocket };
