// components/widgets/VideoUserMessage.jsx
'use client';

import React, { useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';

export default function VideoUserMessage({ payload }) {
  // payload contains { videoUrl, fileName }

  // This effect is crucial for preventing memory leaks.
  // When the component is no longer on screen, we release the temporary URL from memory.
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(payload.videoUrl);
    };
  }, [payload.videoUrl]);

  return (
    <Box sx={{ maxWidth: 320 }}>
      <video
        controls
        width="100%"
        style={{ borderRadius: '8px', display: 'block' }}
        src={payload.videoUrl}
        aria-label={`Uploaded video: ${payload.fileName}`}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
        <MovieIcon fontSize="small" sx={{ color: 'inherit' }} />
        <Typography 
            variant="caption" 
            sx={{ 
                color: 'inherit',
                fontStyle: 'italic',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
            }}
        >
          {payload.fileName}
        </Typography>
      </Box>
    </Box>
  );
}