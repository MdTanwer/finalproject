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
import { useApi } from "../../../context/ApiContext";
import { useEffect, useState, useMemo } from "react";

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

const PERIODS = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
];

const RevenueChart = () => {
  const { orders, ordersLoading, getOrders } = useApi();
  const [period, setPeriod] = useState("daily");

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line
  }, []);

  // Helper to format and aggregate revenue
  const { labels, data } = useMemo(() => {
    if (!orders || orders.length === 0) {
      return { labels: [], data: [] };
    }

    const now = new Date();
    let labels = [];
    let data = [];

    if (period === "daily") {
      // Last 7 days
      labels = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(now);
        d.setDate(now.getDate() - (6 - i));
        return d.toLocaleDateString("en-US", { weekday: "short" });
      });

      data = labels.map((_, i) => {
        const d = new Date(now);
        d.setDate(now.getDate() - (6 - i));
        const dayStr = d.toISOString().slice(0, 10);
        return orders
          .filter(
            (order) =>
              order.createdAt && order.createdAt.slice(0, 10) === dayStr
          )
          .reduce((sum, order) => sum + (order.total || 0), 0);
      });
    } else if (period === "weekly") {
      // Last 4 weeks
      labels = Array.from({ length: 4 }, (_, i) => {
        const start = new Date(now);
        start.setDate(now.getDate() - 7 * (3 - i));
        return `W${start.getWeek ? start.getWeek() : i + 1}`;
      });

      data = labels.map((_, i) => {
        const start = new Date(now);
        start.setDate(now.getDate() - 7 * (3 - i));
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        return orders
          .filter((order) => {
            const date = new Date(order.createdAt);
            return date >= start && date <= end;
          })
          .reduce((sum, order) => sum + (order.total || 0), 0);
      });
    } else if (period === "monthly") {
      // Last 6 months
      labels = Array.from({ length: 6 }, (_, i) => {
        const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
        return d.toLocaleDateString("en-US", { month: "short" });
      });

      data = labels.map((_, i) => {
        const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
        const month = d.getMonth();
        const year = d.getFullYear();
        return orders
          .filter((order) => {
            const date = new Date(order.createdAt);
            return date.getMonth() === month && date.getFullYear() === year;
          })
          .reduce((sum, order) => sum + (order.total || 0), 0);
      });
    }

    return { labels, data };
  }, [orders, period]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data,
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
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="chart-period-select"
          >
            {PERIODS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="chart-divider" />
      <div className="revenue-chart-area">
        {ordersLoading ? (
          <div>Loading...</div>
        ) : (
          <Line
            data={chartData}
            options={options}
            plugins={[backgroundBarPlugin]}
          />
        )}
      </div>
    </div>
  );
};

export default RevenueChart;
