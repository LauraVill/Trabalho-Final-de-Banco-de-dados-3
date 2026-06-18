const express = require("express");
const controller = require("../controllers/filmes.controller");

const router = express.Router();

// CREATE - Cria um único filme
router.post("/", controller.criar);

// CREATE - Inserção em lote (insertMany)
router.post("/lote", controller.criarLote);

// READ - Lista todos os filmes
router.get("/", controller.listar);

// READ - Busca um filme pelo ID
router.get("/:id", controller.buscarPorId);

// UPDATE - Atualização parcial com $set
router.patch("/:id", controller.atualizar);

// UPDATE - Atualização de array embutido (plataformas)
router.patch("/:id/plataformas", controller.adicionarPlataforma);

// DELETE - Remoção por filtro
router.delete("/filtro/remover", controller.deletarFiltro);

// DELETE - Remoção por ID
router.delete("/:id", controller.deletar);

// Exporta as rotas para utilização no servidor
module.exports = router;