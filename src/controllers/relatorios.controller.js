const service = require("../services/relatorios.service");

async function mediaAvaliacoesPorFilme(req, res) {
  const dados = await service.mediaAvaliacoesPorFilme();
  res.status(200).json(dados);
}

async function quantidadeFilmesPorGenero(req, res) {
  const dados = await service.quantidadeFilmesPorGenero();
  res.status(200).json(dados);
}

async function filmesPorDiretor(req, res) {
  const dados = await service.filmesPorDiretor();
  res.status(200).json(dados);
}

async function top5MaisAvaliados(req, res) {
  const dados = await service.top5MaisAvaliados();
  res.status(200).json(dados);
}

module.exports = {
  mediaAvaliacoesPorFilme,
  quantidadeFilmesPorGenero,
  filmesPorDiretor,
  top5MaisAvaliados
};