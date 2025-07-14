// app/layout.js
'use client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../lib/theme';
import "./globals.css";
// --- FIX: Import the WebSocketProvider here ---
import { WebSocketProvider } from '@/context/WebSocketContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* The ThemeProvider remains at the top level */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <body>
          {/* --- FIX: Wrap your entire application with the WebSocketProvider --- */}
          {/* This ensures the connection is established once and persists across all pages. */}
          <WebSocketProvider>
            {children}
          </WebSocketProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}