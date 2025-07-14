// components/widgets/AudioWidget.jsx
'use client';
import React from 'react';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { marked } from 'marked';

export default function AudioWidget({ payload }) {
  const { intro_text, audio_url } = payload;
  
  // The backend gives a relative path, we need the full URL to the backend server
  const fullAudioUrl = `http://127.0.0.1:8000${audio_url}`;

  return (
    <>
      {intro_text && <Typography component="div" sx={{ mb: 1.5 }} dangerouslySetInnerHTML={{ __html: marked.parse(intro_text) }} />}
      <Paper 
        variant="outlined" 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          p: 2, 
          borderRadius: '12px',
          bgcolor: 'primary.main',
          color: 'white'
        }}
      >
        <VolumeUpIcon sx={{ mr: 2, fontSize: '2rem' }} />
        <audio controls src={fullAudioUrl} style={{ width: '100%' }}>
          Your browser does not support the audio element.
        </audio>
      </Paper>
    </>
  );
}