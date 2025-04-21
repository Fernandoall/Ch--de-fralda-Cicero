// src/components/UserFormModal.jsx

import React from "react";
import "./Modal.scss"; // Reaproveita o estilo antigo

const UserFormModal = ({ isOpen, onClose, onSubmit, nome, setNome, telefone, setTelefone }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Seus Dados</h2>
        <input
          type="text"
          placeholder="Seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Seu telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
        <div className="modal-buttons">
          <button className="confirm" onClick={onSubmit}>Confirmar</button>
          <button className="cancel" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default UserFormModal;
