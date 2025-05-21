import { useState } from "react";
import "../../styles/components/common/SearchBar.css";
import { FaAngleDown } from "react-icons/fa6";
const SearchBar = ({ value, onChange, placeholder }) => {
  const [localValue, setLocalValue] = useState(value || "");

  const handleChange = (e) => {
    setLocalValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          value={localValue}
          onChange={handleChange}
          placeholder={placeholder || "Search..."}
          className="search-input"
        />
      </div>
      <button className="filter-button">
        <FaAngleDown />
      </button>
    </div>
  );
};

export default SearchBar;
