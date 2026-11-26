const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
 
const app = express();
const PORT = 3000;
 
// Middlewares
app.use(cors());
app.use(express.json());
 
// Caminho para o ficheiro JSON
const equipasPath = path.join(__dirname, 'equipas.json');
 
// Função para ler os dados do JSON
function readData() {
  const data = fs.readFileSync(equipasPath, 'utf-8');
  return JSON.parse(data);
}
 
// Função para guardar os dados no JSON
function saveData(equipas) {
  fs.writeFileSync(equipasPath, JSON.stringify(equipas, null, 2), 'utf-8');
}
 
// ROTA GET /api/equipas
app.get('/api/equipas', (req, res) => {
  const equipas = readData();
  res.status(200).json(equipas);
});
 
// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor a correr em http://localhost:${PORT}`);
});
 