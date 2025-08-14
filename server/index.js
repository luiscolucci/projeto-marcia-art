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
    storageBucket: "marcia-art.appspot.com", // Nome do seu bucket
  });
  console.log("Firebase Admin SDK inicializado com sucesso!");
} catch (error) {
  console.error("ERRO CRÍTICO AO INICIALIZAR O FIREBASE ADMIN SDK:", error);
  process.exit(1);
}
// --- Fim do Bloco de Inicialização ---

const db = admin.firestore();
const app = express();

// Configuração do CORS e Body-Parser
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(bodyParser.json());

// Configuração do Multer
const upload = multer({ storage: multer.memoryStorage() });

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

// Rota para CRIAR (POST) uma nova obra com upload de imagem
app.post("/api/obras", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("Nenhum arquivo de imagem enviado.");
    }
    const bucket = getStorage().bucket();
    const blob = bucket.file(`obras/${Date.now()}-${req.file.originalname}`);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
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

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
