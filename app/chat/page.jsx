// app/chat/page.jsx
'use client';
import React from 'react';
import { Toolbar } from '@mui/material';
import ChatView from '@/components/chat/ChatView';
import MessageInput from '@/components/chat/MessageInput';
import { useWebSocket } from '@/context/WebSocketContext';

export default function ChatPage() {
  const { messages, isThinking } = useWebSocket();

  return (
    <>
      <Toolbar sx={{ display: { md: 'none' } }} />
      <ChatView messages={messages} isThinking={isThinking} />
      <MessageInput />
    </>
  );
}