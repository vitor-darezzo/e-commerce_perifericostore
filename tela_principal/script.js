function buscar() {
      const termo = document.querySelector('input').value;
      alert("Você pesquisou por: " + termo);
    }

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
  carrinho.push({ nome, preco });
  atualizarCarrinho();
}

function atualizarCarrinho() {
  contadorEl.textContent = carrinho.length;
  contadorLateralEl.textContent = carrinho.length;

  if (carrinho.length === 0) {
    itensCarrinhoEl.innerHTML = "<p>Seu carrinho está vazio</p>";
    return;
  }

  itensCarrinhoEl.innerHTML = "";
  carrinho.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${item.nome}</strong><br>
      <span>${item.preco}</span>
    `;
    itensCarrinhoEl.appendChild(div);
  });
}

  function finalizarPedido() {
    const contador = document.getElementById("contador-lateral");
    const quantidade = parseInt(contador.textContent);

    if (quantidade > 0) {
      // Vai para a página de finalização normal
      window.location.href = '../cartão/cartao.html';
    } else {
      // Vai para uma outra página (ex: aviso de carrinho vazio)
      window.location.href = '../carrinho/carrinho.html';
    }
  }
