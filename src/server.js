const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Importação das rotas da aplicação
const filmesRoutes = require("./routes/filmes.routes");
const relatoriosRoutes = require("./routes/relatorios.routes");

const app = express();

/*
=========================================================
CONFIGURAÇÕES GERAIS
=========================================================
✓ Express.js
✓ Variáveis de ambiente (.env)
✓ API REST
=========================================================
*/

// Permite requisições externas para a API
app.use(cors());

// Permite receber dados JSON nas requisições
app.use(express.json());

// Disponibiliza os arquivos da interface web
app.use(express.static("public"));


//Utilizada para verificar se a API está funcionando.

app.get("/", (req, res) => {
  res.json({
    mensagem: "API Catálogo de Filmes e Séries funcionando!"
  });
});

/*
=========================================================
ROTAS DA API
=========================================================
/filmes      -> CRUD de filmes
/relatorios  -> Aggregation Framework
=========================================================
*/
app.use("/filmes", filmesRoutes);
app.use("/relatorios", relatoriosRoutes);

// Porta definida no .env ou 3000 por padrão
const PORT = process.env.PORT || 3000;


//INICIALIZAÇÃO DO SERVIDOR

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});