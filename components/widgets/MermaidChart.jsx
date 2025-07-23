'use client';
import React, { useEffect, useState, useId } from 'react';
import { Box, Paper, Typography, CircularProgress, useTheme } from '@mui/material';
import { marked } from 'marked';
import mermaid from 'mermaid';

// --- [THE FIX] ---
// A new function to generate a Mermaid theme based on the current Material-UI theme.
const getMermaidTheme = (theme) => ({
  theme: 'base',
  themeVariables: {
    background: theme.palette.background.paper,
    primaryColor: '#2C2A3A',
    secondaryColor: '#005F7A',
    tertiaryColor: '#5A2A5A',
    primaryBorderColor: theme.palette.primary.light,
    secondaryBorderColor: theme.palette.secondary.light,
    tertiaryBorderColor: '#FF69B4',
    lineColor: theme.palette.text.secondary,
    primaryTextColor: theme.palette.text.primary,
    secondaryTextColor: '#FFFFFF',
    tertiaryTextColor: '#FFFFFF',
    fontSize: '16px',
    fontFamily: '"Inter", sans-serif',
  },
});

export default function MermaidChart({ payload }) {
  const theme = useTheme();
  const { mermaid_code, intro_text, title } = payload;
  const uniqueId = useId();
  const [svgContent, setSvgContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Initialize Mermaid with our beautiful theme
    mermaid.initialize({ startOnLoad: false, ...getMermaidTheme(theme) });
    
    if (mermaid_code) {
      setIsLoading(true);
      setError('');
      try {
        mermaid.render(`mermaid-svg-${uniqueId}`, mermaid_code).then(({ svg }) => {
          setSvgContent(svg);
        }).catch(err => {
          console.error("Mermaid rendering error:", err);
          setError("Could not render the flowchart diagram.");
        }).finally(() => setIsLoading(false));
      } catch (e) {
        console.error("Mermaid syntax error:", e);
        setError("Invalid flowchart syntax provided.");
        setIsLoading(false);
      }
    } else {
      setError("No flowchart data available.");
      setIsLoading(false);
    }
  }, [mermaid_code, uniqueId, theme]);

  return (
    <Box sx={{ mt: 1.5 }}>
      {intro_text && (
        <Typography 
          component="div" 
          sx={{ mb: 1.5, color: 'text.secondary' }} 
          dangerouslySetInnerHTML={{ __html: marked.parse(intro_text) }}
        />
      )}
      {/* This Paper now uses the theme's background color */}
      <Paper 
        variant="outlined" 
        sx={{ 
          p: { xs: 2, md: 3 }, borderRadius: 4,
          bgcolor: 'background.paper',
          border: '1px solid', borderColor: 'divider',
          overflow: 'hidden',
        }}
      >
        {title && (
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, textAlign: 'center' }}>
                {title}
            </Typography>
        )}
        <Box 
          sx={{ 
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            minHeight: '150px',
            '& svg': { maxWidth: '100%', height: 'auto' } 
          }}
        >
          {isLoading && <CircularProgress color="secondary" />}
          {error && <Typography color="error">{error}</Typography>}
          {!isLoading && !error && (
            <div dangerouslySetInnerHTML={{ __html: svgContent }} />
          )}
        </Box>
      </Paper>
    </Box>
  );
}