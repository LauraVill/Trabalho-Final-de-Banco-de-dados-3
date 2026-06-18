// Área onde os dados serão exibidos
const resultado = document.getElementById("resultado");

// Consome a rota GET /filmes (READ do CRUD)
async function carregarFilmes() {
  resultado.innerHTML = "<p>Carregando filmes...</p>";

  const resposta = await fetch("/filmes");
  const filmes = await resposta.json();

  resultado.innerHTML = "";

  filmes.forEach((filme) => {
    resultado.innerHTML += `
      <div class="card">
        <h2>${filme.titulo}</h2>
        <p><strong>Tipo:</strong> ${filme.tipo}</p>
        <p><strong>Ano:</strong> ${filme.anoLancamento}</p>
        <p><strong>Classificação:</strong> ${filme.classificacao || "Não informada"}</p>

        <!-- Exibe os gêneros armazenados no documento (Embedding) -->
        <span class="badge">
          ${filme.generos ? filme.generos.join(", ") : "Sem gênero"}
        </span>
      </div>
    `;
  });
}

// Consome os relatórios gerados pelas Aggregations do MongoDB
async function carregarRelatorio(rota) {
  resultado.innerHTML = "<p>Carregando relatório...</p>";

  const resposta = await fetch(rota);
  const dados = await resposta.json();

  resultado.innerHTML = "";

  dados.forEach((item) => {
    resultado.innerHTML += `
      <div class="card">
        ${Object.entries(item)
          .map(
            ([chave, valor]) => `
              <div class="info-relatorio">
                <strong>${formatarChave(chave)}:</strong>
                ${formatarValor(valor)}
              </div>
            `
          )
          .join("")}
      </div>
    `;
  });
}

// Formata nomes dos campos para exibição
function formatarChave(chave) {
  return chave
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letra) => letra.toUpperCase());
}

// Formata os valores retornados pela API
function formatarValor(valor) {

  // Exibe arrays como lista HTML
  if (Array.isArray(valor)) {
    return `
      <ul class="lista-filmes">
        ${valor.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    `;
  }

  if (typeof valor === "object" && valor !== null) {
    return JSON.stringify(valor);
  }

  return valor;
}