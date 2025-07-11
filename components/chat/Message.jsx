// components/chat/Message.jsx
'use client';
import React from 'react';
import { Box, Avatar, Paper, Typography } from '@mui/material'; // Import Typography for the error case
import { motion } from 'framer-motion';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

// Import all the widget components
import MermaidChart from '../widgets/MermaidChart';
import LineChart from '../widgets/LineChart';
import VideoWidget from '../widgets/VideoWidget';
import EmailWidget from '../widgets/EmailWidget';
import TextMessage from '../widgets/TextMessage';

// A helper component to render the correct content based on type
const MessageContent = ({ message }) => {
  // --- THIS IS THE DEFINITIVE FIX ---
  // Safely access properties using optional chaining and provide defaults.
  const content_type = message?.content_type;
  const payload = message?.payload;
  const errorData = message?.data;

  // If there's no payload but there is error data, treat it as a text error message.
  if (!payload && errorData) {
    return <TextMessage payload={{ content: `**Error:** ${errorData}` }} />;
  }
  
  // If payload is somehow missing, show a generic error.
  if (!payload) {
    return <TextMessage payload={{ content: "Received an invalid message format from the server." }} />;
  }

  // --- END OF FIX ---

  switch (content_type) {
    case 'text':
      return <TextMessage payload={payload} />;
    case 'mermaid':
      return <MermaidChart payload={payload} />;
    case 'chart':
      return <LineChart payload={payload} />;
    case 'video':
      return <VideoWidget payload={payload} />;
    case 'email':
      return <EmailWidget payload={payload} />;
    default:
      // This fallback now handles cases where content_type is null or undefined
      // by displaying the raw content if available.
      return <TextMessage payload={{ content: payload.content || "An unexpected response was received." }} />;
  }
};


export default function Message({ message }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '16px',
      }}
    >
      <Box sx={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 1.5,
          maxWidth: { xs: '90%', md: '75%' },
      }}>
        {!isUser && (
          <Avatar sx={{ bgcolor: 'primary.light', width: 40, height: 40, flexShrink: 0, boxShadow: 3 }}>
            <SmartToyOutlinedIcon />
          </Avatar>
        )}
        <Paper
          elevation={isUser ? 4 : 2}
          sx={{
            p: '12px 16px',
            bgcolor: isUser ? 'secondary.main' : 'background.paper',
            color: isUser ? 'white' : 'text.primary',
            borderRadius: '20px',
            borderTopLeftRadius: isUser ? '20px' : '6px',
            borderTopRightRadius: isUser ? '6px' : '20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            overflow: 'hidden',
            wordWrap: 'break-word',
          }}
        >
          <MessageContent message={message} />
        </Paper>
        {isUser && (
           <Avatar sx={{ bgcolor: 'secondary.main', width: 40, height: 40, flexShrink: 0, boxShadow: 3 }}>
            <PersonOutlineOutlinedIcon />
          </Avatar>
        )}
      </Box>
    </motion.div>
  );
}