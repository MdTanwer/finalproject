import "../../styles/components/orders/OrdersList.css";
import { FaUtensils } from "react-icons/fa";

const OrdersList = () => {
  // Sample data
  const orders = [
    {
      id: 1,
      type: "Dine In",
      result: "Ongoing: 4 min",
      status: "processing",
      tableId: "#108",
      badge: "Order in Line",
      itemCount: 3,
      items: [" 1 x Double Cheeseburger", " 1 x Apple Pie ", "1 x Coca Cola L"],
      btn: "Processing 2",
    },
    {
      id: 2,
      type: "Served",
      result: "Served",
      status: "done",
      tableId: "#108",
      badge: "Dine Served",
      itemCount: 3,
      items: [" 1 x Double Cheeseburger", " 1 x Apple Pie ", "1 x Coca Cola L"],
      btn: "Order Done",
    },
    {
      id: 3,
      type: "Takeaway",
      status: "takeaway",
      result: " Not Picked Up",
      tableId: "#108",
      badge: "Take Away Not Picked Up",
      itemCount: 3,
      items: [" 1 x Double Cheeseburger", " 1 x Apple Pie ", "1 x Coca Cola L"],
      btn: "Order Done",
    },
    {
      id: 4,
      type: "Dine In",
      result: "Ongoing: 4 min",
      status: "processing",
      tableId: "#108",
      badge: "Order in Line",
      itemCount: 3,
      items: [" 1 x Double Cheeseburger", " 1 x Apple Pie ", "1 x Coca Cola L"],
      btn: "Processing 2",
    },
    {
      id: 5,
      type: "Dine In",
      result: "Ongoing: 4 min",
      status: "processing",
      tableId: "#108",
      badge: "Order in Line",
      itemCount: 3,
      items: [" 1 x Double Cheeseburger", " 1 x Apple Pie ", "1 x Coca Cola L"],
      btn: "Processing 2",
    },
    {
      id: 6,
      type: "Takeaway",
      status: "takeaway",
      result: " Not Picked Up",
      tableId: "#108",
      badge: "Take Away Not Picked Up",
      itemCount: 3,
      items: [" 1 x Double Cheeseburger", " 1 x Apple Pie ", "1 x Coca Cola L"],
      btn: "Order Done",
    },
    {
      id: 7,
      type: "Served",
      result: "Served",

      status: "done",
      tableId: "#108",
      badge: "Dine Served",
      itemCount: 3,
      items: [" 1 x Double Cheeseburger", " 1 x Apple Pie ", "1 x Coca Cola L"],
      btn: "Order Done",
    },
    {
      id: 8,
      type: "Dine In",
      result: "Ongoing: 4 min",
      status: "processing",
      tableId: "#108",
      badge: "Order in Line",
      itemCount: 3,
      items: [" 1 x Double Cheeseburger", " 1 x Apple Pie ", "1 x Coca Cola L"],
      btn: "Processing 2",
    },
  ];

  // Filter orders based on filter type

  return (
    <>
      {orders.map((order) => (
        <div key={order.id} className={`order-card ${order.status}`}>
          <div className="order-card-container ">
            <div className="order-card-header">
              <div>
                {" "}
                <div>
                  {" "}
                  <span className="order-card-icon">
                    <FaUtensils />
                  </span>
                  <span className="order-card-title">{order.tableId}</span>
                </div>
                <div className="order-card-table-id">Table 05</div>
                <div className="order-card-time">09:37 PM</div>
              </div>
              <div>
                {" "}
                <div className="order-card-badge">
                  <h5>{order.type}</h5>
                  <h5>{order.result}</h5>
                </div>
              </div>
            </div>
            <h1 className="item-qnty">Item 3</h1>
          </div>

          <div className="order-card-body">
            {/* <div style={{ fontWeight: 600, marginBottom: 6 }}>
              {order.itemCount} Item
            </div> */}
            <h1 style={{ fontWeight: 600, fontSize: 13 }}>
              1 x Value Set Meals
            </h1>
            <ul className="order-card-items">
              <br />
              {order.items.map((item, idx) => (
                <li key={idx} style={{ fontSize: 13 }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="order-card-footer">
            <button className="order-card-btn">{order.btn}</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default OrdersList;
