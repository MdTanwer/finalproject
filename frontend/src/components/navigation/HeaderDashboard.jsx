import { useState } from "react";
import "../../styles/components/navigation/Header.css";
import DashboardSearchBar from "../searchBar/DashboardSearchBar";

const DashboardHeader = () => {
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
          <DashboardSearchBar
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Filter..."
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
