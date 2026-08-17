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

/* ==========================================================================
   Menu — sticky horizontal category bar (filters to one category at a time)
   ========================================================================== */
(() => {
  const catBar = document.getElementById('menuCatBar');
  const nav = document.getElementById('menuCategoriesNav');
  const underline = document.getElementById('menuCatUnderline');
  const arrowLeft = document.getElementById('menuCatArrowLeft');
  const arrowRight = document.getElementById('menuCatArrowRight');
  const tabs = Array.from(document.querySelectorAll('.menu-cat-tab'));
  const sections = Array.from(document.querySelectorAll('.menu-category'));
  if (!catBar || !nav || tabs.length === 0) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Sticky offset: header height + this bar's own height ----
  function updateStickyOffset() {
    const header = document.getElementById('siteHeader');
    const headerH = header ? header.getBoundingClientRect().height : 0;
    document.documentElement.style.setProperty('--menu-sticky-top', `${headerH}px`);
    // The bar itself needs to sit right under the header; its own height
    // is added on top when computing where a section's content starts.
    const barH = catBar.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--menu-content-offset', `${headerH + barH}px`);
  }

  // ---- Underline follows the active tab ----
  function moveUnderline(tab) {
    underline.style.width = `${tab.offsetWidth - 24}px`;
    underline.style.transform = `translateX(${tab.offsetLeft + 12}px)`;
  }

  // ---- Only the selected category's section stays visible ----
  function showCategory(targetId) {
    sections.forEach((sec) => {
      sec.hidden = sec.id !== targetId;
    });
  }

  function setActiveTab(tab) {
    tabs.forEach((t) => t.classList.remove('menu-cat-tab-active'));
    tab.classList.add('menu-cat-tab-active');
    moveUnderline(tab);
    const navRect = nav.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();
    if (tabRect.left < navRect.left || tabRect.right > navRect.right) {
      tab.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      if (tab.classList.contains('menu-cat-tab-active')) return;
      setActiveTab(tab);
      showCategory(tab.dataset.target);
    });
  });

  // ---- Left/right arrows: show only when there's overflow that way ----
  function updateArrows() {
    const maxScroll = nav.scrollWidth - nav.clientWidth;
    arrowLeft.hidden = nav.scrollLeft <= 4;
    arrowRight.hidden = nav.scrollLeft >= maxScroll - 4;
  }
  arrowLeft.addEventListener('click', () => nav.scrollBy({ left: -nav.clientWidth * 0.6, behavior: reduceMotion ? 'auto' : 'smooth' }));
  arrowRight.addEventListener('click', () => nav.scrollBy({ left: nav.clientWidth * 0.6, behavior: reduceMotion ? 'auto' : 'smooth' }));
  nav.addEventListener('scroll', updateArrows, { passive: true });

  // ---- Vertical wheel/trackpad input scrolls the bar horizontally ----
  nav.addEventListener('wheel', (e) => {
    const maxScroll = nav.scrollWidth - nav.clientWidth;
    if (maxScroll <= 0) return;
    const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    nav.scrollLeft += delta;
    e.preventDefault();
  }, { passive: false });

  window.addEventListener('resize', () => {
    updateStickyOffset();
    updateArrows();
    const active = document.querySelector('.menu-cat-tab-active');
    if (active) moveUnderline(active);
  });

  updateStickyOffset();
  updateArrows();
  moveUnderline(tabs[0]);
  showCategory(tabs[0].dataset.target);

  // ---- Menu section stays hidden until "Menu" or "Explore Menu" is clicked ----
  const menuSection = document.getElementById('menu');
  const menuTriggers = document.querySelectorAll('a[href="#menu"]');

  function revealMenu(e) {
    if (e) e.preventDefault();
    if (menuSection.hidden) {
      menuSection.hidden = false;
      updateStickyOffset();
      updateArrows();
      moveUnderline(document.querySelector('.menu-cat-tab-active') || tabs[0]);
    }
    menuSection.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }

  menuTriggers.forEach((trigger) => trigger.addEventListener('click', revealMenu));
})();

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
  const body = group.closest('.menu-product-body');
  const priceEl = body.querySelector('.menu-product-price');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('size-btn-active'));
      btn.classList.add('size-btn-active');
      if (priceEl) {
        priceEl.textContent = `$${Number(btn.dataset.price).toFixed(2)}`;
      }
    });
  });
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
    const container = btn.closest('.menu-product-body');
    const name = btn.dataset.item;
    const activeSize = container.querySelector('.size-btn-active');
    const size = activeSize ? activeSize.dataset.size : 'Medium';
    const price = activeSize ? Number(activeSize.dataset.price) : 0;
    const qty = 1;

    const existing = cart.find((item) => item.name === name && item.size === size);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ name, size, price, qty });
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
