let carrinho = [];
const carrinhoEl = document.getElementById("carrinho");
const itensCarrinhoEl = document.getElementById("itens-carrinho");
const contadorEl = document.getElementById("contador");
const contadorLateralEl = document.getElementById("contador-lateral");

function toggleCarrinho() {
  carrinhoEl.classList.toggle("aberto");
  atualizarCarrinho();
}

function adicionarAoCarrinho(nome, preco) {
  const itemExistente = carrinho.find(item => item.nome === nome);

  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    carrinho.push({ nome, preco, quantidade: 1 });
  }

  atualizarCarrinho();
}

function removerItem(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function alterarQuantidade(index, operacao) {
  if (operacao === '+') {
    carrinho[index].quantidade += 1;
  } else if (operacao === '-' && carrinho[index].quantidade > 1) {
    carrinho[index].quantidade -= 1;
  } else if (operacao === '-' && carrinho[index].quantidade === 1) {
    removerItem(index);
    return;
  }

  atualizarCarrinho();
}

function atualizarCarrinho() {
  itensCarrinhoEl.innerHTML = "";

  let total = 0;

  if (carrinho.length === 0) {
    itensCarrinhoEl.innerHTML = "<p>Seu carrinho está vazio</p>";
  } else {
    carrinho.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("item-carrinho");

      // Nome e preço
      const span = document.createElement("span");
      span.textContent = `${item.nome} - ${item.preco}`;

      // Controles de quantidade e remover
      const controles = document.createElement("div");
      controles.classList.add("controles-quantidade");
      controles.innerHTML = `
        <button onclick="alterarQuantidade(${index}, '-')" class="quant-btn">-</button>
        <span class="quantidade">${item.quantidade}</span>
        <button onclick="alterarQuantidade(${index}, '+')" class="quant-btn">+</button>
        <button class="remover-item" onclick="removerItem(${index})" title="Remover do carrinho">🗑️</button>
      `;

      itemDiv.appendChild(span);
      itemDiv.appendChild(controles);

      itensCarrinhoEl.appendChild(itemDiv);

      // Cálculo do total
      const precoNumerico = parseFloat(item.preco.replace("R$ ", "").replace(",", "."));
      total += precoNumerico * item.quantidade;
    });

    // Exibir valor total
    const totalDiv = document.createElement("div");
    totalDiv.classList.add("total-carrinho");
    totalDiv.innerHTML = `<strong>Total:</strong> R$ ${total.toFixed(2).replace(".", ",")}`;

    itensCarrinhoEl.appendChild(totalDiv);
  }

  // Atualiza contador total de itens
  const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
  contadorLateralEl.textContent = totalItens;
}


function finalizarPedido() {
  const quantidade = parseInt(contadorLateralEl.textContent);

  if (quantidade > 0) {
    window.location.href = '../Pagamento/pagamento.html';
  } else {
    window.location.href = '../carrinho/carrinho.html';
  }
}
