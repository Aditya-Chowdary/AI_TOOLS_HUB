'use client';
import { createTheme } from '@mui/material/styles';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#6D28D9' },
    secondary: { main: '#4F46E5' },
    background: { default: '#F8F9FE', paper: '#FFFFFF' },
    text: { primary: '#1F2937', secondary: '#6B7280' },
    divider: '#E5E7EB',
    success: { main: '#10B981' },
    error: { main: '#EF4444' },
    warning: { main: '#F59E0B' },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', borderRadius: '8px' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)' },
      },
    },
  },
});

export default theme;