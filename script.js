const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.menu-tabs button').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelector('.menu-tabs button.active').classList.remove('active');
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    document.querySelectorAll('.dish-card').forEach((card) => {
      card.style.display = filter === 'all' || card.dataset.category === filter ? '' : 'none';
    });
  });
});

const modal = document.querySelector('.order-modal');
const openModal = () => {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};
const closeModal = () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

document.querySelectorAll('.nav-reserve, .contact-section .button-dark').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    openModal();
  });
});

document.querySelector('.modal-close').addEventListener('click', closeModal);
document.querySelector('.modal-backdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

document.querySelector('.modal-card form').addEventListener('submit', (event) => {
  event.preventDefault();
  event.currentTarget.reset();
  document.querySelector('.form-success').classList.add('visible');
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.intro-grid, .stat-row, .dish-card, .story-panel, .gallery-item, .review-inner, .contact-grid').forEach((element) => {
  element.classList.add('reveal');
  revealObserver.observe(element);
});

const cart = [];
const cartDrawer = document.querySelector('.cart-drawer');
const cartBackdrop = document.querySelector('.cart-backdrop');
const cartItems = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-fab b');
const cartTotal = document.querySelector('.cart-total b');

const renderCart = () => {
  cartCount.textContent = cart.length;
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = total;
  cartItems.innerHTML = cart.length ? cart.map((item, index) => `<div class="cart-item"><span>${item.name}</span><span>$${item.price} <button data-remove="${index}" aria-label="Remove ${item.name}">×</button></span></div>`).join('') : '<p class="empty-cart">Your order is waiting to be filled.</p>';
};
const toggleCart = (open) => {
  cartDrawer.classList.toggle('open', open);
  cartBackdrop.classList.toggle('open', open);
  cartDrawer.setAttribute('aria-hidden', String(!open));
};

document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    cart.push({ name: button.dataset.name, price: Number(button.dataset.price) });
    renderCart();
    toggleCart(true);
  });
});
document.querySelector('.cart-fab').addEventListener('click', () => toggleCart(true));
document.querySelector('.cart-close').addEventListener('click', () => toggleCart(false));
cartBackdrop.addEventListener('click', () => toggleCart(false));
cartItems.addEventListener('click', (event) => {
  const removeButton = event.target.closest('[data-remove]');
  if (removeButton) {
    cart.splice(Number(removeButton.dataset.remove), 1);
    renderCart();
  }
});
document.querySelector('.checkout-button').addEventListener('click', () => {
  if (!cart.length) return;
  toggleCart(false);
  openModal();
});

document.querySelector('.theme-toggle.standalone').addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});

document.querySelector('.newsletter form').addEventListener('submit', (event) => {
  event.preventDefault();
  event.currentTarget.reset();
  document.querySelector('.newsletter-success').classList.add('visible');
});
