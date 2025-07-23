'use client';
import React from 'react';
import { Typography } from '@mui/material';
import { marked } from 'marked';

// Set marked options once globally for consistency
marked.setOptions({
  breaks: true, // Convert single line breaks into <br> tags
  gfm: true,    // Use GitHub Flavored Markdown for better table/list support
});

export default function TextMessage({ payload }) {
  // --- [THE FIX - PART 1: DATA VALIDATION] ---
  // This defensive check ensures the content is always a string, preventing crashes.
  let contentToRender;

  if (payload && typeof payload.content === 'string') {
    // This is the expected, correct case.
    contentToRender = payload.content;
  } else {
    // This is the fallback for any malformed message.
    console.error("TextMessage received an invalid payload:", payload);
    contentToRender = "An error occurred while displaying this message.";
  }
  // --- [END DATA VALIDATION FIX] ---

  return (
    <Typography
      component="div"
      sx={{
        // General styling for paragraphs, lists, etc.
        '& p': { m: 0, lineHeight: 1.6, fontSize: '1rem' },
        '& ul, & ol': { pl: 2.5, my: 1 },
        '& li': { mb: 0.5 },
        '& blockquote': {
          borderLeft: '4px solid',
          borderColor: 'divider',
          pl: 2,
          my: 1,
          color: 'text.secondary',
          fontStyle: 'italic',
        },
        '& h1, & h2, & h3, & h4': { my: 2, lineHeight: 1.3 },

        // --- [THE FIX - PART 2: UI IMPROVEMENT] ---
        // Updated colors for code blocks to look great on the dark theme.
        '& pre': {
          backgroundColor: 'rgba(0,0,0, 0.2)', // A darker, more subtle background
          padding: '12px',
          borderRadius: '8px',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          fontFamily: 'monospace',
          fontSize: '0.9rem',
          my: 1,
        },
        // This targets code blocks *not* inside a <pre> tag (inline code).
        '& code:not(pre > code)': {
          fontFamily: 'monospace',
          fontSize: '0.9rem',
          color: 'secondary.light', // Brighter cyan for better readability
          px: '5px',
          py: '2px',
          borderRadius: '4px',
          backgroundColor: 'rgba(0, 191, 255, 0.15)', // A subtle cyan highlight
        },
        // --- [END UI IMPROVEMENT FIX] ---
      }}
      dangerouslySetInnerHTML={{ __html: marked.parse(contentToRender) }}
    />
  );
}