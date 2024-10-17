/* eslint-disable react-refresh/only-export-components */
'use client'
import { addConnection, removeConnection } from "@/store/chat/chatSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LocalStorage } from "@/utils";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import socketio from "socket.io-client";

// Function to establish a socket connection with authorization token
const getSocket = (token:string) => {
   
   
  // Create a socket connection with the provided URI and authentication

  return socketio(process.env.SOCKET_URI || 'http://localhost:8000', {
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
const useSocket = () => useContext(SocketContext);

// SocketProvider component to manage the socket instance and provide it through context
const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State to store the socket instance
  const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(
    null
  );

  // Set up the socket connection when the component mounts

  
  // Retrieve jwt token from session storage or cookie
  const token = useSession().data?.user?.accessToken
  const dispatch = useAppDispatch()
 
  useEffect(() => {
    const sc = getSocket(token)
    setSocket(sc);
    if(sc){
      sc.on("disconnect", () => {
        dispatch(removeConnection())
        console.log("Socket disconnected");
      });
      sc.on("connect", () => {
        dispatch(addConnection())
        console.log("Socket connected");
      });
    }

  }, [token]);

  return (
    // Provide the socket instance through context to its children
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

// Export the SocketProvider component and the useSocket hook for other components to use
export { SocketProvider, useSocket };
