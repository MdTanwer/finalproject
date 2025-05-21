import "../../styles/components/orders/OrderFilters.css";

const OrderFilters = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { id: "all", label: "All Orders" },
    { id: "dineIn", label: "Dine In" },
    { id: "takeAway", label: "Take Away" },
    { id: "processing", label: "Processing" },
    { id: "done", label: "Done" },
    { id: "served", label: "Served" },
    { id: "notPickedUp", label: "Not Picked Up" },
  ];

  return (
    <div className="order-filters">
      {filters.map((filter) => (
        <button
          key={filter.id}
          className={`filter-btn ${
            currentFilter === filter.id ? "active" : ""
          }`}
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default OrderFilters;
