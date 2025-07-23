'use client';
import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <Container maxWidth="lg">
      <Box
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: 'text.primary',
        }}
      >
        <motion.div variants={itemVariants}>
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.8rem', sm: '4rem', md: '5.5rem' },
              background: `linear-gradient(135deg, ${'#00BFFF'} 30%, ${'#8A2BE2'} 90%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-2px',
            }}
          >
            Vishesh AI Agent Hub
          </Typography>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Typography variant="h5" component="p" sx={{ mb: 5, color: 'text.secondary', maxWidth: '700px', fontWeight: 400 }}>
            Our central workspace for intelligent agents. Select a skill, provide a task, and let our AI handle the complexity for you.
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            component={Link}
            href="/chat"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              background: `linear-gradient(135deg, ${'#8A2BE2'} 0%, ${'#A052E8'} 100%)`,
              padding: '14px 30px',
              fontSize: '1.1rem',
              borderRadius: '50px',
              boxShadow: (theme) => `0 8px 30px ${theme.palette.primary.dark}`,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: (theme) => `0 12px 40px ${theme.palette.primary.dark}`,
              }
            }}
          >
            Launch The Hub
          </Button>
        </motion.div>
      </Box>
    </Container>
  );
}