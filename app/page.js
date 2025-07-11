import { Box } from '@mui/material';
import Hero from '@/components/landing/Hero';

export default function LandingPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #111827 0%, #1F2937 100%)',
        overflow: 'hidden', // Prevents scrollbars from background elements
      }}
    >
      <Hero />
    </Box>
  );
}