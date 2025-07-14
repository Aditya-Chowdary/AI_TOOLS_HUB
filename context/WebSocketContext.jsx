// context/WebSocketContext.jsx
'use client';
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const WEBSOCKET_URL = 'ws://127.0.0.1:8000/ws/';
const WebSocketContext = createContext(null);

export function WebSocketProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState({ text: '', timestamp: null });
  const [mobileOpen, setMobileOpen] = useState(false);
  const inputRef = useRef(null);
  const ws = useRef(null);

  useEffect(() => {
    // This connection logic remains the same.
    if (ws.current) return;
    const socket = new WebSocket(`${WEBSOCKET_URL}${Date.now()}`);
    ws.current = socket;
    socket.onopen = () => {
      setIsConnected(true);
     setMessages([{ role: 'bot', content_type: 'text', payload: { content: 'Vishesh AI is connected.' } }]);
    };
    socket.onmessage = (event) => {
      setIsThinking(false);
      try {
        const response = JSON.parse(event.data);
        setMessages((prev) => [...prev, { role: 'bot', ...response }]);
      } catch (e) { console.error("Failed to parse server message:", e); }
    };
    socket.onerror = () => setIsConnected(false);
    socket.onclose = () => { setIsConnected(false); ws.current = null; };
    return () => socket.close();
  }, []);

  const sendMessage = (text) => {
    if (ws.current?.readyState !== WebSocket.OPEN) return;
    const userMessage = { role: 'user', content_type: 'text', payload: { content: text }, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMessage]);
    setIsThinking(true);
    // ALL messages now go through this single 'text_message' type,
    // which allows the backend AI router to handle everything.
    ws.current.send(JSON.stringify({ type: 'text_message', content: text }));
  };
  
  // --- FIX: The `runAgent` function is removed. ---
  // It promoted a rigid, non-AI-router approach. By removing it, we ensure
  // all logic flows through `sendMessage`, which is what the new backend expects.

  const value = {
    messages, isConnected, isThinking,
    sendMessage, // `runAgent` is gone.
    inputRef, selectedPrompt, setSelectedPrompt,
    mobileOpen, setMobileOpen,
  };

  return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>;
}

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (!context) { throw new Error('useWebSocket must be used within a WebSocketProvider'); }
  return context;
}