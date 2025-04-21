// src/components/ProductList.jsx

import React, { useState, useRef } from "react";
import products from "../data/products";
import FloatingCartButton from "./FloatingCartButton";
import CartModal from "./CartModal";
import ClientInfoModal from "./ClientInfoModal";
import "../style/vitrine.scss";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductList = () => {
  const [selectedItems, setSelectedItems] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const carrosselRefs = useRef({});

  const categorias = [...new Set(products.map((p) => p.categoria))];

  const scroll = (categoria, direction) => {
    const container = carrosselRefs.current[categoria];
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleToggleItem = (product) => {
    const current = selectedItems[product.id] || 0;
    const disponivel =
      product.quantidadeMaxima === "ilimitado" ||
      current < product.quantidadeMaxima;

    if (current > 0) {
      const updatedItems = { ...selectedItems };
      delete updatedItems[product.id];
      setSelectedItems(updatedItems);
    } else if (disponivel) {
      setSelectedItems((prev) => ({
        ...prev,
        [product.id]: 1,
      }));
    }
  };

  return (
    <>
      <div className="vitrine-categorias">
        {categorias.map((categoria) => (
          <div key={categoria} className="categoria-bloco">
            <h2 className="categoria-titulo">{categoria}</h2>
            <div className="carousel-container">
              <button
                className="scroll-btn left"
                onClick={() => scroll(categoria, "left")}
              >
                <ChevronLeft size={24} />
              </button>

              <div
                className="vitrine-horizontal"
                ref={(el) => (carrosselRefs.current[categoria] = el)}
              >
                {products
                  .filter((product) => product.categoria === categoria)
                  .map((product) => {
                    const current = selectedItems[product.id] || 0;
                    const disponivel =
                      product.quantidadeMaxima === "ilimitado" ||
                      current < product.quantidadeMaxima;

                    return (
                      <div key={product.id} className="card">
                        <img src={product.imagem} alt={product.nome} />
                        <div className="card-content">
                          <h3>{product.nome}</h3>
                          <p>{product.descricao}</p>
                          <p className="quantidade">
                            {product.quantidadeMaxima === "ilimitado"
                              ? "Disponível"
                              : `Disponíveis: ${
                                  product.quantidadeMaxima - current
                                }`}
                          </p>
                          <button
                            onClick={() => handleToggleItem(product)}
                            disabled={!disponivel && current === 0}
                          >
                            {current > 0 ? "Remover" : "Adicionar"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>

              <button
                className="scroll-btn right"
                onClick={() => scroll(categoria, "right")}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <FloatingCartButton
        selectedItems={selectedItems}
        onClick={() => setCartOpen(true)}
      />

      {cartOpen && (
        <CartModal
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          onClose={() => setCartOpen(false)}
          onFinish={() => {
            setCartOpen(false);
            setShowClientModal(true);
          }}
        />
      )}

      {showClientModal && (
        <ClientInfoModal
          selectedItems={Object.entries(selectedItems).map(([id, qtd]) => {
            const product = products.find((p) => p.id === Number(id));
            return {
              id,
              nome: product?.nome || `Produto ID ${id}`,
              qtd,
              imagem: product?.imagem || "#",
            };
          })}
          onClose={() => setShowClientModal(false)}
        />
      )}
    </>
  );
};

export default ProductList;