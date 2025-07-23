'use client';
import React from 'react';
import { Drawer, Box, Typography, List, useTheme, useMediaQuery, AppBar, Toolbar, IconButton, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { agentItems } from '@/lib/agents';
import AgentCard from './AgentCard';
import { useWebSocket } from '@/context/WebSocketContext';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import Link from 'next/link';

export default function Sidebar() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const drawerWidth = 360;
  
  const { mobileOpen, setMobileOpen, setSelectedPrompt, isThinking, inputRef } = useWebSocket();

  const handleAgentSelect = (agent) => {
    if (isThinking) return;
    setSelectedPrompt({ text: agent.prompt, timestamp: Date.now() });
    inputRef.current?.focus();
    if (!isDesktop) {
      setMobileOpen(false);
    }
  };
  
  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, pt: 3, pl: 3 }}>
        {!isDesktop && (
          <IconButton onClick={() => setMobileOpen(false)} sx={{ position: 'absolute', top: 16, right: 16, zIndex: 1, color: 'text.secondary' }}>
            <CloseIcon />
          </IconButton>
        )}
        {/* --- [THE FIX] --- */}
        {/* The entire header Box is now wrapped in a Link component pointing to the homepage. */}
        <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <SmartToyIcon sx={{ color: 'primary.main', fontSize: 32, mr: 1.5 }}/>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              AI Agents
            </Typography>
          </Box>
        </Link>
        {/* --- [END FIX] --- */}
      </Box>
      <Divider sx={{ mx: 2 }}/>

      <Box sx={{ flexGrow: 1, position: 'relative', overflow: 'hidden', p: 2, pt: 1 }}>
        <List sx={{ 
          height: '100%',
          overflowY: 'auto', 
          p: '0 4px',
          opacity: isThinking ? 0.5 : 1, 
          pointerEvents: isThinking ? 'none' : 'auto', 
          transition: 'opacity 0.3s ease-in-out',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}>
          {agentItems.map((agent) => (
            <AgentCard key={agent.agent_id} agent={agent} onSelect={() => handleAgentSelect(agent)} />
          ))}
        </List>
        <Box sx={{
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50px',
          background: `linear-gradient(to top, ${theme.palette.background.default}, transparent)`,
          pointerEvents: 'none',
        }} />
      </Box>
      
      <Box sx={{ p: 2, mt: 'auto' }}>
        <Divider sx={{ mb: 2 }}/>
        <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', display: 'block' }}>
          Vishesh AI Hub © 2025
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
      <AppBar position="fixed" sx={{ 
        display: { md: 'none' }, 
        background: 'rgba(13, 12, 18, 0.8)',
        backdropFilter: 'blur(10px)',
        boxShadow: 'none',
        borderBottom: 1, 
        borderColor: 'divider' 
      }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => setMobileOpen(true)} sx={{ mr: 2 }}><MenuIcon /></IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 700 }}>Vishesh AI</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isDesktop ? "permanent" : "temporary"}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: theme.palette.background.default,
            borderRight: `1px solid ${theme.palette.divider}`,
          }
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}