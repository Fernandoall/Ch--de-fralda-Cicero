// src/components/FloatingCartButton.jsx

import React from "react";
import { ShoppingBag } from "lucide-react";
import "../style/floatingCartButton.scss";

const FloatingCartButton = ({ selectedItems, onClick }) => {
    const totalItems = Object.values(selectedItems).reduce((acc, val) => acc + val, 0);
  
    return (
      <div className="floating-cart-button">
        <button className="cart-button" onClick={onClick}>
          <ShoppingBag size={24} />
          {totalItems > 0 && <span className="item-count">{totalItems}</span>}
        </button>
      </div>
    );
  };
  

export default FloatingCartButton;
