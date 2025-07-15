// components/widgets/VideoSummarizerWidget.jsx
'use client';
import React from 'react';
import { Box, Paper, Typography, Divider, Chip } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
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
      sx={{ fontWeight: 600 }}
    />
  );
};

export default function VideoSummarizerWidget({ payload }) {
  const { summary_text, action_items, overall_sentiment, sentiment_score, intro_text } = payload;

  return (
    <Box>
      {intro_text && <Typography variant="body2" sx={{ mb: 2, fontWeight: 500 }}>{intro_text}</Typography>}
      <Paper elevation={2} sx={{ p: 3, borderRadius: '12px', border: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
            Video Summary
          </Typography>
          <SentimentChip sentiment={overall_sentiment} score={sentiment_score} />
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ mb: 2 }}>
          <ReactMarkdown components={{
            p: ({node, ...props}) => <Typography variant="body2" {...props} />,
            strong: ({node, ...props}) => <Typography variant="body2" component="span" sx={{ fontWeight: 700 }} {...props} />,
          }}>
            {summary_text}
          </ReactMarkdown>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box>
           <ReactMarkdown components={{
            p: ({node, ...props}) => <Typography variant="body2" {...props} />,
            strong: ({node, ...props}) => <Typography variant="body2" component="span" sx={{ fontWeight: 700 }} {...props} />,
          }}>
            {action_items}
          </ReactMarkdown>
        </Box>
      </Paper>
    </Box>
  );
}