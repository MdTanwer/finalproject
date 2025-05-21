import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiX } from "react-icons/fi";
import "../styles/pages/CookingInstructions.css";

const CookingInstructions = () => {
  const [instructions, setInstructions] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Get the return path from state or default to mobile-checkout
  const returnPath = location.state?.returnPath || "/mobile-checkout";
  const itemId = location.state?.itemId;

  useEffect(() => {
    // Check if there are saved instructions for this item
    const savedInstructions = localStorage.getItem(`instructions_${itemId}`);
    if (savedInstructions) {
      setInstructions(savedInstructions);
    }
  }, [itemId]);

  const handleCancel = () => {
    navigate(returnPath);
  };

  const handleNext = () => {
    // Save instructions to localStorage if itemId is available
    if (itemId) {
      localStorage.setItem(`instructions_${itemId}`, instructions);
    }
    // Return to the previous page
    navigate(returnPath, {
      state: {
        instructions,
        itemId,
      },
    });
  };

  return (
    <div className="cooking-instructions-overlay">
      <div className="cooking-instructions-modal-new">
        <button className="modal-close-btn" onClick={handleCancel}>
          <FiX size={32} />
        </button>
        <div className="modal-content">
          <h2 className="modal-title">Add Cooking instructions</h2>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder=""
            rows={3}
            className="modal-textarea"
          ></textarea>
          <div className="modal-helper-text">
            The restaurant will try its best to follow your request. However,
            refunds or cancellations in this regard won't be possible
          </div>
          <div className="modal-actions">
            <button className="modal-cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button className="modal-next-btn" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookingInstructions;
