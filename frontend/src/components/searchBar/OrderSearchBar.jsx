import { useState } from "react";
import "../../styles/components/common/SearchBar.css";

const OrderSearchBar = () => {
  const [search, setSearch] = useState("");

  // Add order-specific search/filter logic here

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search orders..."
          className="search-input"
        />
      </div>
      <button className="filter-button">🔍</button>
    </div>
  );
};

export default OrderSearchBar;
