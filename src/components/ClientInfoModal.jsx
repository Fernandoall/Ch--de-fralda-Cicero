// src/components/ClientInfoModal.jsx

import React, { useState } from "react";
import Agradecimento from './Agradecimento';
import "./ClientInfoModal.scss";

const ClientInfoModal = ({ onClose = () => {}, selectedItems }) => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [formaEntrega, setFormaEntrega] = useState("");
  const [showAgradecimento, setShowAgradecimento] = useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async () => {
    if (!nome || !telefone || !formaEntrega) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    setShowAgradecimento(true); // 1. Exibe mensagem de agradecimento

    await delay(4000);
    
    if (typeof onClose === "function") {
        onClose();
    };
    
    await delay(1000);// 2. Espera 4 segundos

    // 3. Gera mensagem do WhatsApp
    let mensagem = `Oi, Laura! Aqui é ${nome}, meu telefone é ${telefone}.\n`;
    mensagem += "Assinei os seguintes itens da lista do Chá de Fraldas do Antônio Cícero:\n";
    mensagem += selectedItems.map((item) => `- ${item.qtd}x ${item.nome}`).join("\n");

    mensagem += `\n\nFarei o envio dos itens via: ${formaEntrega}.\n`;

    mensagem += "\nInformações úteis:\n\n";

    mensagem += "Caso tenha optado por PIX:\nChave Pix: 017.572.834-80\n";

    mensagem += "\nCaso tenha optado por Presencial no dia do Chá.\nInformações do evento:\n";
    mensagem += "Data: 17 de maio, às 15h.\nLocal: Boteco Seu Tijuca.\n";
    mensagem += "Endereço: Av. Washington Luís, 386 - Gonzaga, Santos - SP\n\n";

    mensagem += "Caso tenha optado por Envio no nosso endereço:\n";
    mensagem += "Endereço para entrega: Av. Martins Fontes, 506, Apto 12 - Catiapoã, São Vicente - SP - CEP: 11390-200\n";

    mensagem += `\nCom carinho,\n${nome}`;

    const whatsappLink = `https://wa.me/5584998140986?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappLink, "_blank"); // 4. Abre WhatsApp

    await delay(1000); // Espera 1s para garantir abertura

    // 5. Fecha o modal
    if (typeof onClose === "function") {
      onClose();
    } else {
      console.warn("onClose não é uma função!");
    }
  };

  return (
    <div className="client-modal-backdrop">
      <div className="client-modal">
        <button className="close-button" onClick={onClose}>✕</button>
        {showAgradecimento ? (
          <Agradecimento />
        ) : (
          <>
            <h2 className="tituloh2">Está quase lá! 🤩</h2>
            <h4><strong>Atenção!</strong> Ao indicar seu nome, telefone e a forma de envio abaixo, você será encaminhado(a) para o whatsapp da Laura, onde aparecerá a lista de itens assinada. Faça o envio da mensagem para que seja contabilizado na lista geral.</h4>
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
            <select
              value={formaEntrega}
              onChange={(e) => setFormaEntrega(e.target.value)}
              className="select-entrega"
            >
              <option value="">Selecione a forma de envio</option>
              <option value="1- Pix">1- Pix </option>
              <option value="2- Presencial no dia do Chá">2- Presencial no dia do Chá</option>
              <option value="3- Envio no seu endereço">3- Envio no seu endereço</option>
            </select>
            <div className="produtos-selecionados">
              <h3>Itens selecionados</h3>
              {selectedItems.map((produto, index) => (
                <div key={index} className="produto">
                  {produto.imagem && produto.imagem !== "#" && (
                    <img src={produto.imagem} alt={produto.nome} className="imagem-produto" />
                  )}
                  <p>{produto.nome}</p>
                  <p>Quantidade: {produto.qtd}</p>
                </div>
              ))}
            </div>
            <button className="enviar-btn" onClick={handleSubmit}>
              Assinar e enviar no whatsapp
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ClientInfoModal;