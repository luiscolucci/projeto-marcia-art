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
    storageBucket: "marcia-art.appspot.com", // Verifique se este nome está correto
  });
  console.log("Firebase Admin SDK inicializado com sucesso!");
} catch (error) {
  console.error("ERRO CRÍTICO AO INICIALIZAR O FIREBASE ADMIN SDK:", error);
  process.exit(1);
}
// --- Fim do Bloco de Inicialização ---

const db = admin.firestore();
const app = express();

// Usamos a configuração de CORS simples
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do Multer para guardar o arquivo em memória
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB
});

const PORT = process.env.PORT || 3001;

// --- DEFINIÇÃO DAS ROTAS DA API ---

app.get("/", (req, res) => {
  res.send("Servidor do Projeto Marcia Art está no ar!");
});

// Rota para BUSCAR (GET)
app.get("/api/obras", async (req, res) => {
  try {
    const snapshot = await db.collection("obras").get();
    const obrasList = [];
    snapshot.forEach((doc) => {
      obrasList.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(obrasList);
  } catch (error) {
    console.error("Erro ao buscar obras: ", error);
    res.status(500).send("Erro no servidor ao buscar obras.");
  }
});

// Rota para CRIAR (POST) - Primeira Versão
app.post("/api/obras", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("Nenhum arquivo de imagem enviado.");
    }

    const bucket = admin.storage().bucket();
    const blob = bucket.file(`obras/${Date.now()}-${req.file.originalname}`);
    const blobStream = blob.createWriteStream({
      metadata: { contentType: req.file.mimetype },
    });

    blobStream.on("error", (err) => {
      console.error(err);
      throw new Error("Erro ao fazer upload da imagem.");
    });

    blobStream.on("finish", async () => {
      await blob.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      const newObra = {
        title: req.body.title,
        description: req.body.description,
        price: parseFloat(req.body.price),
        isAvailable: req.body.isAvailable === "true",
        image: publicUrl,
      };

      const docRef = await db.collection("obras").add(newObra);
      res.status(201).json({ id: docRef.id, ...newObra });
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    console.error("Erro ao criar obra: ", error);
    res.status(500).send("Erro no servidor ao criar obra.");
  }
});

// Rota para ATUALIZAR (PUT)
app.put("/api/obras/:id", async (req, res) => {
  const obraId = req.params.id;
  const updatedData = req.body;
  await db.collection("obras").doc(obraId).update(updatedData);
  res.status(200).json({ id: obraId, ...updatedData });
});

// Rota para DELETAR (DELETE)
app.delete("/api/obras/:id", async (req, res) => {
  const obraId = req.params.id;
  await db.collection("obras").doc(obraId).delete();
  res.status(200).send(`Obra com ID ${obraId} deletada com sucesso.`);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
