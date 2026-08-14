const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  mainNav.classList.toggle('nav-open');
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const menuCatPills = document.querySelectorAll('.menu-cat-pill');
const menuCategories = document.querySelectorAll('.menu-category');

menuCatPills.forEach((pill) => {
  pill.addEventListener('click', () => {
    const target = pill.dataset.target;

    menuCatPills.forEach((p) => p.classList.remove('menu-cat-pill-active'));
    pill.classList.add('menu-cat-pill-active');

    menuCategories.forEach((cat) => {
      cat.hidden = target !== 'all' && cat.id !== target;
    });

    if (target !== 'all') {
      document.getElementById(target).scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const tiltPhoto = document.querySelector('.gallery-photo');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (tiltPhoto && !reduceMotion) {
  const maxTilt = 10;

  tiltPhoto.addEventListener('mousemove', (e) => {
    const rect = tiltPhoto.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - y) * maxTilt * 2;
    tiltPhoto.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  });

  tiltPhoto.addEventListener('mouseleave', () => {
    tiltPhoto.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
}

document.querySelectorAll('.size-options').forEach((group) => {
  const buttons = group.querySelectorAll('.size-btn');
  const copy = group.closest('.menu-feature-copy');
  const priceEl = copy.querySelector('.menu-feature-price');
  const qtyValueEl = copy.querySelector('.qty-value');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('size-btn-active'));
      btn.classList.add('size-btn-active');
      if (priceEl) {
        priceEl.textContent = `$${Number(btn.dataset.price).toFixed(2)}`;
      }
      if (qtyValueEl) {
        qtyValueEl.textContent = '1';
        qtyValueEl.dataset.qty = '1';
      }
    });
  });
});

document.querySelectorAll('.qty-stepper').forEach((stepper) => {
  const valueEl = stepper.querySelector('.qty-value');
  const minusBtn = stepper.querySelector('.qty-minus');
  const plusBtn = stepper.querySelector('.qty-plus');

  const setQty = (n) => {
    const qty = Math.max(1, n);
    valueEl.textContent = String(qty);
    valueEl.dataset.qty = String(qty);
  };

  minusBtn.addEventListener('click', () => setQty(Number(valueEl.dataset.qty) - 1));
  plusBtn.addEventListener('click', () => setQty(Number(valueEl.dataset.qty) + 1));
});

const cartToggle = document.getElementById('cartToggle');
const cartPanel = document.getElementById('cartPanel');
const cartBadge = document.getElementById('cartBadge');
const cartItemsEl = document.getElementById('cartItems');
const cartEmptyEl = document.getElementById('cartEmpty');
const cartCheckoutBtn = document.getElementById('cartCheckout');
const cartTotalEl = document.getElementById('cartTotal');
const cartTotalAmountEl = document.getElementById('cartTotalAmount');

let cart = JSON.parse(localStorage.getItem('frostyHavenCart') || '[]');

function saveCart() {
  localStorage.setItem('frostyHavenCart', JSON.stringify(cart));
}

function renderCart() {
  cartItemsEl.innerHTML = '';
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);

  if (cart.length === 0) {
    cartBadge.hidden = true;
    cartEmptyEl.hidden = false;
    cartCheckoutBtn.hidden = true;
    cartTotalEl.hidden = true;
  } else {
    cartBadge.hidden = false;
    cartBadge.textContent = String(totalCount);
    cartEmptyEl.hidden = true;
    cartCheckoutBtn.hidden = false;
    cartTotalEl.hidden = false;

    let total = 0;
    cart.forEach((item, index) => {
      const price = item.price || 0;
      const qty = item.qty || 1;
      total += price * qty;
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
        <div class="cart-item-info">
          <strong>${item.name}</strong>
          <span>${item.size} · $${price.toFixed(2)} each</span>
          <div class="cart-item-qty">
            <button type="button" class="qty-btn cart-qty-minus" aria-label="Decrease quantity">&minus;</button>
            <span>${qty}</span>
            <button type="button" class="qty-btn cart-qty-plus" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button type="button" class="cart-item-remove" aria-label="Remove ${item.name}">&times;</button>
      `;
      li.querySelector('.cart-qty-minus').addEventListener('click', (e) => {
        e.stopPropagation();
        if (item.qty <= 1) {
          cart.splice(index, 1);
        } else {
          item.qty -= 1;
        }
        saveCart();
        renderCart();
      });
      li.querySelector('.cart-qty-plus').addEventListener('click', (e) => {
        e.stopPropagation();
        item.qty += 1;
        saveCart();
        renderCart();
      });
      li.querySelector('.cart-item-remove').addEventListener('click', (e) => {
        e.stopPropagation();
        cart.splice(index, 1);
        saveCart();
        renderCart();
      });
      cartItemsEl.appendChild(li);
    });
    cartTotalAmountEl.textContent = `$${total.toFixed(2)}`;
    updateWhatsAppLink(total);
  }
}

const WHATSAPP_NUMBER = '64211523246';

function updateWhatsAppLink(total) {
  const lines = cart.map((item) => {
    const qty = item.qty || 1;
    const lineTotal = (item.price || 0) * qty;
    return `- ${item.name} (${item.size}) x${qty} — $${lineTotal.toFixed(2)}`;
  });
  const message = [
    'Hi Frosty Haven! I\'d like to order:',
    '',
    ...lines,
    '',
    `Total: $${total.toFixed(2)}`,
  ].join('\n');
  cartCheckoutBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll('.add-to-cart-btn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const container = btn.closest('.menu-feature-copy');
    const name = btn.dataset.item;
    const activeSize = container.querySelector('.size-btn-active');
    const size = activeSize ? activeSize.dataset.size : 'Medium';
    const price = activeSize ? Number(activeSize.dataset.price) : 0;
    const qtyEl = container.querySelector('.qty-value');
    const qty = qtyEl ? Number(qtyEl.dataset.qty) : 1;

    const existing = cart.find((item) => item.name === name && item.size === size);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ name, size, price, qty });
    }

    if (qtyEl) {
      qtyEl.textContent = '1';
      qtyEl.dataset.qty = '1';
    }

    saveCart();
    renderCart();
    cartPanel.hidden = false;
    cartToggle.setAttribute('aria-expanded', 'true');
  });
});

cartToggle.addEventListener('click', () => {
  const expanded = cartToggle.getAttribute('aria-expanded') === 'true';
  cartPanel.hidden = expanded;
  cartToggle.setAttribute('aria-expanded', String(!expanded));
});

document.addEventListener('click', (e) => {
  if (!cartPanel.hidden && !cartPanel.contains(e.target) && !cartToggle.contains(e.target)) {
    cartPanel.hidden = true;
    cartToggle.setAttribute('aria-expanded', 'false');
  }
});

renderCart();
