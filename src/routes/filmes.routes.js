const express = require("express");
const controller = require("../controllers/filmes.controller");

const router = express.Router();

router.post("/", controller.criar);
router.post("/lote", controller.criarLote);

router.get("/", controller.listar);
router.get("/:id", controller.buscarPorId);

router.patch("/:id", controller.atualizar);
router.patch("/:id/plataformas", controller.adicionarPlataforma);

router.delete("/filtro/remover", controller.deletarFiltro);
router.delete("/:id", controller.deletar);

module.exports = router;
