import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface AirQualityData {
  id: string;
  data: any;
}

interface AirQualityChartProps {
  data: AirQualityData[];  
}

export const AirQualityChart: React.FC<AirQualityChartProps> = ({ data }) => {
//using the data from the weather api this creates a dynamic chart to better represent the data
  const chartData = {
    labels: data.map((item) => item.id),
    datasets: [
      {
        label: 'Air Quality Data (µg/m³)',
        data: data.map((item) => item.data),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  //this is the spec for the chart values and how high to set the key on the sides of the graph
  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(...data.map((item) => item.data)) + 10, 
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default AirQualityChart;
