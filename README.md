# Sistema de Catálogo de Filmes e Séries

## Descrição

Este projeto consiste no desenvolvimento de uma API REST utilizando Node.js, Express e MongoDB, com o objetivo de demonstrar a aplicação dos conceitos de banco de dados NoSQL, modelagem orientada a documentos, operações CRUD, Aggregation Framework e integração entre aplicação e banco de dados.

O sistema permite o gerenciamento de filmes e séries, além da geração de relatórios analíticos a partir dos dados armazenados.



## Tecnologias Utilizadas

* Node.js
* Express.js
* MongoDB
* Driver Nativo MongoDB (`mongodb`)
* Dotenv
* Nodemon



## Estrutura do Projeto

```text
src/
├── config/
├── controllers/
├── routes/
├── services/

scripts/
└── seed.js

.env.example
package.json
README.md
```


## Funcionalidades Implementadas

### Operações CRUD

* Cadastro de filmes e séries
* Cadastro em lote de documentos
* Consulta de registros por filtros
* Consulta por identificador (ID)
* Atualização parcial de documentos
* Atualização de arrays embutidos
* Remoção por ID
* Remoção utilizando filtros

### Relatórios com Aggregation Framework

* Média de avaliações por filme
* Quantidade de filmes por gênero
* Filmes agrupados por diretor
* Ranking dos 5 filmes mais avaliados


## Modelagem Utilizada

O sistema foi desenvolvido utilizando quatro collections principais:

* Filmes
* Diretores
* Gêneros
* Avaliações

### Embedding

Os campos `plataformas` e `generos` são armazenados diretamente no documento de filme, reduzindo consultas adicionais ao banco.

### Referências

O relacionamento entre filmes e diretores é realizado através do campo `diretorId`.

O relacionamento entre avaliações e filmes é realizado através do campo `filmeId`.


## Configuração do Ambiente

Criar um arquivo `.env` na raiz do projeto contendo:

```env
MONGO_URI=mongodb://localhost:27017
DB_NAME=catalogo_filmes
PORT=3000
```

## Instalação

Instalar as dependências do projeto:

```bash
npm install
```

## Execução

Iniciar o servidor:

```bash
npm run dev
```

Popular o banco de dados com registros de teste:

```bash
npm run seed
```

## Endpoints Principais

### Filmes

| Método | Endpoint     | Descrição        |
| ------ | ------------ | ---------------- |
| POST   | /filmes      | Inserir filme    |
| POST   | /filmes/lote | Inserção em lote |
| GET    | /filmes      | Listar filmes    |
| GET    | /filmes/:id  | Buscar por ID    |
| PATCH  | /filmes/:id  | Atualizar filme  |
| DELETE | /filmes/:id  | Remover filme    |

### Relatórios

| Método | Endpoint                       |
| ------ | ------------------------------ |
| GET    | /relatorios/media-avaliacoes   |
| GET    | /relatorios/filmes-por-genero  |
| GET    | /relatorios/filmes-por-diretor |
| GET    | /relatorios/top5-avaliados     |

## Considerações Finais

O projeto foi desenvolvido com foco na aplicação prática dos conceitos de bancos de dados NoSQL, utilizando MongoDB e Node.js. Foram implementadas operações CRUD completas, modelagem com documentos embutidos e referências, criação de índices para otimização de consultas e relatórios utilizando o Aggregation Framework.


**Autora:** Laura Vilela Couto
**Disciplina:** Banco de Dados III
