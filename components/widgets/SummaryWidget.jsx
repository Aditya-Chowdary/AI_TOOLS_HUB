// components/widgets/SummaryWidget.jsx
'use client';
import React from 'react';
import { Box, Paper, Typography, Divider, Chip } from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import SentimentNeutralOutlinedIcon from '@mui/icons-material/SentimentNeutralOutlined';
import ReactMarkdown from 'react-markdown';

const SentimentChip = ({ sentiment, score }) => {
  const sentimentColor = sentiment === 'Positive' ? 'success' : sentiment === 'Negative' ? 'error' : 'default';
  const SentimentIcon = sentiment === 'Positive' ? ThumbUpAltOutlinedIcon : sentiment === 'Negative' ? ThumbDownAltOutlinedIcon : SentimentNeutralOutlinedIcon;

  return (
    <Chip
      icon={<SentimentIcon />}
      label={`${sentiment} (${score.toFixed(2)})`}
      color={sentimentColor}
      variant="outlined"
      size="small"
      sx={{ fontWeight: 600 }}
    />
  );
};

export default function SummaryWidget({ payload }) {
  const { summary_text, action_items, overall_sentiment, sentiment_score, intro_text } = payload;

  return (
    <Box>
      {intro_text && <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 500, color: 'text.secondary' }}>{intro_text}</Typography>}
      <Paper elevation={0} sx={{ p: {xs: 2, md: 2.5}, borderRadius: '12px', border: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
          <Typography variant="h6" component="h3" sx={{ fontSize: '1.1rem', fontWeight: 700 }}>
            Content Summary
          </Typography>
          <SentimentChip sentiment={overall_sentiment} score={sentiment_score} />
        </Box>
        <Divider sx={{ my: 1.5 }} />
        <Box sx={{ mb: 2, 'p': { my: 0.5 }, 'strong': { color: 'primary.main' } }}>
          <ReactMarkdown>{summary_text}</ReactMarkdown>
        </Box>
        <Divider sx={{ my: 1.5 }} />
        <Box sx={{ 'p': { my: 0.5 }, 'strong': { color: 'primary.main' } }}>
           <ReactMarkdown>{action_items}</ReactMarkdown>
        </Box>
      </Paper>
    </Box>
  );
}