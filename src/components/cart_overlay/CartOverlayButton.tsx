import React from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "../../contexts/CartContext";
import styles from "./CartOverlayButton.module.css";

const CartOverlayButton: React.FC = () => {
  const { totalCount } = useCart();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/profile?tab=cart");
  };

  return (
    <button
      type="button"
      className={styles.cartButton}
      onClick={handleClick}
      aria-label="Xem giỏ hàng"
    >
      <span className={styles.icon}>
        <FiShoppingCart size={22} />
      </span>
      {totalCount > 0 && (
        <span className={styles.badge}>
          {totalCount > 99 ? "99+" : totalCount}
        </span>
      )}
    </button>
  );
};

export default CartOverlayButton;

