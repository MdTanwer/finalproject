import React, { useState } from "react";
import "../styles/pages/OrderManagement.css";
import OrdersList from "../components/orders/OrdersList";
import TableHeader from "../components/navigation/TableHeader";
import Sidebar from "../components/navigation/Sidebar";
import OrderHeader from "../components/navigation/orderHeader";
import { useApi } from "../context/ApiContext";

const OrderManagement = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const { orders } = useApi();

  // Filter orders by status
  const filteredOrders = React.useMemo(() => {
    if (!orders) return [];
    if (statusFilter === "all") return orders;
    if (statusFilter === "picked up" || statusFilter === "not picked up") {
      return orders.filter(
        (order) =>
          order.orderType === "takeAway" &&
          order.takeawayStatus === statusFilter
      );
    }
    return orders.filter((order) => order.status === statusFilter);
  }, [orders, statusFilter]);

  return (
    <div className="main-layout">
      {/* <TableHeader /> */}
      <OrderHeader
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
      <div className="content-area">
        <Sidebar />
        <main className="main-content">
          <div className="order-management-page">
            <p className="order-heading">Order Line</p>

            <div className="orders-container">
              <OrdersList orders={filteredOrders} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrderManagement;
