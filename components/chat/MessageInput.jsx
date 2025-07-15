// components/chat/MessageInput.jsx
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, IconButton, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ConnectionStatus from './ConnectionStatus';
import { motion } from 'framer-motion';
import { useWebSocket } from '@/context/WebSocketContext';

export default function MessageInput() {
  const { sendMessage, selectedPrompt, isConnected, isConnecting, isThinking, inputRef } = useWebSocket();
  const [input, setInput] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (selectedPrompt?.text) {
      setInput(selectedPrompt.text);
      inputRef.current?.focus();
    }
  }, [selectedPrompt, inputRef]);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target.result;
        const message = `Summarize the following video transcript:\n\n${fileContent}`;
        sendMessage(message);
      };
      reader.readAsText(file);
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, flexShrink: 0, mt: 'auto', backgroundColor: 'background.default' }}>
      <ConnectionStatus isConnected={isConnected} isConnecting={isConnecting} />
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <Paper elevation={4} sx={{ display: 'flex', alignItems: 'center', p: 1, borderRadius: '16px', border: '1px solid', borderColor: isConnected ? 'divider' : 'error.main', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <IconButton onClick={handleFileUpload} disabled={isThinking || !isConnected}>
            <AddCircleOutlineIcon />
          </IconButton>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept=".txt"
          />
          <TextField
            inputRef={inputRef}
            fullWidth
            multiline
            maxRows={5}
            variant="standard"
               placeholder={isConnected ? "Ask anything or select an agent..." : "Waiting for connection..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isThinking || !isConnected}
            InputProps={{ disableUnderline: true }}
            sx={{ '& .MuiInputBase-root': { padding: '8px', fontSize: '1rem' } }}
          />
          <IconButton color="primary" onClick={handleSend} disabled={isThinking || !isConnected || !input.trim()} sx={{ background: 'linear-gradient(135deg, #6D28D9 0%, #4F46E5 100%)', color: 'white', '&:disabled': { background: '#e0e0e0' }, width: 44, height: 44, ml: 1, transition: 'transform 0.2s ease', '&:hover:not(:disabled)': { transform: 'scale(1.1)' } }}>
            <SendIcon />
          </IconButton>
        </Paper>
      </motion.div>
    </Box>
  );
}