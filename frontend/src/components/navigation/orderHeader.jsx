// import { useState } from "react";
import "../../styles/components/navigation/Header.css";
import DashboardSearchBar from "../searchBar/DashboardSearchBar";
import OrderSearchBar from "../searchBar/OrderSearchBar";

const OrderHeader = ({ statusFilter, onStatusFilterChange }) => {
  return (
    <header className="main-header">
      <div className="user-profile">
        <div className="avatar"></div>
      </div>

      <div className="header-right">
        <div className="search-container">
          <OrderSearchBar
            statusFilter={statusFilter}
            onStatusFilterChange={onStatusFilterChange}
          />
        </div>
      </div>
    </header>
  );
};

export default OrderHeader;
