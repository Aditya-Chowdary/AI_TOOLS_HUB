
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, IconButton, Paper, Tooltip } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import ConnectionStatus from './ConnectionStatus';
import { motion } from 'framer-motion';
import { useWebSocket } from '@/context/WebSocketContext';

export default function MessageInput() {
  const { sendMessage, selectedPrompt, isConnected, isConnecting, isThinking, inputRef, uploadAndSummarizeFile } = useWebSocket();
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
      uploadAndSummarizeFile(file);
    }
    e.target.value = null; 
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, flexShrink: 0, mt: 'auto', backgroundColor: 'transparent' }}>
      <ConnectionStatus isConnected={isConnected} isConnecting={isConnecting} />
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 1,
            mt: 1,
            borderRadius: '16px',
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}
        >
          <Tooltip title="Upload Video for Summary">
            <IconButton onClick={() => fileInputRef.current.click()} disabled={isThinking || !isConnected}>
              <AddPhotoAlternateRoundedIcon />
            </IconButton>
          </Tooltip>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept="video/mp4,video/webm,video/ogg,video/quicktime"
          />
          <TextField
            inputRef={inputRef}
            fullWidth
            multiline
            maxRows={5}
            variant="standard"
            placeholder={isConnected ? "Ask anything, or select an agent from the sidebar..." : "Connecting to AI services..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isThinking || !isConnected}
            InputProps={{ disableUnderline: true }}
            sx={{ '& .MuiInputBase-root': { p: '8px', fontSize: '1rem' } }}
          />
          <IconButton
            color="primary"
            onClick={handleSend}
            disabled={isThinking || !isConnected || !input.trim()}
            sx={{
              background: (theme) => `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.secondary.main} 100%)`,
              color: 'black',
              '&:disabled': { background: (theme) => theme.palette.action.disabledBackground, color: (theme) => theme.palette.action.disabled },
              width: 44,
              height: 44,
              ml: 1,
            }}
          >
            <SendRoundedIcon />
          </IconButton>
        </Paper>
      </motion.div>
    </Box>
  );
}