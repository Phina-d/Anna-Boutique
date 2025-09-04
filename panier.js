document.addEventListener('DOMContentLoaded', function () {
  const cartContainer = document.getElementById('cart-container');
  const cartTotal = document.getElementById('cart-total');
  let cart = JSON.parse(localStorage.getItem('cart')) || {};

  function renderCart() {
    cartContainer.innerHTML = '';
    let total = 0;

    if (Object.keys(cart).length === 0) {
      cartContainer.innerHTML = '<p>Votre panier est vide.</p>';
      cartTotal.textContent = '0';
      return;
    }

    for (let item in cart) {
      const itemData = cart[item];
      const itemTotal = itemData.price * itemData.quantity;
      total += itemTotal;

      const div = document.createElement('div');
      div.className = 'd-flex align-items-center mb-3 p-2 border rounded';
      div.innerHTML = `
        <img src="${itemData.image}" alt="${item}" style="width: 80px; height: 80px; object-fit: cover; margin-right: 15px;">
        <div style="flex-grow: 1;">
          <strong>${item}</strong><br>
          ${itemData.price} $ × 
          <button class="btn btn-sm btn-outline-secondary decrease" data-item="${item}">-</button>
          <span style="margin: 0 10px;">${itemData.quantity}</span>
          <button class="btn btn-sm btn-outline-secondary increase" data-item="${item}">+</button>
          = <strong>${itemTotal.toFixed(2)} $</strong>
        </div>
        <button class="btn btn-sm btn-danger delete d-flex align-items-center" data-item="${item}">
  <i class="fas fa-trash-alt mr-1"></i> Supprimer
</button>
      `;

      cartContainer.appendChild(div);
    }

    cartTotal.textContent = total.toFixed(2);

    // Ajout des écouteurs après création des boutons
    document.querySelectorAll('.increase').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-item');
        cart[key].quantity++;
        saveAndRender();
      });
    });

    document.querySelectorAll('.decrease').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-item');
        if (cart[key].quantity > 1) {
          cart[key].quantity--;
        } else {
          delete cart[key];
        }
        saveAndRender();
      });
    });

    document.querySelectorAll('.delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-item');
        delete cart[key];
        saveAndRender();
      });
    });
  }

  function saveAndRender() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }

  renderCart();
});
// panier.js

// Exemple : tu récupères le panier depuis le localStorage ou un objet JS global
// Pour cet exemple, on simule un panier
const cart = {
  bag1: { name: "Leather Bag", price: 50, quantity: 2 },
  bag2: { name: "Canvas Tote", price: 65, quantity: 1 }
};

function renderCart() {
  const container = document.getElementById("cart-items");
  container.innerHTML = "";

  let total = 0;

  for (const id in cart) {
    const item = cart[id];
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <p><strong>${item.name}</strong></p>
      <p>Prix unitaire : ${item.price} $</p>
      <p>Quantité : ${item.quantity}</p>
      <p>Sous-total : ${itemTotal} $</p>
      <hr>
    `;
    container.appendChild(div);
  }

  document.getElementById("cart-total").textContent = `Total : ${total} $`;
}

renderCart();
