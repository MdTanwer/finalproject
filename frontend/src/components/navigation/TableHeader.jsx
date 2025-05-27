import { useState } from "react";
import "../../styles/components/navigation/Header.css";
import TableSearchBar from "../common/TableSearchBar";

const TableHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Search logic will be implemented later
  };

  return (
    <header className="main-header">
      <div className="user-profile">
        <div className="avatar"></div>
      </div>

      <div className="header-right">
        <div className="search-container">
          <TableSearchBar
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Filter..."
          />
        </div>
      </div>
    </header>
  );
};

export default TableHeader;
