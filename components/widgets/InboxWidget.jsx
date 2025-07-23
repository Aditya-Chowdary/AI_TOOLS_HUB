'use client';
import React from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TextMessage from './TextMessage'; // We'll reuse this to render the Markdown tables!

export default function InboxWidget({ payload }) {
  const theme = useTheme();

  return (
    <Box sx={{ mt: 1, width: '100%' }}>
      {/* This Paper component provides the consistent dark theme background and border */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 2.5 },
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          background: 'background.paper',
        }}
      >
        {/* Widget Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Box
            sx={{
              display: 'flex', p: 1, borderRadius: '10px',
              color: 'white', backgroundColor: 'secondary.dark', // Use a different color to distinguish
            }}
          >
            <MailOutlineIcon />
          </Box>
          <Typography variant="h6" fontWeight="600">
            Inbox Agent Report
          </Typography>
        </Box>

        {/* 
          Widget Body 
          We cleverly reuse the TextMessage component because it's already perfected
          for rendering Markdown, including the tables the AI will generate.
        */}
        <Box>
          <TextMessage payload={payload} />
        </Box>
      </Paper>
    </Box>
  );
}