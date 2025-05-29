import { useState } from "react";
import "../../styles/components/searchbar/SearchBar.css";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa";

const sectionOptions = [
  { key: "All", label: "All" },
  { key: "analytics", label: "Analytics" },
  { key: "orderSummary", label: "Order Summary" },
  { key: "revenue", label: "Revenue" },
  { key: "chefOrders", label: "Chef Orders" },
  { key: "tables", label: "Tables" },
];

const DashboardSearchBar = ({ filters, onFilterChange, placeholder }) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleSelect = (key) => {
    let newFilters = {};
    if (key === "All") {
      sectionOptions.forEach((option) => {
        if (option.key !== "All") newFilters[option.key] = true;
      });
    } else {
      sectionOptions.forEach((option) => {
        if (option.key !== "All") newFilters[option.key] = option.key === key;
      });
    }
    onFilterChange(newFilters);
    setShowFilters(false);
  };

  // Determine what to show as the button label
  const allSelected = Object.values(filters).every(Boolean);
  const selectedKey = Object.keys(filters).find((key) => filters[key]);
  let buttonLabel = placeholder || "Select Section";
  if (allSelected) buttonLabel = placeholder;
  else if (selectedKey) {
    const found = sectionOptions.find((opt) => opt.key === selectedKey);
    if (found) buttonLabel = found.label;
  }

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
          {sectionOptions.map((option) => (
            <div
              key={option.key}
              className={`filter-dropdown-item${
                (allSelected && option.key === "All") ||
                (filters[option.key] && option.key !== "All")
                  ? " selected"
                  : ""
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

export default DashboardSearchBar;
