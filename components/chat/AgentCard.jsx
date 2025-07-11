// components/chat/AgentCard.jsx
'use client';
import React from 'react';
import { ListItem, Card, CardActionArea, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

export default function AgentCard({ agent, onSelect }) {
  const Icon = agent.icon;

  return (
    <motion.div whileHover={{ translateY: -4 }} transition={{ type: 'spring', stiffness: 300 }}>
      <ListItem disablePadding sx={{ mb: 1.5 }}>
        <Card sx={{ width: '100%', borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
          {/*
            THE FIX: The onClick should call the `onSelect` prop function directly.
            The Sidebar component is responsible for passing the correct agent data.
          */}
          <CardActionArea onClick={onSelect} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Icon sx={{ color: 'primary.main', fontSize: 36, mt: 0.5 }} />
              <Box>
                <Typography variant="h6" component="h3" sx={{ fontSize: '1rem', fontWeight: 600 }}>
                  {agent.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {agent.description}
                </Typography>
              </Box>
            </Box>
          </CardActionArea>
        </Card>
      </ListItem>
    </motion.div>
  );
}