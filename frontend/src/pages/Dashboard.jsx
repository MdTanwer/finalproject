import "../styles/pages/Dashboard.css";
import MetricsOverview from "../components/dashboard/MetricsOverview";
import RevenueChart from "../components/dashboard/charts/RevenueChart";
import OrderSummaryChart from "../components/dashboard/charts/OrderSummaryChart";
import TablesCalendar from "../components/dashboard/TablesCalendar";
import ChefOrderList from "../components/dashboard/ChefOrderList";
import "../styles/layouts/MainLayout.css";
import Dashboardheader from "../components/navigation/HeaderDashboard";
import Sidebar from "../components/navigation/Sidebar";

const Dashboard = () => {
  return (
    <div className="main-layout">
      <Dashboardheader />
      <div className="content-area">
        <Sidebar />
        <main className="main-content">
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
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
