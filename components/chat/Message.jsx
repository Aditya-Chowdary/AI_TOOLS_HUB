'use client';
import React from 'react';
import { Box, Avatar, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

// Import all the widget components
import MermaidChart from '../widgets/MermaidChart';
import LineChart from '../widgets/LineChart';
import VideoWidget from '../widgets/VideoWidget';
import EmailWidget from '../widgets/EmailWidget';
import TextMessage from '../widgets/TextMessage';
import VideoSummarizerWidget from '../widgets/VideoSummarizerWidget';
import AudioWidget from '../widgets/AudioWidget';
import SummaryWidget from '../widgets/SummaryWidget';
import VideoUserMessage from '../widgets/VideoUserMessage';
import InboxWidget from '../widgets/InboxWidget';


const MessageContent = ({ message }) => {
    const content_type = message?.content_type;
    const payload = message?.payload;

    // Handle user-side video message display
    if (message.role === 'user' && content_type === 'video_user_message') {
        return <VideoUserMessage payload={payload} />;
    }

    const errorData = message?.data;

    // --- [THE FIX] ---
    // The content value must be a valid string. The original code was missing backticks (` `)
    // to create a template literal, which caused a syntax error.
    if (!payload && errorData) {
        return <TextMessage payload={{ content: `**Error:** ${errorData}` }} />;
    }
  
    if (!payload) {
        return <TextMessage payload={{ content: "Received an invalid message format." }} />;
    }

    switch (content_type) {
        case 'text': return <TextMessage payload={payload} />;
        case 'mermaid': return <MermaidChart payload={payload} />;
        case 'chart': return <LineChart payload={payload} />;
        case 'video': return <VideoWidget payload={payload} />;
        case 'email': return <EmailWidget payload={payload} />;
        case 'audio': return <AudioWidget payload={payload} />;
        case 'video_summary': return <VideoSummarizerWidget payload={payload} />;
        case 'inbox_analysis': return <InboxWidget payload={payload}/>
        case 'summary': return <SummaryWidget payload={payload} />;
        default:
            // Fallback for user text messages which don't have a specific widget
            if (message.role === 'user') {
                return <TextMessage payload={payload} />;
            }
            return <TextMessage payload={{ content: "An unexpected response was received." }} />;
    }
};


export default function Message({ message }) {
    const isUser = message.role === 'user';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
                display: 'flex',
                justifyContent: isUser ? 'flex-end' : 'flex-start',
                marginBottom: '20px',
            }}
        >
            <Box sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.5,
                maxWidth: { xs: '90%', md: '75%' },
                flexDirection: isUser ? 'row-reverse' : 'row',
            }}>
                <Avatar sx={{
                    bgcolor: isUser ? 'secondary.main' : 'primary.main',
                    width: 40,
                    height: 40,
                    mt: 0.5,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}>
                    {isUser ? <PersonOutlineOutlinedIcon /> : <SmartToyOutlinedIcon />}
                </Avatar>
        
                <Box sx={{
                    p: message.content_type === 'video_user_message' ? 0.5 : '12px 18px',
                    bgcolor: isUser ? 'secondary.main' : 'background.paper',
                    color: isUser ? 'white' : 'text.primary',
                    borderRadius: 1,
                    // borderTopLeftRadius: isUser ? 4 : 1,
                    // borderTopRightRadius: isUser ? 1 : 4,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    overflow: 'hidden',
                }}>
                    <MessageContent message={message} />
                </Box>
            </Box>
        </motion.div>
    );
}