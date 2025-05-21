import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../../../styles/components/dashboard/charts/OrderSummaryChart.css";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const OrderSummaryChart = () => {
  // Order numbers
  const orderNumbers = {
    served: "09",
    dineIn: "05",
    takeAway: "06",
  };

  // Order type data
  const data = {
    labels: [],
    datasets: [
      {
        data: [24, 41, 39], // Take Away, Served, Dine In
        backgroundColor: ["#444", "#bdbdbd", "#757575"],
        borderWidth: 0,
        cutout: "75%",
      },
    ],
  };

  const legendData = [
    { label: "Take Away", percent: 24, color: "#444" },
    { label: "Served", percent: 41, color: "#bdbdbd" },
    { label: "Dine in", percent: 39, color: "#757575" },
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
          Daily <span className="chart-period-arrow">▼</span>
        </div>
      </div>
      <div className="chart-divider" />

      <div className="order-numbers">
        <div className="order-number-item">
          <div className="order-number">{orderNumbers.served}</div>
          <div className="order-label">Served</div>
        </div>
        <div className="order-number-item">
          <div className="order-number">{orderNumbers.dineIn}</div>
          <div className="order-label">Dine In</div>
        </div>
        <div className="order-number-item">
          <div className="order-number">{orderNumbers.takeAway}</div>
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
    </div>
  );
};

export default OrderSummaryChart;
