import "../../styles/components/navigation/Header.css";
import TableSearchBar from "../../components/searchBar/TableSearchBar";
const TableHeader = ({ value, onChange }) => {
  return (
    <header className="main-header">
      <div className="user-profile">
        <div className="avatar"></div>
      </div>

      <div className="header-right">
        <div className="search-container">
          <TableSearchBar
            value={value}
            onChange={onChange}
            placeholder="Filter..."
          />
        </div>
      </div>
    </header>
  );
};

export default TableHeader;
