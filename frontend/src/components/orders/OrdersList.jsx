import "../../styles/components/orders/OrdersList.css";
import { FaUtensils } from "react-icons/fa";
import { useApi } from "../../context/ApiContext";
import { useEffect, useState, useRef } from "react";

const OrdersList = () => {
  const { orders, ordersLoading, ordersError, getOrders, updateOrderStatus } =
    useApi();
  const [timers, setTimers] = useState({});
  const intervalRef = useRef();

  // Initialize timers for ongoing orders
  useEffect(() => {
    if (!orders) return;
    const newTimers = {};
    orders.forEach((order) => {
      if (order.status === "processing" && order.deliveryTime) {
        // Calculate remaining seconds
        const created = new Date(order.createdAt).getTime();
        const now = Date.now();
        const deliveryMs = Number(order.deliveryTime) * 60 * 1000;
        const elapsed = now - created;
        const remaining = Math.max(
          0,
          Math.floor((deliveryMs - elapsed) / 1000)
        );
        newTimers[order._id] = remaining;
      }
    });
    setTimers(newTimers);
  }, [orders]);

  // Real-time countdown and status update
  useEffect(() => {
    if (!orders) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimers((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((id) => {
          if (updated[id] > 0) {
            updated[id] -= 1;
          } else if (updated[id] === 0) {
            // Time's up, update status in backend
            updated[id] = -1; // Prevent multiple triggers
            handleOrderStatusUpdate(id);
          }
        });
        return { ...updated };
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line
  }, [orders]);

  // Update order status in backend
  const handleOrderStatusUpdate = async (orderId) => {
    await updateOrderStatus(orderId, "served");
    getOrders();
  };

  if (ordersLoading) return <div>Loading orders...</div>;
  if (ordersError) return <div>Error loading orders: {ordersError}</div>;
  if (!orders || orders.length === 0) return <div>No orders found.</div>;

  // Helper to format seconds as mm:ss
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <>
      {orders.map((order) => (
        <div key={order._id} className={`order-card ${order.status}`}>
          <div className="order-card-container ">
            <div className="order-card-header">
              <div>
                {" "}
                <div>
                  {" "}
                  <span className="order-card-icon">
                    <FaUtensils />
                  </span>
                  <span className="order-card-title">
                    {order.orderId
                      ? order.orderId < 10
                        ? `0${order.orderId}`
                        : order.orderId
                      : "N/A"}
                  </span>
                </div>
                <div className="order-card-table-id">
                  {order.tableName || "Table N/A"}
                </div>
                <div className="order-card-time">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </div>
                {/* Show delivery time for ongoing orders */}
              </div>
              <div>
                {" "}
                <div className="order-card-badge">
                  <h5>
                    {order.status === "processing"
                      ? `Ongoing (${formatTime(
                          timers[order._id] ?? order.deliveryTime * 60
                        )})`
                      : order.status === "served"
                      ? "Served"
                      : order.status === "notPickedUp"
                      ? "Not Picked Up"
                      : order.status}
                  </h5>
                </div>
              </div>
            </div>
            <h1 className="item-qnty">
              Item {order.items ? order.items.length : 0}
            </h1>
          </div>

          <div className="order-card-body">
            <ul className="order-card-items">
              {order.items &&
                order.items.map((item, idx) => (
                  <li key={idx} style={{ fontSize: 13 }}>
                    {item.quantity} x{" "}
                    {item.menuItem?.name || item.name || item.productName}
                  </li>
                ))}
            </ul>
          </div>
          <div className="order-card-footer">
            <button className="order-card-btn">
              {order.status === "processing"
                ? "Processing"
                : order.status === "served"
                ? "Order Done"
                : order.status === "notPickedUp"
                ? "Not Picked Up"
                : order.status}
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default OrdersList;
