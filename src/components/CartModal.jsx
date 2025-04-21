// src/components/CartModal.jsx

import React from "react";
import products from "../data/products";
import "./CartModal.scss";

const CartModal = ({ selectedItems, setSelectedItems, onClose, onFinish }) => {
  const handleAdd = (id) => {
    const product = products.find((p) => p.id === Number(id));
    const current = selectedItems[id] || 0;

    const isAvailable =
      product.quantidadeMaxima === "ilimitado" ||
      current < product.quantidadeMaxima;

    if (isAvailable) {
      setSelectedItems((prev) => ({
        ...prev,
        [id]: current + 1,
      }));
    }
  };

  const handleRemove = (id) => {
    const current = selectedItems[id];
    if (current > 1) {
      setSelectedItems((prev) => ({
        ...prev,
        [id]: current - 1,
      }));
    } else {
      const updated = { ...selectedItems };
      delete updated[id];
      setSelectedItems(updated);
    }
  };

  return (
    <div className="cart-modal-backdrop">
      <div className="cart-modal">
        <button className="close-button" onClick={onClose}>
          ✕
        </button>
        <h2>Sua Sacola</h2>

        {Object.keys(selectedItems).length === 0 ? (
          <p>Sua sacola está vazia.</p>
        ) : (
          <>
            <ul className="cart-list">
              {Object.entries(selectedItems).map(([id, qty]) => {
                const product = products.find((p) => p.id.toString() === id);

                return (
                  <li key={id} className="cart-item">
                    <span className="product-name">{product?.nome || `Produto ID: ${id}`}</span>
                    <div className="quantity-container">
                      <small className="quantity-label">Quantidade</small>
                      <div className="quantity-controls">
                        <button onClick={() => handleRemove(id)}>-</button>
                        <span>{qty}</span>
                        <button onClick={() => handleAdd(id)}>+</button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        <div className="cart-buttons">
          <button className="continuar-btn" onClick={onClose}>
            Continuar
          </button>
          <button
            className="finalizar-btn"
            onClick={() => onFinish()}
            disabled={Object.keys(selectedItems).length === 0}
          >
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;