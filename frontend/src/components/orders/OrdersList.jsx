import "../../styles/components/orders/OrdersList.css";
import { FaUtensils, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import { useApi } from "../../context/ApiContext";
import { useEffect, useState, useRef } from "react";

const OrdersList = ({ orders: propOrders }) => {
  const {
    orders: contextOrders,
    ordersLoading,
    ordersError,
    getOrders,
    updateOrderStatus,
    updateTakeawayStatus,
  } = useApi();
  const orders = propOrders || contextOrders;
  const [timers, setTimers] = useState({});
  const intervalRef = useRef();

  // Initialize timers for ongoing orders
  useEffect(() => {
    if (!orders) return;
    const newTimers = {};
    orders.forEach((order) => {
      if (order.status === "processing") {
        // Calculate remaining seconds
        const created = new Date(order.createdAt).getTime();

        const now = Date.now();
        // const deliveryMnt = parseInt(
        //   order.deliveryTime.match(/\d+/)?.[0] || "0"
        // );

        const deliveryMnt = order.deliveryTime
          ? parseInt(order.deliveryTime.match(/\d+/)?.[0] || "0")
          : 0;

        const deliveryMs = deliveryMnt * 60 * 1000;

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

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line
  }, []);

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
                {order.orderType === "dineIn" && (
                  <div className="order-card-table-id">{order.tableName}</div>
                )}
                <div className="order-card-time">
                  {order.createdAt
                    ? new Date(order.createdAt)
                        .toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                        .toUpperCase()
                    : ""}
                </div>
                {/* Show delivery time for ongoing orders */}
              </div>
              <div>
                <div className="order-card-badge">
                  <div className="order-type-badge">
                    {order.orderType === "dineIn"
                      ? "Dine In"
                      : order.orderType === "takeAway"
                      ? "Take Away"
                      : order.orderType === "done"
                      ? "Done"
                      : order.orderType}
                  </div>
                  <h5>
                    {order.orderType === "dineIn" &&
                    order.status === "processing"
                      ? `Ongoing ${formatTime(
                          timers[order._id] ?? order.deliveryTime * 60
                        )} Mins`
                      : order.status === "served"
                      ? "Served"
                      : order.orderType === "takeAway"
                      ? order.takeawayStatus === "picked up"
                        ? "Picked Up"
                        : "Not Picked Up"
                      : order.orderType === "done"
                      ? "Done"
                      : ""}
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
            {order.orderType === "takeAway" ? (
              <select
                className="order-card-btn"
                value={order.takeawayStatus}
                onChange={async (e) => {
                  await updateTakeawayStatus(order._id, e.target.value);
                  getOrders();
                }}
              >
                <option value="not picked up">Not Picked Up</option>
                <option value="picked up">Picked Up</option>
              </select>
            ) : (
              <button className="order-card-btn">
                {order.orderType === "done" ? (
                  <>
                    Order Done{" "}
                    <FaCheckCircle style={{ paddingTop: 5, fontSize: 20 }} />
                  </>
                ) : order.orderType === "dineIn" ? (
                  order.status === "processing" ? (
                    <>
                      Processing{" "}
                      <FaHourglassHalf
                        style={{ paddingTop: 5, fontSize: 20 }}
                      />
                    </>
                  ) : order.status === "served" ? (
                    <>
                      Served{" "}
                      <FaCheckCircle style={{ paddingTop: 5, fontSize: 20 }} />
                    </>
                  ) : (
                    order.status
                  )
                ) : (
                  order.status
                )}
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default OrdersList;

//  i have done the processing and served status but i need to add the done status
