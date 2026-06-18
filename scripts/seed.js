const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);

async function seed() {
  try {
    await client.connect();

    const db = client.db(process.env.DB_NAME);

    await db.collection("filmes").deleteMany({});
    await db.collection("generos").deleteMany({});
    await db.collection("diretores").deleteMany({});
    await db.collection("avaliacoes").deleteMany({});

    const generos = [
      "Ação", "Comédia", "Drama", "Terror", "Romance",
      "Ficção Científica", "Animação", "Suspense", "Fantasia", "Documentário",
      "Aventura", "Musical", "Mistério", "Crime", "Histórico",
      "Biografia", "Esporte", "Família", "Guerra", "Policial",
      "Super-herói", "Infantil", "Anime", "Nacional", "Investigação",
      "Tecnologia", "Distopia", "Medieval", "Sobrenatural", "Comédia Romântica"
    ].map((nome) => ({
      _id: new ObjectId(),
      nome,
      descricao: `Gênero relacionado a ${nome}.`,
      ativo: true
    }));

    const diretores = [
      "Christopher Nolan", "Steven Spielberg", "Greta Gerwig", "James Cameron", "Quentin Tarantino",
      "Martin Scorsese", "Sofia Coppola", "Jordan Peele", "Denis Villeneuve", "Patty Jenkins",
      "Fernando Meirelles", "Bong Joon-ho", "Guillermo del Toro", "Tim Burton", "David Fincher",
      "Wes Anderson", "Chloé Zhao", "Ridley Scott", "Peter Jackson", "Alfonso Cuarón",
      "Spike Lee", "Taika Waititi", "Lana Wachowski", "Lilly Wachowski", "Francis Ford Coppola",
      "George Lucas", "Sam Mendes", "Kathryn Bigelow", "Ava DuVernay", "Pedro Almodóvar"
    ].map((nome, index) => ({
      _id: new ObjectId(),
      nome,
      nacionalidade: index % 2 === 0 ? "Estados Unidos" : "Internacional",
      anoNascimento: 1940 + index,
      ativo: true
    }));

    await db.collection("generos").insertMany(generos);
    await db.collection("diretores").insertMany(diretores);

    const titulos = [
      "O Enigma do Tempo", "Cidade das Sombras", "Além das Estrelas", "A Última Canção",
      "Código Vermelho", "Noite Sem Fim", "Planeta Azul", "A Casa da Colina",
      "Memórias de Abril", "O Guardião", "Rastro de Fogo", "Segredos do Mar",
      "A Grande Jornada", "Vidas Cruzadas", "Império Digital", "O Chamado da Floresta",
      "Entre Dois Mundos", "A Máquina dos Sonhos", "O Mistério da Ilha", "Caminhos do Destino",
      "A Herança Perdida", "Sombras do Passado", "O Reino de Cristal", "A Cidade Invisível",
      "Operação Aurora", "O Silêncio das Ruas", "Luzes da Madrugada", "Fronteira Final",
      "A Lenda do Vale", "O Último Herói"
    ];

    const filmes = titulos.map((titulo, index) => ({
      _id: new ObjectId(),
      titulo,
      tipo: index % 3 === 0 ? "Série" : "Filme",
      anoLancamento: 2000 + index,
      classificacao: index % 2 === 0 ? "14 anos" : "Livre",
      duracaoMinutos: index % 3 === 0 ? null : 90 + index,
      temporadas: index % 3 === 0 ? Math.floor(index / 3) + 1 : null,
      ativo: true,

      // Embedding: as plataformas ficam dentro do documento do filme
      plataformas: [
        {
          nome: index % 2 === 0 ? "Netflix" : "Prime Video",
          disponivel: true
        },
        {
          nome: "Catálogo Interno",
          disponivel: true
        }
      ],

      // Embedding: os gêneros ficam em array dentro do filme
      generos: [
        generos[index % generos.length].nome,
        generos[(index + 3) % generos.length].nome
      ],

      // Referência: o filme referencia um diretor
      diretorId: diretores[index % diretores.length]._id,

      criadoEm: new Date(),
      atualizadoEm: new Date()
    }));

    await db.collection("filmes").insertMany(filmes);

    const avaliacoes = [];

    for (let i = 0; i < 90; i++) {
      avaliacoes.push({
        _id: new ObjectId(),
        filmeId: filmes[i % filmes.length]._id,
        usuario: `usuario${i + 1}@email.com`,
        nota: Number((Math.random() * 4 + 6).toFixed(1)),
        comentario: "Avaliação gerada para teste do catálogo.",
        dataAvaliacao: new Date(),
        ativo: true
      });
    }

    await db.collection("avaliacoes").insertMany(avaliacoes);

    await db.collection("filmes").createIndex({ titulo: 1 });
    await db.collection("filmes").createIndex({ anoLancamento: -1 });
    await db.collection("filmes").createIndex({ diretorId: 1 });
    await db.collection("avaliacoes").createIndex({ filmeId: 1 });
    await db.collection("generos").createIndex({ nome: 1 });
    await db.collection("diretores").createIndex({ nome: 1 });

    console.log("Banco populado com sucesso!");
    console.log("30 gêneros inseridos.");
    console.log("30 diretores inseridos.");
    console.log("30 filmes/séries inseridos.");
    console.log("90 avaliações inseridas.");
    console.log("Índices criados com sucesso.");
  } catch (erro) {
    console.error("Erro ao popular banco:", erro);
  } finally {
    await client.close();
  }
}

seed();