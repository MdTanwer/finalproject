import { useState } from "react";
import "../../styles/components/searchbar/SearchBar.css";

const DashboardSearchBar = () => {
  const [search, setSearch] = useState("");

  // Add dashboard-specific search/filter logic here

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search dashboard..."
          className="search-input"
        />
      </div>
      <button className="filter-button">
        <FaAngleDown />
      </button>
    </div>
  );
};

export default DashboardSearchBar;
