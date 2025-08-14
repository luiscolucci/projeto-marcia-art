const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const bodyParser = require("body-parser");
const { getStorage } = require("firebase-admin/storage");
const multer = require("multer");

// --- Bloco de Inicialização do Firebase ---
try {
  const serviceAccount = require("./serviceAccountKey.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "marcia-art.firebasestorage.app",
  });
  console.log("Firebase Admin SDK inicializado com sucesso!");
} catch (error) {
  console.error("ERRO CRÍTICO AO INICIALIZAR O FIREBASE ADMIN SDK:", error);
  process.exit(1);
}
// --- Fim do Bloco de Inicialização ---

const db = admin.firestore();
const app = express();

// --- NOVA CONFIGURAÇÃO DO CORS (MAIS ROBUSTA) ---
app.use(
  cors({
    origin: "*", // Permite todas as origens
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS", // Adiciona OPTIONS
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// --- FIM DA NOVA CONFIGURAÇÃO ---

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do Multer
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB por arquivo
});

const PORT = process.env.PORT || 3001;

// --- DEFINIÇÃO DAS ROTAS DA API ---

app.get("/", (req, res) => {
  res.send("Servidor do Projeto Marcia Art está no ar!");
});

app.get("/api/obras", async (req, res) => {
  // ... seu código que já funciona ...
});

app.put("/api/obras/:id", async (req, res) => {
  // ... seu código que já funciona ...
});

app.delete("/api/obras/:id", async (req, res) => {
  // ... seu código que já funciona ...
});

app.post("/api/obras", upload.single("image"), async (req, res) => {
  // ... seu código que já funciona ...
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
