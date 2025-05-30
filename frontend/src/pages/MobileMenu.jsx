import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiPlus, FiMinus } from "react-icons/fi";
import { GiFullPizza, GiFrenchFries, GiFruitBowl } from "react-icons/gi";
import { FaHamburger } from "react-icons/fa";
import { MdLocalDrink } from "react-icons/md";
import "../styles/pages/MobileMenu.css";
import { useApi } from "../context/ApiContext";

const categories = [
  { key: "burger", label: "Burger", icon: <FaHamburger size={32} /> },
  { key: "pizza", label: "Pizza", icon: <GiFullPizza size={32} /> },
  { key: "drink", label: "Drink", icon: <MdLocalDrink size={32} /> },
  { key: "fries", label: "French ", icon: <GiFrenchFries size={32} /> },
  { key: "veggies", label: "Veggies", icon: <GiFruitBowl size={32} /> },
];

const MobileMenu = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("pizza");
  const [search, setSearch] = useState("");

  // Use context for menu items
  const { menuItems, menuLoading, menuError, getMenuItems } = useApi();

  useEffect(() => {
    getMenuItems();
    // eslint-disable-next-line
  }, []);

  const filteredItems = (menuItems || []).filter(
    (item) =>
      item.category === activeCategory &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (item) => {
    const existingItem = cart.find((i) => i._id === item._id);
    if (existingItem) {
      setCart(
        cart.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const decreaseQuantity = (itemId) => {
    const existingItem = cart.find((item) => item._id === itemId);
    if (existingItem.quantity === 1) {
      setCart(cart.filter((item) => item._id !== itemId));
    } else {
      setCart(
        cart.map((item) =>
          item._id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  const proceedToCheckout = () => {
    // Save cart to localStorage or context before navigating
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/mobile-checkout");
  };

  return (
    <div className="mobile-menu">
      {/* Header */}
      <div className="mobile-menu-header">
        <div className="welcome-text">
          <h2>Good evening</h2>
          <p>Place you order here</p>
        </div>

        <div className="m-search-container">
          <FiSearch className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Category Navigation */}
      <div className="category-nav">
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={`category-btn${
              activeCategory === cat.key ? " active" : ""
            }`}
            onClick={() => setActiveCategory(cat.key)}
          >
            <span className="category-icon">{cat.icon}</span>
            <span className="category-label">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Category Title */}
      <h2 className="category-title">
        {categories.find((c) => c.key === activeCategory)?.label || ""}
      </h2>

      {/* Menu Items Grid */}
      {menuLoading ? (
        <div>Loading menu items...</div>
      ) : menuError ? (
        <div className="error">{menuError}</div>
      ) : (
        <div className="menu-items-grid">
          {filteredItems.map((item) => {
            const cartItem = cart.find((i) => i._id === item._id);
            return (
              <div className="menu-item-card" key={item._id}>
                <div className="menu-item-img-real">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="menu-item-info-row">
                  <div>
                    <div className="menu-item-name">{item.name}</div>
                    <div className="menu-item-price">₹ {item.price}</div>
                  </div>
                  {cartItem ? (
                    <div className="menu-item-qty-group">
                      <button
                        className="qty-btn"
                        onClick={() => decreaseQuantity(item._id)}
                      >
                        -
                      </button>
                      <span className="qty-value">{cartItem.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => addToCart(item)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="menu-item-add-btn"
                      onClick={() => addToCart(item)}
                    >
                      <FiPlus size={22} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Next Button */}
      <div className="next-btn-row">
        <button
          className="next-btn"
          onClick={proceedToCheckout}
          disabled={cart.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
