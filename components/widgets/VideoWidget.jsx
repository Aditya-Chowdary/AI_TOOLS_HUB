'use client';
import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, CircularProgress, useTheme } from '@mui/material';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function VideoWidget({ payload }) {
  const theme = useTheme();
  const { intro_text, video_url } = payload;

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const mainServerBaseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8000';
  const fullVideoUrl = `${mainServerBaseUrl}${video_url}`;

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [fullVideoUrl]);

  return (
    <Box sx={{ mt: 1, width: '100%' }}>
      {/* [THE FIX] This Paper component now uses the theme's background color */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 2.5 },
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          background: 'background.paper',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
           {/* [THE FIX] Updated icon background for better contrast in dark mode */}
          <Box
            sx={{
              display: 'flex', p: 1, borderRadius: '10px',
              color: 'white', backgroundColor: 'primary.dark',
            }}
          >
            <MovieFilterIcon />
          </Box>
          <Typography variant="h6" fontWeight="600">
            {intro_text || "Generated Video"}
          </Typography>
        </Box>

        <Box
          sx={{
            position: 'relative', borderRadius: '12px', overflow: 'hidden',
            bgcolor: 'black', minHeight: '250px', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          {isLoading && <CircularProgress color="secondary" />}
          {hasError && (
            <Box sx={{ position: 'absolute', zIndex: 1, color: 'text.secondary', textAlign: 'center', p: 2 }}>
              <ErrorOutlineIcon sx={{ fontSize: 48, mb: 1 }} />
              <Typography>Failed to load video.</Typography>
            </Box>
          )}
          <video
            key={fullVideoUrl}
            onCanPlay={() => setIsLoading(false)}
            onError={() => { setIsLoading(false); setHasError(true); }}
            style={{ width: '100%', height: 'auto', display: 'block', opacity: isLoading || hasError ? 0 : 1, transition: 'opacity 0.3s ease-in-out' }}
            controls  playsInline
          >
            <source src={fullVideoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      </Paper>
    </Box>
  );
}