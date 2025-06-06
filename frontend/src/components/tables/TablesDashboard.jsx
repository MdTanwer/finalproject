import "../../styles/components/tables/TablesDashboard.css";
import { useState, useEffect, useRef } from "react";
import { FaTrashAlt, FaChair } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { fetchTables, addTable, deleteTable } from "../../context/tablesApi";
import TableHeader from "../navigation/TableHeader";

const TablesDashboard = () => {
  const [tables, setTables] = useState([]);
  const [newTable, setNewTable] = useState({ name: "", chairs: 3 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState("");
  const addBtnRef = useRef(null);

  // Fetch tables from backend
  useEffect(() => {
    handleFetchTables();
  }, []);

  useEffect(() => {
    if (!showAddModal) return;
    function handleClick(e) {
      if (
        addBtnRef.current &&
        !addBtnRef.current.contains(e.target) &&
        !document.querySelector(".add-table-modal")?.contains(e.target)
      ) {
        setShowAddModal(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showAddModal]);

  const handleFetchTables = async () => {
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

  const handleDelete = async (id) => {
    try {
      await deleteTable(id);
      setTables(tables.filter((t) => t._id !== id));
    } catch {
      setError("Failed to delete table");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const data = await addTable({
        name: newTable.name,
        chairs: newTable.chairs,
      });
      setTables([...tables, data]);
      setNewTable({ name: "", chairs: 3 });
      setError("");
      setShowAddModal(false);
    } catch (err) {
      setError(err.message || "Failed to add table");
    }
  };

  // Filter tables by search
  const filteredTables = tables.filter((table) => {
    const tableNumber = table.name.replace(/[^0-9]/g, "");
    return tableNumber.includes(search.trim());
  });

  return (
    <div className="tables-dashboard">
      <TableHeader value={search} onChange={setSearch} />
      <h1>Tables</h1>
      {loading ? (
        <div>Loading tables...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="tables-grid">
          {filteredTables.map((table) => (
            <div key={table._id} className={`table-card `}>
              <button
                className="delete-btn"
                onClick={() => handleDelete(table._id)}
                title="Delete table"
              >
                <FaTrashAlt />
              </button>
              <div className="table-content">
                <div className="dashbrd-table-label">Table</div>
                <div className="dashboard-table-number">
                  {table.name.replace(/[^0-9]/g, "") || table.name}
                </div>
              </div>
              <div className="table-chairs">
                <FaChair className="chair-icon" />{" "}
                {String(table.chairs).padStart(2, "0")}
              </div>
            </div>
          ))}
          {/* Add Button (dashed, plus only) */}
          <div
            className="table-card add-card add-btn-only"
            ref={addBtnRef}
            onClick={() => setShowAddModal(true)}
            style={{ position: "relative" }}
          >
            <IoMdAdd size={40} />
            {/* <div className="add-btn">+</div> */}
            {showAddModal && (
              <div className="add-table-modal popover">
                <form className="add-form" onSubmit={handleAdd}>
                  <div className="add-form-label">Table name (optional)</div>
                  <div className="add-form-modal-number">
                    {String(tables.length + 1).padStart(2, "0")}
                  </div>
                  <div className="add-form-label">Chair</div>
                  <select
                    value={String(newTable.chairs).padStart(2, "0")}
                    onChange={(e) =>
                      setNewTable({
                        ...newTable,
                        chairs: Number(e.target.value),
                      })
                    }
                    className="add-form-input"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option
                        key={i + 1}
                        value={String(i + 1).padStart(2, "0")}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  <button type="submit" className="add-form-btn">
                    Create
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TablesDashboard;
