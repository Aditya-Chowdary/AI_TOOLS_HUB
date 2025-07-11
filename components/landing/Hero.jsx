'use client';
import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';

export default function Hero() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              background: 'linear-gradient(45deg, #00A3FF, #A162F7, #F97316)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Welcome to the Vishesh AI Project Hub!
          </Typography>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography variant="h6" component="p" sx={{ mb: 4, color: '#e0e0e0', maxWidth: '600px' }}>
            Your central workspace for intelligent agents. Select an agent, give it a task, and watch it work.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            component={Link}
            href="/chat"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              background: 'linear-gradient(135deg, #6D28D9 0%, #4F46E5 100%)',
              padding: '12px 24px',
              fontSize: '1rem',
              boxShadow: '0 4px 20px rgba(110, 40, 217, 0.4)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 25px rgba(110, 40, 217, 0.5)',
              }
            }}
          >
            Get Started
          </Button>
        </motion.div>
      </Box>
    </Container>
  );
}