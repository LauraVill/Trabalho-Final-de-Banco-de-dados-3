const express = require("express");
const controller = require("../controllers/relatorios.controller");

const router = express.Router();

router.get("/media-avaliacoes", controller.mediaAvaliacoesPorFilme);
router.get("/filmes-por-genero", controller.quantidadeFilmesPorGenero);
router.get("/filmes-por-diretor", controller.filmesPorDiretor);
router.get("/top5-avaliados", controller.top5MaisAvaliados);

module.exports = router;