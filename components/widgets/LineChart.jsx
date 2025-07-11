// components/widgets/LineChart.jsx
'use client';
import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
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
  Filler, // Import the 'Filler' plugin for gradient backgrounds
} from 'chart.js';

// Register all necessary components, including the Filler for gradients
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function LineChart({ payload }) {
  const { data_name, labels, historical_data, forecast_data, intro_text } = payload;

  // This function creates the beautiful gradient background for our chart lines
  const createGradient = (ctx, area) => {
    const colorStart = 'rgba(79, 70, 229, 0.4)';  // A vibrant indigo
    const colorEnd = 'rgba(79, 70, 229, 0.0)';
    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
    gradient.addColorStop(0, colorEnd);
    gradient.addColorStop(1, colorStart);
    return gradient;
  };
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Historical Data',
        data: historical_data,
        borderColor: '#4F46E5', // A strong, confident indigo
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          return createGradient(ctx, chartArea);
        },
        fill: true,
        tension: 0.4, // Smoother curves
        pointRadius: 4,
        pointBackgroundColor: '#4F46E5',
        pointBorderColor: '#fff',
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#4F46E5',
        pointHoverBorderWidth: 2,
      },
      {
        label: 'Forecasted Data',
        data: forecast_data,
        borderColor: '#EC4899', // A vibrant pink for contrast
        backgroundColor: 'rgba(236, 72, 153, 0.1)',
        borderDash: [6, 6], // More pronounced dashes
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#EC4899',
        pointBorderColor: '#fff',
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#EC4899',
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows us to control height independently
    plugins: {
      legend: {
        position: 'bottom', // Move legend to the bottom for a cleaner top area
        labels: {
          padding: 20,
          font: { size: 14, family: '"Inter", sans-serif' },
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: `Forecast: ${data_name}`,
        font: { size: 20, weight: '600', family: '"Inter", sans-serif' },
        padding: { top: 10, bottom: 20 },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 16 },
        bodyFont: { size: 14 },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: '#e5e7eb', // Softer grid lines
          borderDash: [2, 4],
        },
        ticks: {
          font: { size: 12 },
          // Optional: format as currency or with commas
          callback: function(value) {
            return '$' + new Intl.NumberFormat('en-US').format(value);
          }
        },
      },
      x: {
        grid: {
          display: false, // Cleaner look without vertical grid lines
        },
        ticks: {
          font: { size: 12 },
        },
      },
    },
    interaction: {
        mode: 'index',
        intersect: false,
    },
  };

  return (
    <Box sx={{ mt: 1.5 }}>
        {intro_text && (
            <Typography component="div" sx={{ mb: 1.5, color: 'text.secondary' }}>
                {intro_text}
            </Typography>
        )}
        <Paper 
            variant="outlined" 
            sx={{ 
                p: { xs: 2, md: 3 }, 
                borderRadius: '16px', 
                bgcolor: 'white',
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            }}
        >
            {/* Increase the size of the container for the chart */}
            <Box sx={{ height: { xs: '350px', md: '450px' }, position: 'relative' }}>
                <Line options={options} data={data} />
            </Box>
        </Paper>
    </Box>
  );
}