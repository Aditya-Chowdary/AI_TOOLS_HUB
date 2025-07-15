// components/widgets/VideoWidget.jsx
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

  const handleCanPlay = () => setIsLoading(false);
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <Box sx={{ mt: 2, width: '100%' }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: '20px',
          border: `1px solid ${theme.palette.divider}`,
          background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(250,251,252,1) 100%)',
          boxShadow: '0px 10px 30px -5px rgba(0, 0, 0, 0.04)',
        }}
      >
        {/* --- Widget Header --- */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              p: 1,
              borderRadius: '12px',
              color: 'primary.main',
              backgroundColor: 'primary.light',
            }}
          >
            <MovieFilterIcon sx={{color: 'white',}}/>
          </Box>
          <Typography variant="h6" fontWeight="600">
            {intro_text || "Generated Video"}
          </Typography>
        </Box>

        {/* --- Video Player Container --- */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            bgcolor: 'black',
            minHeight: '250px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          {isLoading && (
            <Box sx={{ position: 'absolute', zIndex: 1, color: 'white' }}>
              <CircularProgress color="inherit" />
            </Box>
          )}

          {hasError && (
            <Box
              sx={{
                position: 'absolute',
                zIndex: 1,
                color: 'rgba(255, 255, 255, 0.7)',
                textAlign: 'center',
                p: 2,
              }}
            >
              <ErrorOutlineIcon sx={{ fontSize: 48, mb: 1 }} />
              <Typography>Failed to load video.</Typography>
            </Box>
          )}

          <video
            key={fullVideoUrl}
            onCanPlay={handleCanPlay}
            onError={handleError}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              opacity: isLoading || hasError ? 0 : 1,
              transition: 'opacity 0.3s ease-in-out',
            }}
            controls
            autoPlay
            playsInline
          >
            <source src={fullVideoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      </Paper>
    </Box>
  );
}