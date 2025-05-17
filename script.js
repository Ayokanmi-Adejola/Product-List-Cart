// Product data
const products = [
  {
    id: 1,
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.50,
    image: "./assets/images/image-waffle-desktop.jpg"
  },
  {
    id: 2,
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7.00,
    image: "./assets/images/image-creme-brulee-desktop.jpg"
  },
  {
    id: 3,
    name: "Macaron Mix of Five",
    category: "Macaron",
    price: 8.00,
    image: "./assets/images/image-macaron-desktop.jpg"
  },
  {
    id: 4,
    name: "Classic Tiramisu",
    category: "Tiramisu",
    price: 5.50,
    image: "./assets/images/image-tiramisu-desktop.jpg"
  },
  {
    id: 5,
    name: "Pistachio Baklava",
    category: "Baklava",
    price: 4.00,
    image: "./assets/images/image-baklava-desktop.jpg"
  },
  {
    id: 6,
    name: "Lemon Meringue Pie",
    category: "Pie",
    price: 5.00,
    image: "./assets/images/image-meringue-desktop.jpg"
  },
  {
    id: 7,
    name: "Red Velvet Cake",
    category: "Cake",
    price: 4.50,
    image: "./assets/images/image-cake-desktop.jpg"
  },
  {
    id: 8,
    name: "Salted Caramel Brownie",
    category: "Brownie",
    price: 4.50,
    image: "./assets/images/image-brownie-desktop.jpg"
  },
  {
    id: 9,
    name: "Vanilla Panna Cotta",
    category: "Panna Cotta",
    price: 6.50,
    image: "./assets/images/image-panna-cotta-desktop.jpg"
  }
];

// Cart state
let cart = [];

// DOM elements
const productListEl = document.querySelector('.product-list');
const cartItemsEl = document.getElementById('cart-items');
const cartQuantityEl = document.getElementById('cart-quantity');
const emptyCartMessageEl = document.getElementById('empty-cart-message');
const confirmOrderBtn = document.getElementById('confirm-order');
const newOrderBtn = document.getElementById('new-order');
const modal = document.getElementById('confirmation-modal');
const closeModalBtn = document.getElementById('close-modal');

// Initialize the app
function init() {
  renderProducts();
  setupEventListeners();
}

// Render products to the DOM
function renderProducts() {
  productListEl.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-category">${product.category}</p>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
      </div>
    </div>
  `).join('');
}

// Set up event listeners
function setupEventListeners() {
  // Add to cart buttons
  productListEl.addEventListener('click', e => {
    if (e.target.classList.contains('add-to-cart')) {
      const productId = parseInt(e.target.dataset.id);
      addToCart(productId);
    }
  });

  // Cart item quantity buttons
  cartItemsEl.addEventListener('click', e => {
    if (e.target.classList.contains('increase')) {
      const productId = parseInt(e.target.dataset.id);
      increaseQuantity(productId);
    } else if (e.target.classList.contains('decrease')) {
      const productId = parseInt(e.target.dataset.id);
      decreaseQuantity(productId);
    }
  });

  // Confirm order button
  confirmOrderBtn.addEventListener('click', confirmOrder);

  // New order button
  newOrderBtn.addEventListener('click', startNewOrder);

  // Close modal button
  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Close modal when clicking outside
  window.addEventListener('click', e => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// Add product to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);

  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    });
  }

  updateCart();
}

// Increase item quantity
function increaseQuantity(productId) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity++;
    updateCart();
  }
}

// Decrease item quantity
function decreaseQuantity(productId) {
  const itemIndex = cart.findIndex(item => item.id === productId);

  if (itemIndex !== -1) {
    if (cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity--;
    } else {
      cart.splice(itemIndex, 1);
    }
    updateCart();
  }
}

// Update cart UI
function updateCart() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartQuantityEl.textContent = totalItems;

  if (cart.length === 0) {
    emptyCartMessageEl.style.display = 'block';
    cartItemsEl.innerHTML = '';
    confirmOrderBtn.disabled = true;
    newOrderBtn.disabled = true;
  } else {
    emptyCartMessageEl.style.display = 'none';

    cartItemsEl.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-info">
          <h4 class="cart-item-title">${item.name}</h4>
          <p class="cart-item-price">$${item.price.toFixed(2)} each</p>
        </div>
        <div class="cart-item-quantity">
          <button class="quantity-btn decrease" data-id="${item.id}">-</button>
          <span class="quantity-value">${item.quantity}</span>
          <button class="quantity-btn increase" data-id="${item.id}">+</button>
        </div>
      </div>
    `).join('');

    confirmOrderBtn.disabled = false;
    newOrderBtn.disabled = false;
  }
}

// Confirm order
function confirmOrder() {
  if (cart.length > 0) {
    modal.style.display = 'flex';
  }
}

// Start new order
function startNewOrder() {
  cart = [];
  updateCart();
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);