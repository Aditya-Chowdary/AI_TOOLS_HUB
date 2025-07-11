// app/chat/layout.jsx
'use client';
import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '@/components/chat/Sidebar';
import { WebSocketProvider } from '@/context/WebSocketContext';

export default function ChatLayout({ children }) {
  return (
    <WebSocketProvider>
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: 'background.default' }}>
          {children}
        </Box>
      </Box>
    </WebSocketProvider>
  );
}