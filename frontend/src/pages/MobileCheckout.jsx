import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiX, FiPlus, FiMinus, FiArrowRight } from "react-icons/fi";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import "../styles/pages/MobileCheckout.css";
import "../styles/pages/CookingInstructions.css";
import "../styles/pages/MobileMenu.css";
import { FiSearch } from "react-icons/fi";
import { useApi } from "../context/ApiContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchTables, updateTableStatus } from "../context/menuApi";

const MobileCheckout = () => {
  const [cart, setCart] = useState([]);
  const [orderType, setOrderType] = useState("dineIn");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);
  const swipeButtonRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [orderLoading, setOrderLoading] = useState(false);

  // Context API for order and menu items
  const { createOrder } = useApi();

  // Sample user details
  const userDetails = {
    name: "Divya Sharma",
    phone: "9106780109",
  };

  // Sample delivery address
  const deliveryAddress = "Flat no. 301, CJB Enclave, Nagar Nagar, Hyderabad";

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    // Check if we have instructions from navigation state (for compatibility)
    if (location.state?.instructions && location.state?.itemId) {
      setSpecialInstructions(location.state.instructions);
    }
  }, [location.state]);

  // Handle swipe gesture for the order button
  useEffect(() => {
    const handleTouchMove = (e) => {
      if (!isDragging || !swipeButtonRef.current) return;
      const buttonRect = swipeButtonRef.current.getBoundingClientRect();
      const buttonWidth = buttonRect.width;
      const touchX = e.touches[0].clientX;
      const startX = buttonRect.left + 48; // Start position (48px is the width of the circle)
      let progress = (touchX - startX) / (buttonWidth - 80); // Calculate progress (0 to 1)
      progress = Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1
      setDragProgress(progress);
      if (progress >= 0.9) {
        // User has swiped far enough to trigger the order
        handlePlaceOrder();
      }
    };
    const handleTouchEnd = () => {
      if (isDragging) {
        setIsDragging(false);
        setDragProgress(0);
      }
    };
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  const increaseQuantity = (itemId) => {
    setCart(
      cart.map((item) =>
        (item._id || item.id) === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (itemId) => {
    const existingItem = cart.find((item) => (item._id || item.id) === itemId);
    if (existingItem.quantity === 1) {
      setCart(cart.filter((item) => (item._id || item.id) !== itemId));
    } else {
      setCart(
        cart.map((item) =>
          (item._id || item.id) === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const removeItem = (itemId) => {
    setCart(cart.filter((item) => (item._id || item.id) !== itemId));
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateDeliveryCharge = () => {
    if (orderType !== "takeAway") return 0;
    if (!cart.length) return 0;

    // Option 1: Take the max delivery charge from cart items
    return Math.max(...cart.map((item) => item.deliveryCharge || 0));
  };

  const calculateTaxes = () => {
    return Math.round(calculateSubtotal() * 0.05);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateDeliveryCharge() + calculateTaxes();
  };

  // Calculate deliveryTime from menuItems context
  const getDeliveryTime = () => {
    if (!cart.length) return "0 mins";
    // Find max deliveryTime from cart items
    const maxTime = Math.max(...cart.map((item) => item.deliveryTime || 0));
    return maxTime ? `${maxTime} mins` : "10 mins";
  };

  // Prepare order data for API
  const getOrderPayload = () => {
    return {
      items: cart.map((item) => ({
        menuItem: item._id || item.id,
        quantity: item.quantity,
      })),
      orderType,
      specialInstructions,
      user: userDetails,
      deliveryAddress: orderType === "takeAway" ? deliveryAddress : undefined,
      deliveryTime: orderType === "dineIn" ? getDeliveryTime() : null,

      deliveryCharge: orderType === "takeAway" ? calculateDeliveryCharge() : 0,
      tax: calculateTaxes(),
      total: calculateTotal(),
    };
  };

  const isOrderPlaced = useRef(false);
  useEffect(() => {
    return () => {
      isOrderPlaced.current = false; // Reset on unmount
    };
  }, []);

  const handlePlaceOrder = async () => {
    if (isOrderPlaced.current || orderLoading) return;
    isOrderPlaced.current = true;
    setOrderLoading(true);
    try {
      let tableName, tableId;
      if (orderType === "dineIn") {
        // Fetch all tables and find the first available one
        const tables = await fetchTables();
        const availableTable = tables.find((t) => t.status === "available");
        if (!availableTable) {
          alert("No available tables");
          throw new Error("No available tables");
        }
        tableName = availableTable.name;
        tableId = availableTable._id || availableTable.id;
      }
      await createOrder({
        ...getOrderPayload(),
        tableName: orderType === "dineIn" ? tableName : undefined,
      });
      if (orderType === "dineIn" && tableId) {
        await updateTableStatus(tableId);
      }
      console.log("Order placed successfully!");
      localStorage.removeItem("cart");
      alert("Order placed successfully!");
      navigate("/order-menu");
    } catch (err) {
      console.log(err.message || "Failed to place order");
    } finally {
      setOrderLoading(false);
    }
  };

  const handleSwipeTouchStart = () => {
    if (orderLoading) return; // Prevent swipe while loading
    setIsDragging(true);
  };

  // Open modal instead of navigating
  const handleInstructionsClick = () => {
    setShowInstructionsModal(true);
  };

  // Modal logic
  const handleModalCancel = () => {
    setShowInstructionsModal(false);
  };
  const handleModalNext = () => {
    setShowInstructionsModal(false);
    // Optionally save to localStorage
    if (cart[0]?.id) {
      localStorage.setItem(`instructions_${cart[0].id}`, specialInstructions);
    }
  };

  return (
    <div className="mobile-checkout">
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

      {/* Cart Items */}
      <div className="checkout-cart-items">
        {cart.length === 0 ? (
          <div>Your cart is empty.</div>
        ) : (
          cart.map((item) => (
            <div className="checkout-cart-item" key={item._id || item.id}>
              <div className="cart-item-image">
                {item.image && (
                  <img className="pizza-img" src={item.image} alt={item.name} />
                )}
              </div>
              <div className="cart-item-details">
                <div className="cart-item-top">
                  <h3>{item.name}</h3>
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item._id || item.id)}
                  >
                    <FiX />
                  </button>
                </div>
                <p className="cart-item-price">₹ {item.price}</p>
                <div className="cart-item-controls">
                  <div className="quantity-selector">
                    <button
                      onClick={() => decreaseQuantity(item._id || item.id)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item._id || item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Special Instructions */}
      <div className="special-instructions">
        <input
          type="text"
          placeholder="Add cooking instructions (optional)"
          value={specialInstructions}
          readOnly
          onClick={handleInstructionsClick}
        />
      </div>

      {/* Modal for Cooking Instructions */}
      {showInstructionsModal && (
        <div className="cooking-instructions-overlay">
          <div className="cooking-instructions-modal-new">
            <button className="modal-close-btn" onClick={handleModalCancel}>
              <FiX size={32} />
            </button>
            <div className="modal-content">
              <h2 className="modal-title">Add Cooking instructions</h2>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder=""
                rows={3}
                className="modal-textarea"
              ></textarea>
              <div className="modal-helper-text">
                The restaurant will try its best to follow your request.
                However, refunds or cancellations in this regard won't be
                possible
              </div>
              <div className="modal-actions">
                <button
                  className="modal-cancel-btn"
                  onClick={handleModalCancel}
                >
                  Cancel
                </button>
                <button className="modal-next-btn" onClick={handleModalNext}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Type Selection */}
      <div className="order-type-selector">
        <button
          className={orderType === "dineIn" ? "active" : ""}
          onClick={() => setOrderType("dineIn")}
        >
          Dine In
        </button>
        <button
          className={orderType === "takeAway" ? "active" : ""}
          onClick={() => setOrderType("takeAway")}
        >
          Take Away
        </button>
      </div>

      {/* Order Summary */}
      <div className="order-summary">
        <div className="summary-row">
          <span>Item Total</span>
          <span>₹{calculateSubtotal().toFixed(2)}</span>
        </div>
        {orderType === "takeAway" && (
          <div className="summary-row">
            <span>Delivery Charge</span>
            <span>₹{calculateDeliveryCharge().toFixed(2)}</span>
          </div>
        )}
        <div className="summary-row">
          <span>Taxes</span>
          <span>₹{calculateTaxes().toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>Grand Total</span>
          <span>₹{calculateTotal().toFixed(2)}</span>
        </div>
      </div>

      {/* User Details */}
      <div className="user-details">
        <h3>Your details</h3>
        <p>
          {userDetails.name}, {userDetails.phone}
        </p>
        {orderType === "takeAway" && (
          <div className="delivery-details">
            <div className="delivery-address">
              <FaMapMarkerAlt className="detail-icon" />
              <p>{deliveryAddress}</p>
            </div>
          </div>
        )}

        {orderType !== "takeAway" && (
          <div className="delivery-time">
            <FaClock className="detail-icon" />
            <p> Estimate time to serve {getDeliveryTime()}</p>
          </div>
        )}
      </div>

      {/* Swipe to Order Button */}
      <div
        className="swipe-order-button"
        ref={swipeButtonRef}
        onTouchStart={handleSwipeTouchStart}
        style={{
          background: isDragging
            ? `linear-gradient(to right, rgba(255, 69, 0, 0.15) ${
                dragProgress * 100
              }%, white ${dragProgress * 100}%)`
            : "white",
        }}
      >
        <div className="swipe-icon">
          <FiArrowRight />
        </div>
        <div className="swipe-text">
          {orderLoading ? "Placing order..." : "Swipe to Order"}
        </div>
      </div>
    </div>
  );
};

export default MobileCheckout;
