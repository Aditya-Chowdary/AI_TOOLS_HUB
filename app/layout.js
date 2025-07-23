'use client';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';

import { WebSocketProvider } from '@/context/WebSocketContext';
import theme from '@/lib/theme';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <WebSocketProvider>
          <CssBaseline />
          <body>
            {/* This Box creates the dynamic, animated gradient background */}
            <Box sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: -1,
              background: `radial-gradient(circle at 10% 20%, ${theme.palette.primary.dark} 0%, ${theme.palette.background.default} 25%),
                           radial-gradient(circle at 80% 90%, ${theme.palette.secondary.dark} 0%, ${theme.palette.background.default} 25%)`,
              animation: 'moveBackground 20s infinite alternate linear',
              '@keyframes moveBackground': {
                '0%': { backgroundPosition: '0% 50%' },
                '100%': { backgroundPosition: '100% 50%' },
              }
            }} />
            {children}
          </body>
        </WebSocketProvider>
      </ThemeProvider>
    </html>
  );
}