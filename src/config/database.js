const { MongoClient } = require("mongodb");
require("dotenv").config();

// Cria a conexão utilizando a URI definida no arquivo .env
const client = new MongoClient(process.env.MONGO_URI);

let db;

/*
=========================================================
FUNÇÃO: connectDB()
=========================================================
Objetivo:
Realizar a conexão com o MongoDB e disponibilizar
a instância do banco para toda a aplicação.

RELAÇÃO COM A ATIVIDADE:
✓ Utiliza o driver nativo do MongoDB.
✓ Utiliza variáveis de ambiente (.env).
✓ Centraliza a conexão com o banco de dados.
=========================================================
*/
async function connectDB() {

  // Evita múltiplas conexões desnecessárias
  if (!db) {

    await client.connect();

    // Seleciona o banco definido no .env
    db = client.db(process.env.DB_NAME);

    console.log("MongoDB conectado com sucesso!");
  }

  return db;
}

// Exporta a função para ser utilizada nos services
module.exports = connectDB;