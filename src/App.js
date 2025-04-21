import React from "react";
import ProductList from "./components/ProductList.jsx";
import Modal from "./components/Modal.jsx";
import Header from "./components/Header.jsx"; // novo import
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <ProductList />
      <Modal />
    </div>
  );
}

export default App;