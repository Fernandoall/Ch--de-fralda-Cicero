import React from "react";
import ProductList from "./components/ProductList";
import Modal from "./components/Modal";
import Header from "./components/Header"; // novo import
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
