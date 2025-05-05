import React from "react";
import ProductList from "./components/ProductList.jsx";
import Modal from "./components/Modal.jsx";
import Header from "./components/Header.jsx";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <ProductList />
      <Modal />
      <footer className="footer">
        Desenvolvido por <span className="destaque">Fernandev</span>
      </footer>
    </div>
  );
}

export default App;
