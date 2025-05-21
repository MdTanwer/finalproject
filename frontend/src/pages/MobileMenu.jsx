import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiPlus, FiMinus } from "react-icons/fi";
import { GiFullPizza, GiFrenchFries, GiFruitBowl } from "react-icons/gi";
import { FaHamburger } from "react-icons/fa";
import { MdLocalDrink } from "react-icons/md";
import "../styles/pages/MobileMenu.css";

const categories = [
  { key: "burger", label: "Burger", icon: <FaHamburger size={32} /> },
  { key: "pizza", label: "Pizza", icon: <GiFullPizza size={32} /> },
  { key: "drink", label: "Drink", icon: <MdLocalDrink size={32} /> },
  { key: "fries", label: "French ", icon: <GiFrenchFries size={32} /> },
  { key: "veggies", label: "Veggies", icon: <GiFruitBowl size={32} /> },
];

const menuItems = [
  // Pizza
  {
    id: 1,
    category: "pizza",
    name: "Capricciosa",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    category: "pizza",
    name: "Sicilian",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1548365328-8b849e6c7b8b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    category: "pizza",
    name: "Marinara",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    category: "pizza",
    name: "Pepperoni",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 5,
    category: "pizza",
    name: "Margherita",
    price: 170,
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 6,
    category: "pizza",
    name: "BBQ Chicken",
    price: 300,
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 7,
    category: "pizza",
    name: "Veggie Supreme",
    price: 220,
    image:
      "https://images.unsplash.com/photo-1523987355523-c7b5b0723c6a?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 8,
    category: "pizza",
    name: "Hawaiian",
    price: 210,
    image:
      "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=400&q=80",
  },
  // Burger
  {
    id: 9,
    category: "burger",
    name: "Classic Burger",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 10,
    category: "burger",
    name: "Cheese Burger",
    price: 140,
    image:
      "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=400&q=80",
  },
  // Drink
  {
    id: 11,
    category: "drink",
    name: "Coke",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 12,
    category: "drink",
    name: "Lemonade",
    price: 50,
    image:
      "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80",
  },
  // Fries
  {
    id: 13,
    category: "fries",
    name: "French ",
    price: 80,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 14,
    category: "fries",
    name: "Curly Fries",
    price: 90,
    image:
      "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=400&q=80",
  },
  // Veggies
  {
    id: 15,
    category: "veggies",
    name: "Greek Salad",
    price: 110,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 16,
    category: "veggies",
    name: "Veggie Bowl",
    price: 130,
    image:
      "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80",
  },
];

const MobileMenu = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("pizza");

  const filteredItems = menuItems.filter(
    (item) => item.category === activeCategory
  );

  const addToCart = (item) => {
    const existingItem = cart.find((i) => i.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const decreaseQuantity = (pizzaId) => {
    const existingItem = cart.find((item) => item.id === pizzaId);

    if (existingItem.quantity === 1) {
      setCart(cart.filter((item) => item.id !== pizzaId));
    } else {
      setCart(
        cart.map((item) =>
          item.id === pizzaId ? { ...item, quantity: item.quantity - 1 } : item
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
          <input type="text" placeholder="Search" className="search-input" />
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
      <div className="menu-items-grid">
        {filteredItems.map((item) => {
          const cartItem = cart.find((i) => i.id === item.id);
          return (
            <div className="menu-item-card" key={item.id}>
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
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>
                    <span className="qty-value">{cartItem.quantity}</span>
                    <button className="qty-btn" onClick={() => addToCart(item)}>
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
