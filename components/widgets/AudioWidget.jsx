'use client';
import React from 'react';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { marked } from 'marked';

export default function AudioWidget({ payload }) {
  const { intro_text, audio_url } = payload;
  
  const fullAudioUrl = `http://127.0.0.1:8000${audio_url}`;

  return (
    <Box sx={{ mt: 1, width: '100%' }}>
      {intro_text && <Typography component="div" sx={{ mb: 1.5, color: 'text.secondary' }} dangerouslySetInnerHTML={{ __html: marked.parse(intro_text) }} />}
      {/* [THE FIX] This Paper now uses the theme's background color for consistency */}
      <Paper 
        elevation={0}
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          p: 2, 
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          background: 'background.paper'
        }}
      >
        <VolumeUpIcon sx={{ mr: 2, fontSize: '2rem', color: 'secondary.main' }} />
        <audio controls src={fullAudioUrl} style={{ width: '100%' }}>
          Your browser does not support the audio element.
        </audio>
      </Paper>
    </Box>
  );
}

