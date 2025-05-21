import "../styles/pages/Dashboard.css";
import MetricsOverview from "../components/dashboard/MetricsOverview";
import RevenueChart from "../components/dashboard/charts/RevenueChart";
import OrderSummaryChart from "../components/dashboard/charts/OrderSummaryChart";
import TablesCalendar from "../components/dashboard/TablesCalendar";
import ChefOrderList from "../components/dashboard/ChefOrderList";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Analytics</h1>
      </div>

      <MetricsOverview />

      <div className="dashboard-grid">
        <OrderSummaryChart /> <RevenueChart /> <TablesCalendar />
      </div>

      <ChefOrderList />
    </div>
  );
};

export default Dashboard;
