const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar armazenamento de uploads
const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

app.use(express.static('public'));

// Rota para listar vídeos
app.get('/api/videos', (req, res) => {
  fs.readdir('./uploads', (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao listar vídeos" });
    }
    res.json(files.map(filename => ({ filename })));
  });
});

// Rota para fazer upload de vídeos
app.post('/upload', upload.single('video'), (req, res) => {
  res.send('Vídeo enviado com sucesso!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
