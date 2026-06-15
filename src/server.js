const express = require("express");
const cors = require("cors");
require("dotenv").config();

const filmesRoutes = require("./routes/filmes.routes");
const relatoriosRoutes = require("./routes/relatorios.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    mensagem: "API Catálogo de Filmes e Séries funcionando!"
  });
});

app.use("/filmes", filmesRoutes);
app.use("/relatorios", relatoriosRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});