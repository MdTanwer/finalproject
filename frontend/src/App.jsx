import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import TableManagement from "./pages/TableManagement";
import OrderManagement from "./pages/OrderManagement";
import MobileMenu from "./pages/MobileMenu";
import MobileCheckout from "./pages/MobileCheckout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="tables" element={<TableManagement />} />
        <Route path="orders" element={<OrderManagement />} />

        {/* Standalone routes without MainLayout (no header/sidebar) */}
        <Route path="/order-menu" element={<MobileMenu />} />
        <Route path="/mobile-checkout" element={<MobileCheckout />} />
      </Routes>
    </Router>
  );
}

export default App;
