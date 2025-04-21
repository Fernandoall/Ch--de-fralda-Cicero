// src/components/ClientInfoModal.jsx

import React, { useState } from "react";
import products from "../data/products";
import "./ClientInfoModal.scss";

const ClientInfoModal = ({ selectedItems, onConfirm, onCancel }) => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome.trim() || !telefone.trim()) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const dadosCliente = {
      nome,
      telefone,
      produtos: Object.entries(selectedItems).map(([id, quantidade]) => {
        const produto = products.find((p) => p.id.toString() === id);
        return {
          nome: produto?.nome || `Produto ID: ${id}`,
          quantidade,
        };
      }),
    };

    onConfirm(dadosCliente);
  };

  return (
    <div className="client-modal-backdrop">
      <div className="client-modal">
        <h2>Finalizar Pedido</h2>
        <form onSubmit={handleSubmit} className="client-form">
          <label>
            Nome:
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </label>

          <label>
            Telefone:
            <input
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
            />
          </label>

          <div className="produto-lista">
            <strong>Produtos Selecionados:</strong>
            <ul>
              {Object.entries(selectedItems).map(([id, quantidade]) => {
                const produto = products.find((p) => p.id.toString() === id);
                return (
                  <li key={id}>
                    {produto?.nome || `Produto ID: ${id}`} — {quantidade}x
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="modal-buttons">
            <button type="button" className="cancelar-btn" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className="confirmar-btn">
              Confirmar Pedido
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientInfoModal;
