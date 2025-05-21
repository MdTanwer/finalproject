import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import "../../../styles/components/dashboard/charts/RevenueChart.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

// Custom plugin for background bars
const backgroundBarPlugin = {
  id: "customBackgroundBars",
  beforeDatasetsDraw: (chart) => {
    const {
      ctx,
      chartArea,
      scales: { x },
    } = chart;
    if (!chartArea) return;

    const barColors = [
      "#f7f9f8",
      "#f7f9f8",
      "#f7f9f8",
      "#f7f9f8",
      "#f7f9f8",
      "#e6ecea",
      "#f7f9f8",
    ]; // Highlight Saturday

    const barWidth = (x.getPixelForValue(1) - x.getPixelForValue(0)) * 0.9;

    for (let i = 0; i < 7; i++) {
      const xPos = x.getPixelForValue(i) - barWidth / 2;
      ctx.save();
      ctx.fillStyle = barColors[i];
      ctx.fillRect(
        xPos,
        chartArea.top,
        barWidth,
        chartArea.bottom - chartArea.top
      );
      ctx.restore();
    }
  },
};

const RevenueChart = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fir", "Sat", "Sun"];

  // Sample data for revenue
  const data = {
    labels: days,
    datasets: [
      {
        label: "Revenue",
        data: [4500, 3800, 5000, 4200, 5800, 5200, 4800],
        borderColor: "#000000",
        backgroundColor: "transparent",
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      y: { display: false },
      x: {
        display: true,
        grid: { display: false, drawBorder: false },
        ticks: {
          color: "#8a8a8a",
          font: { size: 13, family: "Inter", weight: 500 },
        },
      },
    },
    elements: { line: { tension: 0.4 } },
  };

  return (
    <div className="revenue-chart">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Revenue</h3>
          <div className="chart-desc">
            Review your revenue trends and total income
          </div>
        </div>
        <div className="chart-period">
          Daily <span className="chart-period-arrow">▼</span>
        </div>
      </div>
      <div className="chart-divider" />
      <div className="revenue-chart-area">
        <Line data={data} options={options} plugins={[backgroundBarPlugin]} />
      </div>
    </div>
  );
};

export default RevenueChart;
