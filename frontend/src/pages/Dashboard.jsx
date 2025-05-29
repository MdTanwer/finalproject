import { useState } from "react";
import "../styles/pages/Dashboard.css";
import MetricsOverview from "../components/dashboard/MetricsOverview";
import RevenueChart from "../components/dashboard/charts/RevenueChart";
import OrderSummaryChart from "../components/dashboard/charts/OrderSummaryChart";
import TablesCalendar from "../components/dashboard/TablesCalendar";
import ChefOrderList from "../components/dashboard/ChefOrderList";
import "../styles/layouts/MainLayout.css";
import DashboardHeader from "../components/navigation/HeaderDashboard";
import Sidebar from "../components/navigation/Sidebar";

const defaultFilters = {
  analytics: true,
  orderSummary: true,
  revenue: true,
  chefOrders: true,
  tables: true,
};

const Dashboard = () => {
  const [filters, setFilters] = useState(defaultFilters);

  // Determine which sections are visible
  const visibleSections = Object.keys(filters).filter((key) => filters[key]);
  const allSelected =
    visibleSections.length === Object.keys(defaultFilters).length;

  return (
    <div className="main-layout">
      <DashboardHeader
        filters={filters}
        onFilterChange={setFilters}
        placeholder="Select Section"
      />
      <div className="content-area">
        <Sidebar />
        <main className="main-content">
          <div className="dashboard-page">
            <div className="dashboard-header">
              <h1>Analytics</h1>
            </div>
            {/* Table of visible sections */}

            {/* Dashboard sections */}
            {(allSelected || filters.analytics) && <MetricsOverview />}
            <div className="dashboard-grid">
              {(allSelected || filters.orderSummary) && <OrderSummaryChart />}
              {(allSelected || filters.revenue) && <RevenueChart />}
              {(allSelected || filters.tables) && <TablesCalendar />}
            </div>
            {(allSelected || filters.chefOrders) && <ChefOrderList />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
