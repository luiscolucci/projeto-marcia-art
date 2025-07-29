const express = require('express');
const app = express();
const PORT = 3001; // Usamos uma porta diferente da do React (que usa a 3000)

app.get('/api', (req, res) => {
  res.json({ message: 'Olá do servidor!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});