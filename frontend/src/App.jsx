import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import TableManagement from "./pages/TableManagement";
import OrderManagement from "./pages/OrderManagement";
import MobileMenu from "./pages/MobileMenu";
import MobileCheckout from "./pages/MobileCheckout";
import CookingInstructions from "./pages/CookingInstructions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="tables" element={<TableManagement />} />
          <Route path="orders" element={<OrderManagement />} />
        </Route>
        {/* Standalone routes without MainLayout (no header/sidebar) */}
        <Route path="/order-menu" element={<MobileMenu />} />
        <Route path="/mobile-checkout" element={<MobileCheckout />} />
        <Route path="/cooking-instructions" element={<CookingInstructions />} />
      </Routes>
    </Router>
  );
}

export default App;
