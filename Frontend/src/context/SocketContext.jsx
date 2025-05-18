import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState
} from 'react';
import io from 'socket.io-client';
import { UserDataContext } from './UserContext';
import { CaptainDataContext } from './CaptainContext';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

const socket = io(`${import.meta.env.VITE_BASE_HOSTED_URI}`)

export const SocketProvider = ({ children }) => {
    const socketRef = useRef(null);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('connected to server')
        })

        socket.on('disconnect', () => {
            console.log('Disconnected from server')
        })
    }
        , [])


    const sendMessage = (eventName, message) => {
        socket.emit(eventName, message);
    }

    const receiveMessage = (eventName, callback) => {
        socket.on(eventName, callback);
    }

    return (
        <SocketContext.Provider
            value={{ socket, sendMessage, receiveMessage }}
        >
            {children}
        </SocketContext.Provider>
    );
};