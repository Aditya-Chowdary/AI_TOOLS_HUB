'use client';
import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import SmartToyIcon from '@mui/icons-material/SmartToy';

export default function WelcomeScreen() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center',
        color: 'text.secondary',
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', mb: 2 }}>
          <SmartToyIcon sx={{ fontSize: 50 }} />
        </Avatar>
      </motion.div>
      <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
        Vishesh Personal AI Agent
      </Typography>
      <Typography>
        Select an agent from the sidebar or ask me anything to get started.
      </Typography>
    </Box>
  );
}