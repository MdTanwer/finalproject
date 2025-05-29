import "../../styles/components/dashboard/TablesCalendar.css";
import { useEffect, useState } from "react";
import { fetchTables } from "../../context/tablesApi";

const TablesCalendar = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getTables = async () => {
      setLoading(true);
      try {
        const data = await fetchTables();
        setTables(data);
        setError("");
      } catch {
        setError("Failed to fetch tables");
      }
      setLoading(false);
    };
    getTables();
  }, []);

  // Only 'reserved' and 'available' statuses
  const getStatusClass = (status) => {
    return status === "reserved" ? "reserved" : "available";
  };

  return (
    <div className="tables-calendar">
      <div className="chart-header">
        <h3 className="chart-title">Tables</h3>
        <div className="tables-legend">
          <div className="legend-item">
            <span className="legend-color reserved"></span>
            <span className="legend-label">Reserved</span>
          </div>
          <div className="legend-item">
            <span className="legend-color available"></span>
            <span className="legend-label">Available</span>
          </div>
        </div>
      </div>
      <div className="chart-divider" />

      {loading ? (
        <div>Loading tables...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="tables-grid1">
          {tables.map((table, idx) => (
            <div
              key={table._id || idx}
              className={`table-cell ${getStatusClass(table.status)}`}
            >
              <div className="table-label">Table</div>
              <div className="table-number">
                {(table.name?.replace(/\D/g, "") || "0").padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TablesCalendar;
