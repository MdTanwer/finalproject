import { useEffect, useMemo, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useApi } from "../../../context/ApiContext";
import "../../../styles/components/dashboard/charts/OrderSummaryChart.css";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const getStartOfPeriod = (period) => {
  const now = new Date();
  if (period === "Daily") {
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  } else if (period === "Weekly") {
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Monday as start
    return new Date(now.getFullYear(), now.getMonth(), diff);
  } else if (period === "Monthly") {
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }
  return now;
};

const OrderSummaryChart = () => {
  const { orders, ordersLoading, ordersError, getOrders } = useApi();
  const [period, setPeriod] = useState("Daily");

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line
  }, []);

  // Filter orders by period
  const filteredOrders = useMemo(() => {
    const start = getStartOfPeriod(period);
    return orders.filter((order) => {
      const created = new Date(order.createdAt);
      return created >= start;
    });
  }, [orders, period]);

  // Compute order counts
  const summary = useMemo(() => {
    let served = 0;
    let dineIn = 0;
    let takeAway = 0;
    filteredOrders.forEach((order) => {
      if (order.status === "served") served++;
      if (order.orderType === "dineIn") dineIn++;
      if (order.orderType === "takeAway") takeAway++;
    });
    return { served, dineIn, takeAway };
  }, [filteredOrders]);

  // Compute percentages for chart
  const total = summary.served + summary.dineIn + summary.takeAway;
  const percent = (count) => (total ? Math.round((count / total) * 100) : 0);

  const data = {
    labels: [],
    datasets: [
      {
        data: [summary.takeAway, summary.served, summary.dineIn], // Take Away, Served, Dine In
        backgroundColor: ["#444", "#bdbdbd", "#757575"],
        borderWidth: 0,
        cutout: "75%",
      },
    ],
  };

  const legendData = [
    { label: "Take Away", percent: percent(summary.takeAway), color: "#444" },
    { label: "Served", percent: percent(summary.served), color: "#bdbdbd" },
    { label: "Dine in", percent: percent(summary.dineIn), color: "#757575" },
  ];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="order-summary-chart">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Order Summary</h3>
          <div className="chart-desc">
            Track total sales, items sold, and top products
          </div>
        </div>
        <div className="chart-period">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="chart-period-select"
          >
            <option className="chart-period-option" value="Daily">
              Daily
            </option>
            <option className="chart-period-option" value="Weekly">
              Weekly
            </option>
            <option className="chart-period-option" value="Monthly">
              Monthly
            </option>
          </select>
        </div>
      </div>
      <div className="chart-divider" />

      {ordersLoading ? (
        <div>Loading...</div>
      ) : ordersError ? (
        <div className="error">{ordersError}</div>
      ) : (
        <>
          <div className="order-numbers">
            <div className="order-number-item">
              <div className="order-number">{summary.served}</div>
              <div className="order-label">Served</div>
            </div>
            <div className="order-number-item">
              <div className="order-number">{summary.dineIn}</div>
              <div className="order-label">Dine In</div>
            </div>
            <div className="order-number-item">
              <div className="order-number">{summary.takeAway}</div>
              <div className="order-label">Take Away</div>
            </div>
          </div>

          <div className="chart-flex-row">
            <div className="chart-container">
              <Doughnut data={data} options={options} />
            </div>
            <div className="chart-legend">
              {legendData.map((item) => (
                <div className="legend-item" key={item.label}>
                  <span
                    className="legend-color"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span className="legend-label">{item.label}</span>
                  <span className="legend-percent">({item.percent}%)</span>
                  <span className="legend-bar-bg">
                    <span
                      className="legend-bar"
                      style={{
                        width: `${item.percent}%`,
                        backgroundColor: item.color,
                      }}
                    ></span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummaryChart;
