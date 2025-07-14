// app/chat/layout.jsx
'use client';
import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '@/components/chat/Sidebar';
// --- FIX: The WebSocketProvider is no longer needed here. ---
// import { WebSocketProvider } from '@/context/WebSocketContext';

export default function ChatLayout({ children }) {
  return (
    // --- FIX: Remove the WebSocketProvider wrapper from this layout. ---
    // The provider is now in the root layout (app/layout.js) and is available globally.
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: 'background.default' }}>
        {children}
      </Box>
    </Box>
  );
}