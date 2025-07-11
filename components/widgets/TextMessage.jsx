// components/widgets/TextMessage.jsx
'use client';
import React from 'react';
import { Typography } from '@mui/material';
import { marked } from 'marked';

marked.setOptions({ breaks: true, gfm: true });

export default function TextMessage({ payload }) {
  return (
    <Typography
      component="div"
      sx={{
        '& p': { m: 0, lineHeight: 1.6, fontSize: '1rem' },
        '& ul, & ol': { pl: 2.5, my: 1 },
        '& li': { mb: 0.5 },
        '& pre': { backgroundColor: 'rgba(0,0,0,0.05)', padding: '12px', borderRadius: '8px', whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontFamily: 'monospace', fontSize: '0.9rem', my: 1 },
        '& code': { fontFamily: 'monospace', fontSize: '0.9rem', color: 'secondary.main', px: '4px', py: '2px', borderRadius: '4px', backgroundColor: 'rgba(0,0,0,0.05)' },
        '& blockquote': { borderLeft: '4px solid', borderColor: 'divider', pl: 2, my: 1, color: 'text.secondary', fontStyle: 'italic' },
        '& h1, & h2, & h3, & h4': { my: 2, lineHeight: 1.3 }
      }}
      dangerouslySetInnerHTML={{ __html: marked.parse(payload.content) }}
    />
  );
}