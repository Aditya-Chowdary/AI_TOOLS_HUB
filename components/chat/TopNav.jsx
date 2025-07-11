// components/chat/TopNav.jsx
'use client';
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// Note: We would need a way to control the sidebar open state from here,
// which would also go in the context. For now, this is a visual placeholder.

export default function TopNav() {
  return (
    <AppBar position="static" sx={{ display: { md: 'none' }, background: 'background.paper', color: 'text.primary', boxShadow: 'none', borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer" edge="start" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 700, background: 'linear-gradient(45deg, #6D28D9, #4F46E5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Vishesh AI
        </Typography>
      </Toolbar>
    </AppBar>
  );
}