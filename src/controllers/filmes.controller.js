const service = require("../services/filmes.service");

/*
=========================================================
CONTROLLER DE FILMES
=========================================================
Responsável por receber as requisições HTTP,
chamar os serviços e retornar respostas em JSON.
*/

// CREATE - Insere um único filme
async function criar(req, res) {
  try {
    const filme = await service.criarFilme(req.body);

    // 201 = recurso criado com sucesso
    res.status(201).json(filme);

  } catch (erro) {
    res.status(500).json({ erro: "Erro ao criar filme." });
  }
}

// CREATE - Inserção em lote (insertMany)
async function criarLote(req, res) {
  try {
    const resultado = await service.criarFilmesEmLote(req.body);

    res.status(201).json({
      mensagem: "Filmes inseridos em lote com sucesso.",
      inseridos: resultado.insertedCount
    });

  } catch (erro) {
    res.status(500).json({ erro: "Erro ao inserir filmes em lote." });
  }
}

// READ - Lista todos os filmes com filtros
async function listar(req, res) {
  try {
    const filmes = await service.listarFilmes(req.query);

    res.status(200).json(filmes);

  } catch (erro) {
    res.status(500).json({ erro: "Erro ao listar filmes." });
  }
}

// READ - Busca um filme pelo ID
async function buscarPorId(req, res) {
  try {
    const filme = await service.buscarFilmePorId(req.params.id);

    if (!filme) {
      return res.status(404).json({
        erro: "Filme não encontrado."
      });
    }

    res.status(200).json(filme);

  } catch (erro) {
    res.status(400).json({
      erro: "ID inválido."
    });
  }
}

// UPDATE - Atualização parcial utilizando $set
async function atualizar(req, res) {
  try {
    const filme = await service.atualizarFilme(
      req.params.id,
      req.body
    );

    if (!filme) {
      return res.status(404).json({
        erro: "Filme não encontrado."
      });
    }

    res.status(200).json(filme);

  } catch (erro) {
    res.status(500).json({
      erro: "Erro ao atualizar filme."
    });
  }
}

// UPDATE - Atualização de array embutido (plataformas)
async function adicionarPlataforma(req, res) {
  try {
    const filme = await service.adicionarPlataforma(
      req.params.id,
      req.body
    );

    res.status(200).json(filme);

  } catch (erro) {
    res.status(500).json({
      erro: "Erro ao atualizar array de plataformas."
    });
  }
}

// DELETE - Remove um filme pelo ID
async function deletar(req, res) {
  try {
    const resultado = await service.deletarFilme(
      req.params.id
    );

    if (resultado.deletedCount === 0) {
      return res.status(404).json({
        erro: "Filme não encontrado."
      });
    }

    // 204 = removido com sucesso sem retorno
    res.status(204).send();

  } catch (erro) {
    res.status(500).json({
      erro: "Erro ao deletar filme."
    });
  }
}

// DELETE - Remove documentos usando filtro
async function deletarFiltro(req, res) {
  try {
    const resultado = await service.deletarPorFiltro(
      req.body
    );

    res.status(200).json({
      mensagem: "Remoção por filtro realizada.",
      removidos: resultado.deletedCount
    });

  } catch (erro) {
    res.status(500).json({
      erro: "Erro ao deletar por filtro."
    });
  }
}

// Exporta as funções para utilização nas rotas
module.exports = {
  criar,
  criarLote,
  listar,
  buscarPorId,
  atualizar,
  adicionarPlataforma,
  deletar,
  deletarFiltro
};