// components/widgets/EmailWidget.jsx
'use client';
import React from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';
import { marked } from 'marked';

export default function EmailWidget({ payload }) {
  const { intro_text, recipient, subject, body } = payload;

  return (
    <>
      {intro_text && <Typography component="div" sx={{ mb: 1.5 }} dangerouslySetInnerHTML={{ __html: marked.parse(intro_text) }} />}
      <Paper variant="outlined" sx={{ borderRadius: '12px', overflow: 'hidden' }}>
        <Box sx={{ p: '12px 16px', bgcolor: 'grey.100' }}>
          <Typography variant="body2" component="div">
            <Box component="span" sx={{ color: 'text.secondary' }}>To: </Box>
            <Box component="span" sx={{ fontWeight: 500 }}>{recipient}</Box>
          </Typography>
          <Typography variant="body2" component="div">
            <Box component="span" sx={{ color: 'text.secondary' }}>Subject: </Box>
            <Box component="span" sx={{ fontWeight: 500 }}>{subject}</Box>
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ p: '16px' }}>
          <Typography variant="body2" component="div" sx={{ 
              whiteSpace: 'pre-wrap', 
              lineHeight: 1.7,
              '& p': { my: 1 } // Add space between paragraphs in the email body
          }}
            dangerouslySetInnerHTML={{ __html: marked.parse(body) }}
          />
        </Box>
      </Paper>
    </>
  );
}