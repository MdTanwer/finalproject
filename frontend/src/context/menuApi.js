const API_URL = "https://finalproject-8lp2.onrender.com/api/menu-items";
const ORDER_URL = "https://finalproject-8lp2.onrender.com/api/orders";
const CHEF_URL = "https://finalproject-8lp2.onrender.com/api/chefs";

export const fetchMenuItems = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch menu items");
  return res.json();
};

export const createOrder = async (orderData) => {
  const res = await fetch(ORDER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) throw new Error("Failed to create order");
  return res.json();
};

export const fetchOrders = async () => {
  const res = await fetch(ORDER_URL);
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
};

export const fetchOrderStats = async () => {
  const orders = await fetchOrders();
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.total || 0),
    0
  );
  return { totalOrders, totalRevenue };
};

export const fetchClientCount = async () => {
  const orders = await fetchOrders();
  const uniquePhones = new Set(
    orders.map((order) => order.user?.phone).filter(Boolean)
  );
  return uniquePhones.size;
};

export const fetchChefs = async () => {
  const res = await fetch(CHEF_URL);
  if (!res.ok) throw new Error("Failed to fetch chefs");
  return res.json();
};

export const addChef = async (chefData) => {
  const res = await fetch(CHEF_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(chefData),
  });
  if (!res.ok) throw new Error("Failed to add chef");
  return res.json();
};

export const updateOrderStatus = async (orderId, status) => {
  const res = await fetch(
    `http://localhost:5000/api/orders/${orderId}/status`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }
  );
  if (!res.ok) throw new Error("Failed to update order status");
  return res.json();
};

export const fetchTables = async () => {
  const res = await fetch("http://localhost:5000/api/tables");
  if (!res.ok) throw new Error("Failed to fetch tables");
  return res.json();
};

export const updateTableStatus = async (tableId) => {
  const res = await fetch(`http://localhost:5000/api/tables/${tableId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to update table status");
  return res.json();
};

export const updateTakeawayStatus = async (orderId, takeawayStatus) => {
  const res = await fetch(
    `http://localhost:5000/api/orders/${orderId}/takeaway-status`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ takeawayStatus }),
    }
  );
  if (!res.ok) throw new Error("Failed to update takeaway status");
  return res.json();
};
