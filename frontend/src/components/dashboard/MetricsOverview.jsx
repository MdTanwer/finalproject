import "../../styles/components/dashboard/MetricsOverview.css";
import MetricCard from "./MetricCard";
import { LuSalad } from "react-icons/lu";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { LuClipboardList } from "react-icons/lu";
import { LuUsersRound } from "react-icons/lu";
import { useApi } from "../../context/ApiContext";
import { useEffect } from "react";

const MetricsOverview = () => {
  const {
    orderStats,
    orderStatsLoading,
    orderStatsError,
    getOrderStats,
    clientCount,
    clientCountLoading,
    clientCountError,
    getClientCount,
  } = useApi();

  useEffect(() => {
    getOrderStats();
    getClientCount();
    // eslint-disable-next-line
  }, []);

  const metrics = [
    {
      id: "staff",
      title: "TOTAL STAFF",
      value: "04",
      icon: <LuSalad />,
    },
    {
      id: "revenue",
      title: "TOTAL REVENUE",
      value: orderStatsLoading
        ? "..."
        : orderStatsError
        ? "ERR"
        : `${orderStats.totalRevenue.toLocaleString()}`,
      icon: <FaIndianRupeeSign />,
    },
    {
      id: "orders",
      title: "TOTAL ORDERS",
      value: orderStatsLoading
        ? "..."
        : orderStatsError
        ? "ERR"
        : orderStats.totalOrders,
      icon: <LuClipboardList />,
    },
    {
      id: "clients",
      title: "TOTAL CLIENTS",
      value: clientCountLoading
        ? "..."
        : clientCountError
        ? "ERR"
        : clientCount,
      icon: <LuUsersRound />,
    },
  ];

  return (
    <div className="metrics-overview">
      {metrics.map((metric) => (
        <MetricCard key={metric.id} {...metric} />
      ))}
    </div>
  );
};

export default MetricsOverview;
