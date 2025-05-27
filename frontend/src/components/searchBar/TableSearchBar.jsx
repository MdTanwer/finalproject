import { useState } from "react";
import "../../styles/components/common/SearchBar.css";

const TableSearchBar = () => {
  const [search, setSearch] = useState("");

  // Add table-specific search/filter logic here

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tables..."
          className="search-input"
        />
      </div>
      <button className="filter-button">🔍</button>
    </div>
  );
};

export default TableSearchBar;
