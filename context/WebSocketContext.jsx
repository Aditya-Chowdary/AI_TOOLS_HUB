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
    const userMessage = { role: 'user', content_type: 'text', payload: { content: text } };
    setMessages((prev) => [...prev, userMessage]);
    setIsThinking(true);
    ws.current.send(JSON.stringify({ type: 'text_message', content: text }));
  };
  
  // This is for clicking cards to get a guaranteed response
  const runAgent = (agent_id, prompt) => {
    if (ws.current?.readyState !== WebSocket.OPEN) return;
    const userMessage = { role: 'user', content_type: 'text', payload: { content: prompt } };
    setMessages((prev) => [...prev, userMessage]);
    setIsThinking(true);
    ws.current.send(JSON.stringify({ type: 'run_agent', agent_id: agent_id }));
  };

  const value = {
    messages, isConnected, isThinking,
    sendMessage, runAgent, // Both are needed for the hybrid model
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