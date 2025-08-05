const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors'); // 1. IMPORTA A BIBLIOTECA CORS
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();
app.use(cors()); // 2. DIZ AO EXPRESS PARA USAR O CORS E LIBERAR O ACESSO
const PORT = 3001;

app.get('/', (req, res) => {
  res.send('Servidor do Projeto Marcia Art está no ar!');
});

// NOSSA NOVA ROTA DE API
app.get('/api/obras', async (req, res) => {
  try {
    const obrasCollection = db.collection('obras');
    const snapshot = await obrasCollection.get();

    if (snapshot.empty) {
      return res.status(200).json([]);
    }

    const obrasList = [];
    snapshot.forEach(doc => {
      obrasList.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.status(200).json(obrasList);

  } catch (error) {
    console.error("Erro ao buscar obras: ", error);
    res.status(500).send('Erro no servidor ao buscar obras.');
  }
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});