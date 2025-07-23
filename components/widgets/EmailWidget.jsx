'use client';
import React from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';
import { marked } from 'marked';

export default function EmailWidget({ payload }) {
  const { intro_text, recipient, subject, body } = payload;

  return (
    <Box sx={{ mt: 1, width: '100%' }}>
      {intro_text && <Typography component="div" sx={{ mb: 1.5, color: 'text.secondary' }} dangerouslySetInnerHTML={{ __html: marked.parse(intro_text) }} />}
      {/* [THE FIX] This Paper now uses the theme's background color and border */}
      <Paper elevation={0} sx={{ borderRadius: 4, overflow: 'hidden', border: '1px solid', borderColor: 'divider', background: 'background.paper' }}>
        {/* [THE FIX] Updated header background for dark mode */}
        <Box sx={{ p: '12px 16px', bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
          <Typography variant="body2" component="div">
            <Box component="span" sx={{ color: 'text.secondary' }}>To: </Box>
            <Box component="span" sx={{ fontWeight: 500, color: 'text.primary' }}>{recipient}</Box>
          </Typography>
          <Typography variant="body2" component="div">
            <Box component="span" sx={{ color: 'text.secondary' }}>Subject: </Box>
            <Box component="span" sx={{ fontWeight: 500, color: 'text.primary' }}>{subject}</Box>
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ p: '16px' }}>
          <Typography variant="body2" component="div" sx={{ 
              whiteSpace: 'pre-wrap', 
              lineHeight: 1.7,
              '& p': { my: 1 },
              color: 'text.secondary'
          }}
            dangerouslySetInnerHTML={{ __html: marked.parse(body) }}
          />
        </Box>
      </Paper>
    </Box>
  );
}