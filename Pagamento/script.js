const cartItemsContainer = document.getElementById('cart-items');
const totalElement = document.getElementById('total');
const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

let total = 0;
cartItemsContainer.innerHTML = '';

carrinho.forEach(prod => {
  const item = document.createElement('div');
  item.classList.add('item');
  item.innerHTML = `
    <p><strong>${prod.nome}</strong> (x${prod.quantidade})</p>
    <p>R$ ${(prod.preco * prod.quantidade).toFixed(2)}</p>
  `;
  cartItemsContainer.appendChild(item);
  total += prod.preco * prod.quantidade;
});

const frete = 25;
totalElement.textContent = `R$ ${(total + frete).toFixed(2)}`;

// Alternar método de pagamento
const methods = document.querySelectorAll('.method');
const form = document.getElementById('payment-form');

methods.forEach(method => {
  method.addEventListener('click', () => {
    methods.forEach(m => m.classList.remove('active'));
    method.classList.add('active');
    const type = method.dataset.method;

    if (type === 'cartao') {
      form.innerHTML = `
        <label>Número do Cartão</label>
        <input type="text" placeholder="**** **** **** 1234">
        <label>Validade</label>
        <input type="text" placeholder="MM/AA">
        <label>CVV</label>
        <input type="text" placeholder="***">
      `;
    } else if (type === 'pix') {
      form.innerHTML = `<p>Escaneie o QR Code abaixo:</p>
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PIX-DEMO" alt="QR Code Pix">`;
    } else {
      form.innerHTML = `<p>O boleto será gerado após a confirmação.</p>`;
    }
  });
});
