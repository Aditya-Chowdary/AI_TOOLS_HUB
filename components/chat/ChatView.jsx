// components/chat/ChatView.jsx
'use client';
import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import WelcomeScreen from './WelcomeScreen';
import Message from './Message';
import TypingIndicator from './TypingIndicator';

export default function ChatView({ messages, isThinking }) {
  const scrollRef = useRef(null);

  // This effect ensures we always scroll to the bottom to see new messages or the typing indicator.
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isThinking]);

  return (
    <Box sx={{ flexGrow: 1, overflowY: 'auto', p: { xs: 2, md: 3 } }}>
      {messages.map((msg, index) => (
        // Added a stable key using a timestamp or a unique ID if available
        <Message key={msg.timestamp || `${index}-${msg.role}`} message={msg} />
      ))}
      
      {/* The TypingIndicator is now conditionally rendered here */}
      {isThinking && <TypingIndicator />}
      
      {/* This empty div is our permanent scroll target at the bottom */}
      <div style={{ height: '1px' }} ref={scrollRef} />
    </Box>
  );
}