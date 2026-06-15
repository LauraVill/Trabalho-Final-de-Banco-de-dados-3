const { ObjectId } = require("mongodb");
const connectDB = require("../config/database");

async function criarFilme(dados) {
  const db = await connectDB();

  dados.criadoEm = new Date();
  dados.atualizadoEm = new Date();

  const resultado = await db.collection("filmes").insertOne(dados);
  return { _id: resultado.insertedId, ...dados };
}

async function criarFilmesEmLote(lista) {
  const db = await connectDB();

  const filmes = lista.map((filme) => ({
    ...filme,
    criadoEm: new Date(),
    atualizadoEm: new Date()
  }));

  const resultado = await db.collection("filmes").insertMany(filmes);
  return resultado;
}

async function listarFilmes(filtros) {
  const db = await connectDB();

  const query = {};

  if (filtros.tipo) query.tipo = filtros.tipo;
  if (filtros.ano) query.anoLancamento = Number(filtros.ano);
  if (filtros.classificacao) query.classificacao = filtros.classificacao;

  return await db.collection("filmes")
    .find(query, {
      projection: {
        titulo: 1,
        tipo: 1,
        anoLancamento: 1,
        classificacao: 1,
        generos: 1
      }
    })
    .sort({ titulo: 1 })
    .toArray();
}

async function buscarFilmePorId(id) {
  const db = await connectDB();

  return await db.collection("filmes").findOne({
    _id: new ObjectId(id)
  });
}

async function atualizarFilme(id, dados) {
  const db = await connectDB();

  dados.atualizadoEm = new Date();

  await db.collection("filmes").updateOne(
    { _id: new ObjectId(id) },
    { $set: dados }
  );

  return await buscarFilmePorId(id);
}

async function adicionarPlataforma(id, plataforma) {
  const db = await connectDB();

  await db.collection("filmes").updateOne(
    { _id: new ObjectId(id) },
    {
      $push: {
        plataformas: plataforma
      },
      $set: {
        atualizadoEm: new Date()
      }
    }
  );

  return await buscarFilmePorId(id);
}

async function deletarFilme(id) {
  const db = await connectDB();

  return await db.collection("filmes").deleteOne({
    _id: new ObjectId(id)
  });
}

async function deletarPorFiltro(filtro) {
  const db = await connectDB();

  return await db.collection("filmes").deleteMany(filtro);
}

module.exports = {
  criarFilme,
  criarFilmesEmLote,
  listarFilmes,
  buscarFilmePorId,
  atualizarFilme,
  adicionarPlataforma,
  deletarFilme,
  deletarPorFiltro
};