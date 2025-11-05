let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const carrinhoEl = document.getElementById("carrinho");
const itensCarrinhoEl = document.getElementById("itens-carrinho");
const contadorLateralEl = document.getElementById("contador-lateral");

// === Mostrar ou ocultar o carrinho lateral ===
function toggleCarrinho() {
  carrinhoEl.classList.toggle("aberto");
  atualizarCarrinho();
}

// === Adicionar produto ao carrinho ===
function adicionarAoCarrinho(nome, preco) {
  const precoNum = parseFloat(preco.replace("R$", "").replace(",", "."));
  const existente = carrinho.find(p => p.nome === nome);

  if (existente) {
    existente.quantidade++;
  } else {
    carrinho.push({ nome, preco: precoNum, quantidade: 1 });
  }

  salvarCarrinho();
  atualizarCarrinho();
}

// === Remover produto completamente ===
function removerItem(nome) {
  carrinho = carrinho.filter(p => p.nome !== nome);
  salvarCarrinho();
  atualizarCarrinho();
}

// === Alterar quantidade (incrementar/decrementar) ===
function alterarQuantidade(nome, delta) {
  const produto = carrinho.find(p => p.nome === nome);
  if (!produto) return;

  produto.quantidade += delta;
  if (produto.quantidade <= 0) {
    removerItem(nome);
  } else {
    salvarCarrinho();
    atualizarCarrinho();
  }
}

// === Salva carrinho no localStorage ===
function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// === Atualiza o carrinho lateral ===
function atualizarCarrinho() {
  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  contadorLateralEl.textContent = totalItens;

  if (carrinho.length === 0) {
    itensCarrinhoEl.innerHTML = "<p>Seu carrinho está vazio</p>";
    return;
  }

  let total = 0;

  itensCarrinhoEl.innerHTML = carrinho
    .map(item => {
      const subtotal = item.preco * item.quantidade;
      total += subtotal;
      return `
        <div class="item" style="border-bottom:1px solid #333; padding:10px 0;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong>${item.nome}</strong><br>
              <div style="display:flex; align-items:center; gap:6px; margin:5px 0;">
                <button onclick="alterarQuantidade('${item.nome}', -1)" style="background:#222; color:#fff; border:none; padding:2px 8px; border-radius:4px; cursor:pointer;">−</button>
                <span>${item.quantidade}</span>
                <button onclick="alterarQuantidade('${item.nome}', 1)" style="background:#222; color:#fff; border:none; padding:2px 8px; border-radius:4px; cursor:pointer;">+</button>
              </div>
              <span>Preço: R$ ${item.preco.toFixed(2).replace(".", ",")}</span><br>
              <span>Subtotal: R$ ${subtotal.toFixed(2).replace(".", ",")}</span>
            </div>
            <button onclick="removerItem('${item.nome}')" style="background:none; border:none; color:#f55; font-size:18px; cursor:pointer;">🗑️</button>
          </div>
        </div>
      `;
    })
    .join("");

  // Mostra o total geral
  itensCarrinhoEl.innerHTML += `
    <div style="margin-top:10px; text-align:right; font-weight:bold;">
      Total: R$ ${total.toFixed(2).replace(".", ",")}
    </div>
  `;
}

// === Finalizar pedido ===
function finalizarPedido() {
  if (carrinho.length > 0) {
    salvarCarrinho();
    window.location.href = "../Pagamento/pagamento.html";
  } else {
    alert("Seu carrinho está vazio!");
  }
}

// === Atualiza o carrinho ao abrir a página ===
window.onload = atualizarCarrinho;
