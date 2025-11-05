// Seletores
const cartItemsContainer = document.getElementById("cart-items");
const totalElement = document.getElementById("total");
const freteElement = document.getElementById("frete");
const form = document.getElementById("payment-form");
const confirmarBtn = document.getElementById("confirmar");

// Carregar carrinho do localStorage
const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// Exibir produtos
let totalProdutos = 0;
cartItemsContainer.innerHTML = "";

carrinho.forEach(prod => {
  const item = document.createElement("div");
  item.classList.add("item");

  const subtotal = prod.preco * prod.quantidade;
  item.innerHTML = `
    <p><strong>${prod.nome}</strong> (x${prod.quantidade})</p>
    <p>R$ ${subtotal.toFixed(2).replace(".", ",")}</p>
  `;
  
  cartItemsContainer.appendChild(item);
  totalProdutos += subtotal;
});

// Calcular frete
let frete = totalProdutos >= 300 ? 0 : 25;
freteElement.textContent = `R$ ${frete.toFixed(2).replace(".", ",")}`;
totalElement.textContent = `R$ ${(totalProdutos + frete).toFixed(2).replace(".", ",")}`;

// Alternar método de pagamento
const methods = document.querySelectorAll(".method");

methods.forEach(method => {
  method.addEventListener("click", () => {
    methods.forEach(m => m.classList.remove("active"));
    method.classList.add("active");
    const type = method.dataset.method;

    if (type === "cartao") {
      form.innerHTML = `
        <label>Número do Cartão</label>
        <input type="text" placeholder="**** **** **** 1234">
        <label>Validade</label>
        <input type="text" placeholder="MM/AA">
        <label>CVV</label>
        <input type="text" placeholder="***">
      `;
    } else if (type === "pix") {
      form.innerHTML = `
        <p>Escaneie o QR Code abaixo:</p>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PIX-DEMO" alt="QR Code Pix">
      `;
    }
  });
});

// Confirmar pagamento
confirmarBtn.addEventListener("click", () => {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  alert("Pagamento confirmado! 🎉 Obrigado pela compra!");
  localStorage.removeItem("carrinho");
  window.location.href = "./confirmacao.html";
});
