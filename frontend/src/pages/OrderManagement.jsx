import "../styles/pages/OrderManagement.css";
import OrdersList from "../components/orders/OrdersList";
import OrderDetails from "../components/orders/OrderDetails";
import OrderFilters from "../components/orders/OrderFilters";

const OrderManagement = () => {
  return (
    <div className="order-management-page">
      <p className="order-heading">Order Line</p>

      <div className="orders-container">
        <OrdersList />
      </div>
    </div>
  );
};

export default OrderManagement;
