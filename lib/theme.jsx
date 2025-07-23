'use client';
import { createTheme } from '@mui/material/styles';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'dark', // Switched to a dark theme for a more modern, focused feel
    primary: {
      main: '#8A2BE2', // A vibrant purple
      light: '#A052E8',
      dark: '#6A1E9E',
    },
    secondary: {
      main: '#00BFFF', // A bright cyan for accents
      light: '#33CFFF',
      dark: '#009ACD',
    },
    background: {
      default: '#0D0C12', // A very dark, near-black for the main background
      paper: '#1A1822', // A slightly lighter dark purple for cards and surfaces
    },
    text: {
      primary: '#F5F5F5', // Off-white for primary text
      secondary: '#B0B0B0', // Gray for secondary text
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    success: { main: '#00E676' },
    error: { main: '#FF5252' },
    warning: { main: '#FFC400' },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    }
  },
  shape: {
    borderRadius: 12, // Consistent, modern border radius
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // Important for overriding default MUI gradients in dark mode
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 20px',
        },
        containedPrimary: {
          color: '#fff',
        }
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(255, 255, 255, 0.12)',
        }
      }
    }
  },
});

export default theme;