const resultado = document.getElementById("resultado");

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
        <span class="badge">
          ${filme.generos ? filme.generos.join(", ") : "Sem gênero"}
        </span>
      </div>
    `;
  });
}

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

function formatarChave(chave) {
  return chave
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letra) => letra.toUpperCase());
}

function formatarValor(valor) {
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