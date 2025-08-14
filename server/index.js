const express = require("express"); // CORREÇÃO: Linha descomentada
const admin = require("firebase-admin");
const cors = require("cors");
const bodyParser = require("body-parser");

// --- Bloco de Inicialização do Firebase com Tratamento de Erro ---
try {
  const serviceAccount = require("./serviceAccountKey.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Firebase Admin SDK inicializado com sucesso!");
} catch (error) {
  console.error("ERRO CRÍTICO AO INICIALIZAR O FIREBASE ADMIN SDK:", error);
  process.exit(1);
}
// --- Fim do Bloco de Inicialização ---

const db = admin.firestore();
const app = express();

// Configuração explícita do CORS para aceitar mais métodos
app.use(
  cors({
    origin: "*", // Permite qualquer origem. Para produção, poderia ser o domínio do seu site.
    methods: ["GET", "POST", "PUT", "DELETE"], // Libera os métodos que nossa API usa
    allowedHeaders: ["Content-Type"], // Libera cabeçalhos comuns
  })
);
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;

// --- DEFINIÇÃO DAS ROTAS DA API ---

// Rota de teste
app.get("/", (req, res) => {
  res.send("Servidor do Projeto Marcia Art está no ar!");
});

// Rota para BUSCAR (GET) todas as obras
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

// Rota para ATUALIZAR (PUT) uma obra específica
app.put("/api/obras/:id", async (req, res) => {
  try {
    const obraId = req.params.id;
    const updatedData = req.body;

    await db.collection("obras").doc(obraId).update(updatedData);

    res.status(200).json({ id: obraId, ...updatedData });
  } catch (error) {
    console.error("Erro ao atualizar obra: ", error);
    res.status(500).send("Erro no servidor ao atualizar obra.");
  }
});

// Rota para DELETAR (DELETE) uma obra específica
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

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
