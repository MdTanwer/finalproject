import React, { createContext, useContext, useState } from "react";
import {
  fetchMenuItems,
  createOrder as createOrderApi,
  fetchOrders,
  fetchOrderStats,
  fetchClientCount,
  fetchChefs,
  addChef as addChefApi,
  updateOrderStatus as updateOrderStatusApi,
  updateTakeawayStatus as updateTakeawayStatusApi,
} from "./menuApi";

// Create the context
const ApiContext = createContext();

// Custom hook for easy access
export const useApi = () => useContext(ApiContext);

// Provider component
export const ApiProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // Menu items state
  const [menuItems, setMenuItems] = useState([]);
  const [menuLoading, setMenuLoading] = useState(false);
  const [menuError, setMenuError] = useState(null);

  // Order state
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Orders summary state
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState(null);

  // Order stats state
  const [orderStats, setOrderStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [orderStatsLoading, setOrderStatsLoading] = useState(false);
  const [orderStatsError, setOrderStatsError] = useState(null);

  // Client count state
  const [clientCount, setClientCount] = useState(0);
  const [clientCountLoading, setClientCountLoading] = useState(false);
  const [clientCountError, setClientCountError] = useState(null);

  // Chef state
  const [chefs, setChefs] = useState([]);
  const [chefsLoading, setChefsLoading] = useState(false);
  const [chefsError, setChefsError] = useState(null);

  // Generic API call function
  const apiRequest = async (url, options = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch menu items
  const getMenuItems = async () => {
    setMenuLoading(true);
    setMenuError(null);
    try {
      const items = await fetchMenuItems();
      setMenuItems(items);
    } catch (err) {
      setMenuError(err.message);
    } finally {
      setMenuLoading(false);
    }
  };

  // Create order
  const createOrder = async (orderData) => {
    setOrderLoading(true);
    setOrderError(null);
    setOrderSuccess(false);
    try {
      const result = await createOrderApi(orderData);
      setOrderSuccess(true);
      return result;
    } catch (err) {
      setOrderError(err.message);
      throw err;
    } finally {
      setOrderLoading(false);
    }
  };

  // Fetch all orders
  const getOrders = async () => {
    setOrdersLoading(true);
    setOrdersError(null);
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (err) {
      setOrdersError(err.message);
    } finally {
      setOrdersLoading(false);
    }
  };

  // Fetch order stats
  const getOrderStats = async () => {
    setOrderStatsLoading(true);
    setOrderStatsError(null);
    try {
      const stats = await fetchOrderStats();
      setOrderStats(stats);
    } catch (err) {
      setOrderStatsError(err.message);
    } finally {
      setOrderStatsLoading(false);
    }
  };

  // Fetch client count
  const getClientCount = async () => {
    setClientCountLoading(true);
    setClientCountError(null);
    try {
      const count = await fetchClientCount();
      setClientCount(count);
    } catch (err) {
      setClientCountError(err.message);
    } finally {
      setClientCountLoading(false);
    }
  };

  // Fetch chefs
  const getChefs = async () => {
    setChefsLoading(true);
    setChefsError(null);
    try {
      const data = await fetchChefs();
      setChefs(data);
    } catch (err) {
      setChefsError(err.message);
    } finally {
      setChefsLoading(false);
    }
  };

  // Add chef
  const addChef = async (chefData) => {
    setChefsLoading(true);
    setChefsError(null);
    try {
      const newChef = await addChefApi(chefData);
      setChefs((prev) => [...prev, newChef]);
      return newChef;
    } catch (err) {
      setChefsError(err.message);
      throw err;
    } finally {
      setChefsLoading(false);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, status) => {
    return updateOrderStatusApi(orderId, status);
  };

  // Update takeaway status
  const updateTakeawayStatus = async (orderId, takeawayStatus) => {
    return updateTakeawayStatusApi(orderId, takeawayStatus);
  };

  return (
    <ApiContext.Provider
      value={{
        loading,
        error,
        data,
        apiRequest,
        menuItems,
        menuLoading,
        menuError,
        getMenuItems,
        createOrder,
        orderLoading,
        orderError,
        orderSuccess,
        orders,
        ordersLoading,
        ordersError,
        getOrders,
        orderStats,
        orderStatsLoading,
        orderStatsError,
        getOrderStats,
        clientCount,
        clientCountLoading,
        clientCountError,
        getClientCount,
        chefs,
        chefsLoading,
        chefsError,
        getChefs,
        addChef,
        updateOrderStatus,
        updateTakeawayStatus,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
