// components/widgets/VideoWidget.jsx
'use client';
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import { marked } from 'marked';

export default function VideoWidget({ payload }) {
  const { intro_text, confirmation_message, script } = payload;

  return (
    <>
      {intro_text && <Typography component="div" sx={{ mb: 1.5 }} dangerouslySetInnerHTML={{ __html: marked.parse(intro_text) }} />}
      <Paper
        variant="outlined"
        sx={{
          p: 2, textAlign: 'center',
          borderStyle: 'dashed', borderWidth: '2px', borderColor: 'primary.main',
          bgcolor: 'rgba(109, 40, 217, 0.05)', borderRadius: '12px'
        }}
      >
        <VideocamIcon sx={{ fontSize: 48, color: 'primary.main' }} />
        <Typography variant="h6" sx={{ fontWeight: 600, mt: 1 }}>
          {confirmation_message}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          The generated script is shown below for your review.
        </Typography>
        <Paper elevation={0} sx={{ p: 1.5, textAlign: 'left', bgcolor: 'rgba(255,255,255,0.7)', maxHeight: 200, overflowY: 'auto', borderRadius: '8px' }}>
          <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', fontFamily: 'monospace' }}>
            {script}
          </Typography>
        </Paper>
      </Paper>
    </>
  );
}