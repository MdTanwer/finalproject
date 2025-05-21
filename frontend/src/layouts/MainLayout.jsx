import { Outlet } from "react-router-dom";
import Sidebar from "../components/navigation/Sidebar";
import Header from "../components/navigation/Header";
import "../styles/layouts/MainLayout.css";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header />
      <div className="content-area">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
