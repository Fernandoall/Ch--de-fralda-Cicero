// scripts/importProducts.js
import admin from "firebase-admin";
import products from "../data/products.js";
import serviceAccount from "./firebaseServiceKey.json" with { type: "json" };

// Inicializa Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const importProducts = async () => {
  try {
    if (!products || !Array.isArray(products)) {
      throw new Error("Lista de produtos inválida.");
    }

    const batch = db.batch();
    const collectionRef = db.collection("products"); // ✅ Corrigido nome da coleção

    products.forEach((product) => {
      const docRef = collectionRef.doc(); // cria um ID automático
      batch.set(docRef, {
        id: product.id,
        nome: product.nome,
        descricao: product.descricao,
        quantidade: product.quantidade,
        quantidadeMaxima: product.quantidadeMaxima,
        imagem: product.imagem,
        categoria: product.categoria,
      });
    });

    await batch.commit();
    console.log("✅ Produtos importados com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao importar produtos:", error);
  }
};

importProducts();
