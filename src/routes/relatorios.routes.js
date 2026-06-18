const express = require("express");
const controller = require("../controllers/relatorios.controller");

const router = express.Router();

/*
=========================================================
ROTAS DE RELATÓRIOS
=========================================================
Responsável por disponibilizar os endpoints
das agregações do MongoDB.
*/

// Relatório: média das avaliações por filme
router.get(
  "/media-avaliacoes",
  controller.mediaAvaliacoesPorFilme
);

// Relatório: quantidade de filmes por gênero
router.get(
  "/filmes-por-genero",
  controller.quantidadeFilmesPorGenero
);

// Relatório: filmes agrupados por diretor
router.get(
  "/filmes-por-diretor",
  controller.filmesPorDiretor
);

// Relatório: ranking dos 5 filmes mais avaliados
router.get(
  "/top5-avaliados",
  controller.top5MaisAvaliados
);

// Exporta as rotas para utilização no servidor
module.exports = router;