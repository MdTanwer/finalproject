import "../../styles/components/searchbar/SearchBar.css";

const TableSearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={"Search tables..."}
          className="search-input"
        />
      </div>
      {/* <button className="filter-button">🔍</button> */}
    </div>
  );
};

export default TableSearchBar;
