import { useState } from "react";
import "../../styles/components/searchbar/SearchBar.css";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa";

const statusOptions = [
  { key: "all", label: "All" },
  { key: "processing", label: "Processing" },
  { key: "served", label: "Served" },
  { key: "picked up", label: "Picked Up" },
  { key: "not picked up", label: "Not Picked Up" },
  { key: "done", label: "Done" },
];

const OrderSearchBar = ({ statusFilter, onStatusFilterChange }) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleSelect = (key) => {
    onStatusFilterChange(key);
    setShowFilters(false);
  };

  const buttonLabel =
    statusOptions.find((option) => option.key === statusFilter)?.label || "All";

  return (
    <div className="filter-dropdown-container">
      <button
        className="filter-button"
        type="button"
        onClick={() => setShowFilters((prev) => !prev)}
      >
        {buttonLabel}
        {showFilters ? (
          <FaAngleDown style={{ marginLeft: 8 }} />
        ) : (
          <FaAngleUp style={{ marginLeft: 8 }} />
        )}
      </button>
      {showFilters && (
        <div className="filter-dropdown-menu single-select">
          {statusOptions.map((option) => (
            <div
              key={option.key}
              className={`filter-dropdown-item${
                statusFilter === option.key ? " selected" : ""
              }`}
              onClick={() => handleSelect(option.key)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderSearchBar;
