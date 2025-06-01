/**
 * Main Application Component
 * Handles the routing configuration for the restaurant management system
 *
 * The application is divided into two types of routes:
 * 1. Admin/Management Routes - With MainLayout (header and sidebar)
 * 2. Mobile-Specific Routes - Standalone without MainLayout
 */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
// Main administrative pages
import Dashboard from "./pages/Dashboard";
import TableManagement from "./pages/TableManagement";
import OrderManagement from "./pages/OrderManagement";
// Mobile-specific pages
import MobileMenu from "./pages/MobileMenu";
import MobileCheckout from "./pages/MobileCheckout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin/Management Routes - These use MainLayout */}
        <Route path="/" element={<Dashboard />} />
        <Route path="tables" element={<TableManagement />} />
        <Route path="orders" element={<OrderManagement />} />

        {/* Mobile-Specific Routes - Standalone without MainLayout */}
        {/* These routes are optimized for mobile devices and provide a streamlined experience */}
        <Route path="/order-menu" element={<MobileMenu />} />
        <Route path="/mobile-checkout" element={<MobileCheckout />} />
      </Routes>
    </Router>
  );
}

export default App;
