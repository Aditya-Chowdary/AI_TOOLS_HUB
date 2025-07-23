
'use client';
import React from 'react';
import { ListItem, Card, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

export default function AgentCard({ agent, onSelect }) {
  const Icon = agent.icon;

  return (
    <ListItem disablePadding sx={{ mb: 1.5 }}>
      <motion.div
        whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
        style={{ width: '100%' }}
      >
        <Card
          onClick={onSelect}
          sx={{
            width: '100%',
            borderRadius: 3,
            p: 2,
            cursor: 'pointer',
            backgroundColor: 'background.paper',
            border: '1px solid transparent',
            transition: 'background-color 0.3s ease, border-color 0.3s ease',
            '&:hover': {
              backgroundColor: (theme) => theme.palette.primary.dark + '33', // Add alpha
              borderColor: 'primary.main',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
            <Box sx={{
              p: 1.5,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'primary.dark'
            }}>
              <Icon sx={{ color: 'white', fontSize: 28 }} />
            </Box>
            <Box>
              <Typography variant="h6" component="h3" sx={{ fontSize: '1rem', fontWeight: 600 }}>
                {agent.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                {agent.description}
              </Typography>
            </Box>
          </Box>
        </Card>
      </motion.div>
    </ListItem>
  );
}