import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header header-safari">
      <div className="header-decor">🦒🌿</div>
      <h1 className="fade-in">
        🎁 Chá de Fraldas do <span className="baby-name">Antônio Cícero</span> 👶
      </h1>
      <p className="subtext fade-in delay">
      Se você quer presentear Cicinho e garantir que a escolha fará diferença na nossa rotina, criamos este espaço com muito amor para compartilhar os itens do enxoval que ainda faltam e facilitar também para quem estará conosco a distância.
      </p>
    </header>
  );
}

export default Header;
