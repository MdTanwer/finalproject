import "../../styles/components/dashboard/MetricsOverview.css";
import MetricCard from "./MetricCard";
import { LuSalad } from "react-icons/lu";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { LuClipboardList } from "react-icons/lu";
import { LuUsersRound } from "react-icons/lu";

const MetricsOverview = () => {
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
      value: "12K",
      icon: <FaIndianRupeeSign />,
    },
    {
      id: "orders",
      title: "TOTAL ORDERS",
      value: "20",
      icon: <LuClipboardList />,
    },
    {
      id: "clients",
      title: "TOTAL CLIENTS",
      value: "65",
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
