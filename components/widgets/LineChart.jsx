"use client";
import React from "react";
import { Box, Paper, Typography, useTheme, Grid } from "@mui/material";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import autocolors from "chartjs-plugin-autocolors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  autocolors
);

const getChartOptions = (theme) => {
  const CHART_COLORS = {
    primary: theme.palette.secondary.main,
    primary_gradient_start: "rgba(0, 191, 255, 0.2)",
    primary_gradient_end: "rgba(0, 191, 255, 0.0)",
    secondary: theme.palette.primary.light,
    grid: "rgba(255, 255, 255, 0.1)",
    tooltip_bg: "#0D0C12",
    text_primary: theme.palette.text.primary,
    text_secondary: theme.palette.text.secondary,
  };

  const CHART_FONTS = {
    family:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1000, easing: "easeInOutQuart" },
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: { family: CHART_FONTS.family, size: 13 },
          color: CHART_COLORS.text_secondary,
          usePointStyle: true,
          pointStyle: "rectRounded",
          boxWidth: 8,
          padding: 20,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: CHART_COLORS.tooltip_bg,
        titleColor: CHART_COLORS.text_primary,
        bodyColor: CHART_COLORS.text_secondary,
        titleFont: { size: 14, weight: "bold", family: CHART_FONTS.family },
        bodyFont: { size: 12, family: CHART_FONTS.family },
        padding: 12,
        cornerRadius: 8,
        caretSize: 6,
        boxPadding: 4,
        borderWidth: 1,
        borderColor: CHART_COLORS.grid,
      },
    },
    scales: {
      y: {
        border: { display: false },
        grid: { color: CHART_COLORS.grid, drawTicks: false },
        ticks: {
          font: { family: CHART_FONTS.family, size: 12 },
          color: CHART_COLORS.text_secondary,
          padding: 10,
        },
      },
      x: {
        border: { display: false },
        grid: { display: false },
        ticks: {
          font: { family: CHART_FONTS.family, size: 12 },
          color: CHART_COLORS.text_secondary,
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false, // This is key to letting the pie fill the container
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          font: { family: CHART_FONTS.family, size: 12 },
          color: CHART_COLORS.text_secondary,
          boxWidth: 8,
          padding: 15,
        },
      },
      tooltip: commonOptions.plugins.tooltip,
      autocolors: { mode: "data", offset: 10 },
    },
  };

  return { commonOptions, pieOptions, CHART_COLORS };
};

const createVerticalGradient = (ctx, area, color1, color2) => {
  if (!area) return color1;
  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
  gradient.addColorStop(0, color2);
  gradient.addColorStop(1, color1);
  return gradient;
};

export default function LineChartWidget({ payload }) {
  const theme = useTheme();
  const { commonOptions, pieOptions, CHART_COLORS } = getChartOptions(theme);
  const {
    data_name,
    labels,
    historical_data,
    forecast_data,
    intro_text,
    chart_type = "line",
    historical_pie,
    forecast_pie,
  } = payload;

  // --- [THE FIX] ---
  // Define dynamic styles for the chart container based on the chart type.
  let chartContainerStyle;
  if (chart_type === "comparative_pie") {
    // A shorter container for pie charts to make them feel larger and more compact.
    chartContainerStyle = {
      height: "320px",
      width: "100%",
      position: "relative",
    };
  } else {
    // A taller, full-width container for line and bar charts.
    chartContainerStyle = {
      height: "400px",
      width: "480px",
      position: "relative",
    };
  }
  // --- [END FIX] ---

  const renderChart = () => {
    switch (chart_type) {
      case "line":
        const lineData = {
          labels,
          datasets: [
            {
              label: "Historical Data",
              data: historical_data,
              fill: "start",
              backgroundColor: (context) =>
                createVerticalGradient(
                  context.chart.ctx,
                  context.chart.chartArea,
                  CHART_COLORS.primary_gradient_start,
                  CHART_COLORS.primary_gradient_end
                ),
              borderColor: CHART_COLORS.primary,
              tension: 0.4,
              borderWidth: 2.5,
              pointRadius: 0,
              pointHoverRadius: 6,
              pointBackgroundColor: CHART_COLORS.primary,
            },
            {
              label: "Forecasted Data",
              data: forecast_data,
              fill: false,
              borderColor: CHART_COLORS.secondary,
              borderDash: [5, 5],
              tension: 0.4,
              borderWidth: 2.5,
              pointRadius: 0,
              pointHoverRadius: 6,
              pointBackgroundColor: CHART_COLORS.secondary,
            },
          ],
        };
        return <Line options={commonOptions} data={lineData} />;

      case "bar":
        const barData = {
          labels,
          datasets: [
            {
              label: "Historical",
              data: historical_data,
              backgroundColor: CHART_COLORS.primary,
              borderRadius: 5,
            },
            {
              label: "Forecast",
              data: forecast_data,
              backgroundColor: CHART_COLORS.secondary,
              borderRadius: 5,
            },
          ],
        };
        return <Bar options={commonOptions} data={barData} />;

      case "pie": // This name is used by the backend, so we map it to the comparative_pie layout
      case "comparative_pie":
        const pieDataHistorical = {
          labels: historical_pie.map((item) => item.label),
          datasets: [
            {
              data: historical_pie.map((item) => item.value),
              borderColor: theme.palette.background.paper,
              borderWidth: 4,
            },
          ],
        };
        const pieDataForecast = {
          labels: forecast_pie.map((item) => item.label),
          datasets: [
            {
              data: forecast_pie.map((item) => item.value),
              borderColor: theme.palette.background.paper,
              borderWidth: 4,
            },
          ],
        };
        return (
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{ height: "100%" }}
          >
            <Grid
              item
              xs={12}
              md={6}
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <Typography variant="h6" align="center" fontWeight="600">
                Historical
              </Typography>
              <Box sx={{ flexGrow: 1, position: "relative" }}>
                <Pie options={pieOptions} data={pieDataHistorical} />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <Typography variant="h6" align="center" fontWeight="600">
                Forecast
              </Typography>
              <Box sx={{ flexGrow: 1, position: "relative" }}>
                <Pie options={pieOptions} data={pieDataForecast} />
              </Box>
            </Grid>
          </Grid>
        );

      default:
        return (
          <Typography>Chart type '{chart_type}' not recognized.</Typography>
        );
    }
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          background: "background.paper",
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" component="h3" fontWeight="700">
            {data_name}
          </Typography>
          {intro_text && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {intro_text}
            </Typography>
          )}
        </Box>
        {/* The Box now uses the dynamic style */}
        <Box sx={chartContainerStyle}>{renderChart()}</Box>
      </Paper>
    </Box>
  );
}
