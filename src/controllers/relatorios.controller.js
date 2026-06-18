const service = require("../services/relatorios.service");

/*
=========================================================
CONTROLLER DE RELATÓRIOS
=========================================================
Responsável por receber as requisições dos
relatórios e retornar os resultados das
agregações realizadas no MongoDB.
*/
async function mediaAvaliacoesPorFilme(req, res) {
  const dados = await service.mediaAvaliacoesPorFilme();

  res.status(200).json(dados);
}

// Relatório: quantidade de filmes por gênero
// Utiliza agrupamentos ($group) e contagens ($sum)
async function quantidadeFilmesPorGenero(req, res) {
  const dados = await service.quantidadeFilmesPorGenero();

  res.status(200).json(dados);
}

// Relatório: filmes agrupados por diretor
// Utiliza relacionamento entre collections
async function filmesPorDiretor(req, res) {
  const dados = await service.filmesPorDiretor();

  res.status(200).json(dados);
}

// Relatório: ranking dos 5 filmes mais avaliados
// Utiliza ordenação ($sort) e limitação ($limit)
async function top5MaisAvaliados(req, res) {
  const dados = await service.top5MaisAvaliados();

  res.status(200).json(dados);
}

// Exporta as funções para utilização nas rotas
module.exports = {
  mediaAvaliacoesPorFilme,
  quantidadeFilmesPorGenero,
  filmesPorDiretor,
  top5MaisAvaliados
};