import "../../styles/components/dashboard/TablesCalendar.css";

const TablesCalendar = () => {
  // 35 tables, numbered 1-35 for a 7x5 grid, filled horizontally
  const rows = 5;
  const cols = 7;
  const tableNumbers = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      tableNumbers.push(row * cols + col + 1);
    }
  }

  // Reserved tables (green) - example data, adjust as needed
  const reservedTables = [4, 5, 7, 9, 12, 17, 21, 22, 23, 29, 30];

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

      <div className="tables-grid1">
        {tableNumbers.map((num) => (
          <div
            key={num}
            className={`table-cell ${
              reservedTables.includes(num) ? "reserved" : "available"
            }`}
          >
            <div className="table-label">Table</div>
            <div className="table-number">{String(num).padStart(2, "0")}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TablesCalendar;
