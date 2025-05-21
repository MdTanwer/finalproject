import "../../styles/components/dashboard/MetricCard.css";

const MetricCard = ({ title, value, icon }) => {
  return (
    <div className="metric-card">
      <div className="metric-icon">
        <span>{icon}</span>
      </div>
      <div className="metric-content">
        <p className="metric-value">{value}</p>
        <h3 className="metric-title">{title}</h3>
      </div>
    </div>
  );
};

export default MetricCard;
