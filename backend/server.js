const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
 
const app = express();
const PORT = 3000;
 
app.use(cors());
app.use(express.json());
 
const equipasPath = path.join(__dirname, 'equipas.json');
 
function readData() {
  return JSON.parse(fs.readFileSync(equipasPath, 'utf-8'));
}
 
function saveData(equipas) {
  fs.writeFileSync(equipasPath, JSON.stringify(equipas, null, 2), 'utf-8');
}
 
// GET
app.get('/api/equipas', (req, res) => {
  res.status(200).json(readData());
});

// FEATURE A: POST
app.post('/api/equipas', (req, res) => {
  const { nome, pais, titulos, posicao } = req.body;

  if (!nome || !pais || titulos === undefined || titulos < 0) {
    return res.status(400).json({ error: 'Nome e país são obrigatórios, e os títulos têm de ser >= 0.' });
  }

  const equipas = readData();
  // Usa a data atual como ID único
  const novaEquipa = { id: Date.now(), nome, pais, titulos: Number(titulos), posicao: Number(posicao) };
  
  equipas.push(novaEquipa);
  saveData(equipas);

  res.status(201).json(novaEquipa);
});

// FEATURE B: DELETE
app.delete('/api/equipas/:id', (req, res) => {
  const id = Number(req.params.id);
  const equipas = readData();
  
  const existe = equipas.find(e => e.id === id);
  if (!existe) {
    return res.status(404).json({ error: 'Equipa não encontrada.' });
  }

  // Filtra a equipa a apagar
  saveData(equipas.filter(e => e.id !== id));
  res.status(204).send();
});
 
app.listen(PORT, () => {
  console.log(`Servidor a correr em http://localhost:${PORT}`);
});