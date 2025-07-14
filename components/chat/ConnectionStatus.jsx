// components/chat/ConnectionStatus.jsx
'use client';
import React from 'react';
import { Box, Typography, keyframes } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';

const pulse = keyframes`
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
`;

export default function ConnectionStatus({ isConnected, isConnecting }) {
  const status = isConnecting ? 'Connecting' : isConnected ? 'Connected' : 'Disconnected refresh application once';
  const color = isConnecting ? 'warning.main' : isConnected ? 'success.main' : 'error.main';
  const Icon = isConnected ? WifiIcon : WifiOffIcon;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 0.5 }}>
      <Icon sx={{ 
          fontSize: '1rem', 
          mr: 0.5, 
          color,
          animation: isConnecting ? `${pulse} 1.5s infinite` : 'none'
      }} />
      <Typography variant="caption" sx={{ color }}>
        {status}
      </Typography>
    </Box>
  );
}