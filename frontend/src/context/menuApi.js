const API_URL = "http://localhost:5000/api/menu-items";
const ORDER_URL = "http://localhost:5000/api/orders";
const CHEF_URL = "http://localhost:5000/api/chefs";

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
