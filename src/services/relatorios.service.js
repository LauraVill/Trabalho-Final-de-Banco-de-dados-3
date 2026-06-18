const connectDB = require("../config/database");

// Relatório 1: média das avaliações por filme
// Atende Aggregation: $match, $group, $lookup, $project, $sort, $avg e $sum
async function mediaAvaliacoesPorFilme() {
  const db = await connectDB();

  return await db.collection("avaliacoes").aggregate([
    {
      $match: {
        nota: { $gte: 0 }
      }
    },
    {
      $group: {
        _id: "$filmeId",
        mediaNotas: { $avg: "$nota" },
        totalAvaliacoes: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: "filmes",
        localField: "_id",
        foreignField: "_id",
        as: "filme"
      }
    },
    {
      $project: {
        _id: 0,
        filme: { $arrayElemAt: ["$filme.titulo", 0] },
        mediaNotas: { $round: ["$mediaNotas", 2] },
        totalAvaliacoes: 1
      }
    },
    {
      $sort: {
        mediaNotas: -1
      }
    }
  ]).toArray();
}

// Relatório 2: quantidade de filmes por gênero
// Usa $unwind para separar o array de gêneros e $group para agrupar
async function quantidadeFilmesPorGenero() {
  const db = await connectDB();

  return await db.collection("filmes").aggregate([
    {
      $match: {
        ativo: true
      }
    },
    {
      $unwind: "$generos"
    },
    {
      $group: {
        _id: "$generos",
        totalFilmes: { $sum: 1 },
        filmes: {
          $push: "$titulo"
        }
      }
    },
    {
      $project: {
        _id: 0,
        genero: "$_id",
        totalFilmes: 1,
        filmes: 1
      }
    },
    {
      $sort: {
        totalFilmes: -1
      }
    }
  ]).toArray();
}

// Relatório 3: filmes agrupados por diretor
// Usa $lookup para juntar filmes com diretores
async function filmesPorDiretor() {
  const db = await connectDB();

  return await db.collection("filmes").aggregate([
    {
      $match: {
        ativo: true
      }
    },
    {
      $lookup: {
        from: "diretores",
        localField: "diretorId",
        foreignField: "_id",
        as: "diretor"
      }
    },
    {
      $group: {
        _id: "$diretorId",
        totalFilmes: { $sum: 1 },
        maiorAno: { $max: "$anoLancamento" },
        filmes: { $push: "$titulo" },
        diretor: { $first: "$diretor" }
      }
    },
    {
      $project: {
        _id: 0,
        diretor: { $arrayElemAt: ["$diretor.nome", 0] },
        totalFilmes: 1,
        maiorAno: 1,
        filmes: 1
      }
    },
    {
      $sort: {
        totalFilmes: -1
      }
    }
  ]).toArray();
}

// Relatório 4: top 5 filmes mais avaliados
// Usa $count, $avg, $lookup, $sort e $limit
async function top5MaisAvaliados() {
  const db = await connectDB();

  return await db.collection("avaliacoes").aggregate([
    {
      $match: {
        nota: { $gte: 0 }
      }
    },
    {
      $group: {
        _id: "$filmeId",
        totalAvaliacoes: { $count: {} },
        media: { $avg: "$nota" }
      }
    },
    {
      $lookup: {
        from: "filmes",
        localField: "_id",
        foreignField: "_id",
        as: "filme"
      }
    },
    {
      $project: {
        _id: 0,
        titulo: { $arrayElemAt: ["$filme.titulo", 0] },
        totalAvaliacoes: 1,
        media: { $round: ["$media", 2] }
      }
    },
    {
      $sort: {
        totalAvaliacoes: -1
      }
    },
    {
      $limit: 5
    }
  ]).toArray();
}

module.exports = {
  mediaAvaliacoesPorFilme,
  quantidadeFilmesPorGenero,
  filmesPorDiretor,
  top5MaisAvaliados
};