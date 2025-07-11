'use client';
import React from 'react';
import { Box, Avatar, Paper, Typography } from '@mui/material'; // Import Typography
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const dotVariants = {
  animate: {
    y: [0, -5, 0], // The bouncing animation for the dots
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function TypingIndicator() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', marginBottom: '16px' }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1.5 }}>
        <Avatar sx={{ bgcolor: 'primary.light', width: 40, height: 40, flexShrink: 0, boxShadow: 3 }}>
          <SmartToyOutlinedIcon />
        </Avatar>
        <Paper elevation={2} sx={{ p: '12px 18px', borderRadius: '20px', borderTopLeftRadius: '6px' }}>
          <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {/* --- THE IMPROVEMENT IS HERE --- */}
            <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
              Vishesh AI is thinking
            </Typography>
            {/* --- END OF IMPROVEMENT --- */}
            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <motion.div style={{ width: 6, height: 6, background: '#9ca3af', borderRadius: '50%' }} variants={dotVariants} animate="animate" transition={{ ...dotVariants.animate.transition, delay: 0 }} />
              <motion.div style={{ width: 6, height: 6, background: '#9ca3af', borderRadius: '50%' }} variants={dotVariants} animate="animate" transition={{ ...dotVariants.animate.transition, delay: 0.2 }} />
              <motion.div style={{ width: 6, height: 6, background: '#9ca3af', borderRadius: '50%' }} variants={dotVariants} animate="animate" transition={{ ...dotVariants.animate.transition, delay: 0.4 }} />
            </Box>
          </Box>
        </Paper>
      </Box>
    </motion.div>
  );
}