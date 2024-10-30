import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import priceData from './graph.json';  // Importing JSON data

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,   // Register point element
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
  
// Register the components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Define the types for the JSON data
interface PriceDataItem {
  platform: string;
  prices: number[];
  dates: string[];
}

const Graph: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const dates = priceData[0].dates; // Assuming all platforms have the same dates

    // Map price data for each platform
    const datasets = priceData.map((item: PriceDataItem) => ({
      label: item.platform,
      data: item.prices,
      borderColor: getRandomColor(), // Assign a random color for each line
      backgroundColor: 'rgba(0,0,0,0.1)', // Light background fill under the line
      fill: true,  // Fill under the line
      borderWidth: 2, // Line thickness
      pointRadius: 3, // Make data points visible
      lineTension: 0.4, // Smooth lines
    }));

    // Set the chart data
    setChartData({
      labels: dates,
      datasets: datasets,
    });
  }, []);

  // Generate a random color for each platform line
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Chart.js options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        onClick: (e, legendItem, legend) => {
          const index = legendItem.datasetIndex;
          const ci = legend.chart;
          const meta = ci.getDatasetMeta(index);
          meta.hidden = !meta.hidden;  // Toggle the visibility
          ci.update();
        },
      },
      title: {
        display: true,
        text: 'Price Comparison Across Platforms',
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `Price: $${context.raw}`;  // Customize tooltip to show price
          }
        }
      },
    },
    interaction: {
      mode: 'nearest', // Enable interaction to the nearest point
      intersect: false, // Don't require exact hover over the line
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date',
        },
        grid: {
          display: true, // Show grid lines
          color: 'rgba(0, 0, 0, 0.1)', // Light grid color
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Price ($)',
        },
        grid: {
          display: true, // Show grid lines
          color: 'rgba(0, 0, 0, 0.1)', // Light grid color
        }
      },
    },
  };

  return (
    <div>
      <h2>Price Comparison</h2>
      {chartData && <Line data={chartData} options={options} />}
    </div>
  );
};

export default Graph;
