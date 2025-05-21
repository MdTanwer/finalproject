import "../../styles/components/orders/OrderDetails.css";

const OrderDetails = ({ orderId, onClose }) => {
  // Sample order data
  const order = {
    id: orderId,
    customer: "John Doe",
    phone: "+91 98765 43210",
    type: "dineIn",
    status: "processing",
    tableId: "Table-05",
    timestamp: "9:37 AM",
    duration: "4 min",
    instructions: "Extra spicy, no onions",
    items: [
      { id: 1, name: "Butter Chicken", quantity: 1, price: 350 },
      { id: 2, name: "Garlic Naan", quantity: 2, price: 60 },
      { id: 3, name: "Mango Lassi", quantity: 1, price: 120 },
    ],
  };

  const totalAmount = order.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="order-details">
      <div className="details-header">
        <h2>Order #{order.id}</h2>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="details-section">
        <h3>Customer Information</h3>
        <div className="info-row">
          <span className="info-label">Name:</span>
          <span className="info-value">{order.customer}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Phone:</span>
          <span className="info-value">{order.phone}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Type:</span>
          <span className="info-value">{order.type}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Table:</span>
          <span className="info-value">{order.tableId}</span>
        </div>
      </div>

      <div className="details-section">
        <h3>Order Items</h3>
        <div className="order-items">
          {order.items.map((item) => (
            <div className="item-row" key={item.id}>
              <div className="item-details">
                <span className="item-name">{item.name}</span>
                <span className="item-quantity">× {item.quantity}</span>
              </div>
              <span className="item-price">₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="details-section">
        <h3>Order Total</h3>
        <div className="total-row">
          <span>Subtotal</span>
          <span>₹{totalAmount}</span>
        </div>
        <div className="total-row">
          <span>Tax (5%)</span>
          <span>₹{Math.round(totalAmount * 0.05)}</span>
        </div>
        <div className="total-row grand-total">
          <span>Grand Total</span>
          <span>₹{totalAmount + Math.round(totalAmount * 0.05)}</span>
        </div>
      </div>

      {order.instructions && (
        <div className="details-section">
          <h3>Special Instructions</h3>
          <p className="instructions">{order.instructions}</p>
        </div>
      )}

      <div className="details-actions">
        <button className="status-btn">
          Mark as {order.status === "processing" ? "Done" : "Served"}
        </button>
        <button className="print-btn">Print Receipt</button>
      </div>
    </div>
  );
};

export default OrderDetails;
