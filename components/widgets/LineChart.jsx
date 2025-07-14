// components/widgets/LineChart.jsx
'use client';
import React from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register all necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// --- Constants for a professional and consistent look ---
const CHART_COLORS = {
  primary: '#4F46E5', // Vibrant Indigo
  primary_gradient_start: 'rgba(79, 70, 229, 0.4)',
  primary_gradient_end: 'rgba(79, 70, 229, 0.0)',
  secondary: '#EC4899', // Contrasting Vibrant Pink
  secondary_light: 'rgba(236, 72, 153, 0.15)',
  grid: 'rgba(229, 231, 235, 0.6)', // Softer grid lines
  tooltip_bg: '#ffffff',
  tooltip_border: '#E2E8F0',
};

const CHART_FONTS = {
    family: '"Inter", "Helvetica", "Arial", sans-serif',
};

export default function LineChart({ payload }) {
  const theme = useTheme();
  const { data_name, labels, historical_data, forecast_data, intro_text } = payload;

  const createGradient = (ctx, area, startColor, endColor) => {
    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
    gradient.addColorStop(0, endColor);
    gradient.addColorStop(1, startColor);
    return gradient;
  };
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Historical Data',
        data: historical_data,
        fill: true,
        backgroundColor: (context) => {
          if (!context.chart.chartArea) return null;
          return createGradient(context.chart.ctx, context.chart.chartArea, CHART_COLORS.primary_gradient_start, CHART_COLORS.primary_gradient_end);
        },
        borderColor: CHART_COLORS.primary,
        tension: 0.4,
        borderWidth: 2.5,
        // --- KEY CHANGE: Beautiful points are now ALWAYS visible ---
        pointRadius: 4, // Make points visible by default
        pointBackgroundColor: '#fff', // White center creates the "ring"
        pointBorderColor: CHART_COLORS.primary,
        pointBorderWidth: 2,
        pointHoverRadius: 7, // Enlarge points on hover
        pointHoverBorderWidth: 3,
        pointHitRadius: 20,
      },
      {
        label: 'Forecasted Data',
        data: forecast_data,
        fill: true,
        backgroundColor: CHART_COLORS.secondary_light,
        borderColor: CHART_COLORS.secondary,
        borderDash: [5, 5],
        tension: 0.4,
        borderWidth: 2.5,
        // --- Consistent styling for forecast points ---
        pointRadius: 4,
        pointBackgroundColor: '#fff',
        pointBorderColor: CHART_COLORS.secondary,
        pointBorderWidth: 2,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 3,
        pointHitRadius: 20,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    plugins: {
      legend: {
        // --- KEY CHANGE: Legend moved to the bottom ---
        position: 'bottom',
        align: 'center',
        labels: {
          padding: 30, // Increased padding for more space
          boxWidth: 10,
          boxHeight: 10,
          usePointStyle: true,
          pointStyle: 'circle',
          font: { size: 14, family: CHART_FONTS.family },
          color: theme.palette.text.secondary,
        },
        title: {
            display: false,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: CHART_COLORS.tooltip_bg,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        titleFont: { size: 16, weight: '600', family: CHART_FONTS.family },
        bodyFont: { size: 14, family: CHART_FONTS.family },
        padding: 14,
        cornerRadius: 12,
        borderColor: CHART_COLORS.tooltip_border,
        borderWidth: 1,
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
        displayColors: true,
        usePointStyle: true,
        callbacks: {
            title: (context) => `Details for: ${context[0].label}`,
            label: (context) => {
                let label = context.dataset.label || '';
                if (label) label += ': ';
                if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                }
                return label;
            },
        },
      },
    },
    scales: {
      y: {
        border: { display: false },
        grid: { color: CHART_COLORS.grid, drawBorder: false },
        ticks: {
          font: { size: 12, family: CHART_FONTS.family },
          color: theme.palette.text.secondary,
          callback: (value) => `$${(value / 1000)}k`,
        },
      },
      x: {
        border: { display: false },
        grid: { display: false },
        ticks: {
          font: { size: 12, family: CHART_FONTS.family },
          color: theme.palette.text.secondary,
        },
      },
    },
    onHover: (event, chartElement) => {
      const chartArea = event.native.target;
      if (chartElement.length) {
          chartArea.style.cursor = 'pointer';
      } else {
          chartArea.style.cursor = 'default';
      }
    },
  };

  return (
    <Box sx={{ mt: 2 }}>
        <Paper 
            elevation={0}
            sx={{ 
                p: { xs: 2, md: 3 }, 
                borderRadius: '20px', 
                border: `1px solid ${theme.palette.divider}`,
                background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(250,251,252,1) 100%)',
                boxShadow: '0px 10px 30px -5px rgba(0, 0, 0, 0.04)',
            }}
        >
            {/* --- Chart Header --- */}
            <Box sx={{ mb: 3 }}> {/* KEY CHANGE: Increased bottom margin for more space */}
                <Typography variant="h5" component="h3" fontWeight="700" fontFamily={CHART_FONTS.family}>
                    {`Forecast: ${data_name}`}
                </Typography>
                {intro_text && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {intro_text}
                    </Typography>
                )}
            </Box>

            {/* --- Chart Canvas --- */}
            <Box sx={{ height: { xs: '350px', md: '450px' }, position: 'relative' }}>
                <Line options={options} data={data} />
            </Box>
        </Paper>
    </Box>
  );
}