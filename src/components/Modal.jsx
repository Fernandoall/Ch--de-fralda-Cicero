import React from "react";
import "./Modal.scss";

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  produto,
  nome,
  setNome,
  telefone,
  setTelefone,
}) => {
  if (!isOpen || !produto) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirmar Presente</h2>
        <p>
          Produto: <strong>{produto.nome}</strong>
        </p>
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
          <button className="confirm" onClick={onConfirm}>
            Confirmar
          </button>
          <button className="cancel" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
