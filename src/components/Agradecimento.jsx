// src/components/Agradecimento.jsx
import React, { useEffect } from 'react';
import './Agradecimento.scss';

const Agradecimento = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Oculta após 5s
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="agradecimento-popup">
      💛 Obrigado por participar do nosso momento especial! Sua contribuição fará a diferença!
    </div>
  );
};

export default Agradecimento;
