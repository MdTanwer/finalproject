import "../styles/pages/TableManagement.css";
import TablesDashboard from "../components/tables/TablesDashboard";
import TableHeader from "../components/navigation/TableHeader";
import Sidebar from "../components/navigation/Sidebar";

const TableManagement = () => {
  return (
    <div className="main-layout">
      <TableHeader />
      <div className="content-area">
        <Sidebar />
        <main className="main-content">
          <div className="table-management-page">
            <TablesDashboard />
          </div>
        </main>
      </div>
    </div>
  );
};

export default TableManagement;
