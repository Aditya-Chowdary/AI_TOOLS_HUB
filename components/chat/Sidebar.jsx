// components/chat/Sidebar.jsx
'use client';
import React from 'react';
import { Drawer, Box, Typography, List, useTheme, useMediaQuery, AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { agentItems } from '@/lib/agents';
import AgentCard from './AgentCard';
import { useWebSocket } from '@/context/WebSocketContext';

export default function Sidebar() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const drawerWidth = 340;
  
  // --- FIX: We no longer need `runAgent` here, simplifying the logic. ---
  const { mobileOpen, setMobileOpen, setSelectedPrompt, isThinking, inputRef } = useWebSocket();

  const handleAgentSelect = (agent) => {
    if (isThinking) return;

    // --- FIX: The logic is now unified. ALL agent cards will populate the input field. ---
    // This allows the user to see, edit, and then consciously send the prompt.
    // The backend's AI router will handle directing it to the correct tool.
    setSelectedPrompt({ text: agent.prompt, timestamp: Date.now() });

    // Focus the input field after selecting a prompt
    inputRef.current?.focus();
    
    if (!isDesktop) {
      setMobileOpen(false);
    }
  };
  
  const drawerContent = (
    <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {!isDesktop && (
        <IconButton onClick={() => setMobileOpen(false)} sx={{ position: 'absolute', top: 16, right: 16, color: 'text.secondary' }}>
          <CloseIcon />
        </IconButton>
      )}
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, background: 'linear-gradient(45deg, #6D28D9, #4F46E5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Vishesh AI Agents
      </Typography>
      <List sx={{ overflowY: 'auto', flexGrow: 1, opacity: isThinking ? 0.5 : 1, pointerEvents: isThinking ? 'none' : 'auto', transition: 'opacity 0.3s ease-in-out' }}>
        {agentItems.map((agent) => (
          <AgentCard key={agent.agent_id} agent={agent} onSelect={() => handleAgentSelect(agent)} />
        ))}
      </List>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
      <AppBar position="fixed" sx={{ display: { md: 'none' }, background: 'background.paper', color: 'text.primary', boxShadow: 'none', borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => setMobileOpen(true)} sx={{ mr: 2 }}><MenuIcon /></IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 700 }}>Vishesh AI</Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant={isDesktop ? "permanent" : "temporary"} open={mobileOpen} onClose={() => setMobileOpen(false)} sx={{ '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' } }}>
        {drawerContent}
      </Drawer>
    </Box>
  );
}