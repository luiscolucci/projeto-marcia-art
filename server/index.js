const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");

// --- Bloco de Inicialização do Firebase com Tratamento de Erro ---
try {
  const serviceAccount = require("./serviceAccountKey.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Firebase Admin SDK inicializado com sucesso!");
} catch (error) {
  console.error("ERRO CRÍTICO AO INICIALIZAR O FIREBASE ADMIN SDK:", error);
  // Se a inicialização falhar, encerramos o processo para que o erro fique claro no Cloud Run
  process.exit(1);
}
// --- Fim do Bloco de Inicialização ---

const db = admin.firestore();
const app = express();

app.use(cors());

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Servidor do Projeto Marcia Art está no ar!");
});

app.get("/api/obras", async (req, res) => {
  try {
    const obrasCollection = db.collection("obras");
    const snapshot = await obrasCollection.get();

    if (snapshot.empty) {
      return res.status(200).json([]);
    }

    const obrasList = [];
    snapshot.forEach((doc) => {
      obrasList.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.status(200).json(obrasList);
  } catch (error) {
    console.error("Erro ao buscar obras: ", error);
    res.status(500).send("Erro no servidor ao buscar obras.");
  }
});

// ROTA PARA DELETAR UMA OBRA
app.delete("/api/obras/:id", async (req, res) => {
  try {
    const obraId = req.params.id;
    await db.collection("obras").doc(obraId).delete();
    res.status(200).send(`Obra com ID ${obraId} deletada com sucesso.`);
  } catch (error) {
    console.error("Erro ao deletar obra: ", error);
    res.status(500).send("Erro no servidor ao deletar obra.");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
