import "../styles/pages/OrderManagement.css";
import OrdersList from "../components/orders/OrdersList";
import TableHeader from "../components/navigation/TableHeader";
import Sidebar from "../components/navigation/Sidebar";

const OrderManagement = () => {
  return (
    <div className="main-layout">
      <TableHeader />
      <div className="content-area">
        <Sidebar />
        <main className="main-content">
          <div className="order-management-page">
            <p className="order-heading">Order Line</p>

            <div className="orders-container">
              <OrdersList />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrderManagement;
