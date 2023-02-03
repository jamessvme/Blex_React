import React, { createContext } from 'react';
import { io, Socket } from 'socket.io-client';

const socket = io('http://localhost:3001'),
SocketContext = createContext<Socket>(socket);

socket.on('connect', () => console.log('connected to socket'));

export function SocketProvider({ children }: any) {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
export { SocketContext };