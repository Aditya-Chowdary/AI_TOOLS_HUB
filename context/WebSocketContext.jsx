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
  const [clientId, setClientId] = useState(null);
  const inputRef = useRef(null);
  const ws = useRef(null);

  useEffect(() => {
    const id = Date.now();
    setClientId(id);
    const socket = new WebSocket(`${WEBSOCKET_URL}${id}`);
    ws.current = socket;
    socket.onopen = () => {
      setIsConnected(true);
      setMessages([{ role: 'bot', content_type: 'text', payload: { content: 'Vishesh AI is connected.' }, timestamp: Date.now() }]);
    };
    socket.onmessage = (event) => {
      setIsThinking(false);
      try {
        const response = JSON.parse(event.data);
        setMessages((prev) => [...prev, { role: 'bot', ...response, timestamp: Date.now() }]);
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
    ws.current.send(JSON.stringify({ type: 'text_message', content: text }));
  };

  const uploadAndSummarizeFile = async (file) => {
    if (!file || !clientId) return;

    const videoUrl = URL.createObjectURL(file);
    const userMessage = {
        role: 'user',
        content_type: 'video_user_message',
        payload: { videoUrl, fileName: file.name },
        timestamp: Date.now()
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsThinking(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch(`http://127.0.0.1:8000/upload_and_summarize/${clientId}`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ detail: 'Server returned an unreadable error.' }));
            throw new Error(errorData.detail || 'File upload failed due to a server error.');
        }
    } catch (error) {
        const errorMessage = { role: 'bot', content_type: 'text', payload: { content: `**Upload Error:** ${error.message}` }, timestamp: Date.now() };
        setMessages((prev) => [...prev, errorMessage]);
        setIsThinking(false);
        URL.revokeObjectURL(videoUrl);
    }
  };

  const value = {
    messages, isConnected, isThinking,
    sendMessage,
    uploadAndSummarizeFile,
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