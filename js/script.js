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
   Home — header overlays the hero, then turns solid past it
   ========================================================================== */
(() => {
  const header = document.getElementById('siteHeader');
  const hero = document.querySelector('.hero');
  if (!header || !hero || !document.body.classList.contains('has-hero')) return;

  const sync = () => {
    // Solid from the moment the header would clear the hero, so the nav never
    // sits white-on-cream.
    const past = window.scrollY > hero.offsetHeight - header.offsetHeight;
    header.classList.toggle('is-solid', past);
  };

  sync();
  window.addEventListener('scroll', sync, { passive: true });
  window.addEventListener('resize', sync);
})();

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
})();

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

/* ==========================================================================
   Pickup list

   Deliberately not a checkout. 17 of the 18 products are marked "In-store only"
   or "Ask in-store" on the menu, so no price exists to total — the old cart
   summed the missing ones to "$0.00" and presented that as an order value.
   This builds a list of names and quantities, hands it to WhatsApp, and lets
   the shop quote it. No figure is ever shown.
   ========================================================================== */
const cartToggle = document.getElementById('cartToggle');
const cartPanel = document.getElementById('cartPanel');
const cartBadge = document.getElementById('cartBadge');
const cartItemsEl = document.getElementById('cartItems');
const cartEmptyEl = document.getElementById('cartEmpty');
const cartNoteEl = document.getElementById('cartNote');
const cartCheckoutBtn = document.getElementById('cartCheckout');
const cartStatusEl = document.getElementById('cartStatus');

const CART_KEY = 'frostyHavenCart';
const WHATSAPP_NUMBER = '64211523246';
const MAX_QTY = 20;

/* Safari's private mode throws on both read and write, and the stored value is
   user-editable. Either would take down every listener below it in this file —
   the size buttons, the nav toggle, the page fade — so neither is trusted. */
function readCart() {
  let raw;
  try {
    raw = localStorage.getItem(CART_KEY);
  } catch {
    return [];
  }
  if (!raw) return [];

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];

  // Entries saved before this rewrite carry a `price`; it is dropped on read.
  return parsed
    .filter((item) => item && typeof item.name === 'string' && item.name)
    .map((item) => ({
      name: item.name.slice(0, 80),
      size: typeof item.size === 'string' ? item.size.slice(0, 40) : '',
      qty: Math.min(MAX_QTY, Math.max(1, Math.floor(Number(item.qty)) || 1)),
    }));
}

function saveCart() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    // Quota or private mode. The list still works for this visit.
  }
}

let cart = readCart();

function itemLabel(item) {
  return item.size ? `${item.name} (${item.size})` : item.name;
}

function renderCart() {
  cartItemsEl.replaceChildren();
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const isEmpty = cart.length === 0;

  cartBadge.hidden = isEmpty;
  cartEmptyEl.hidden = !isEmpty;
  cartNoteEl.hidden = isEmpty;
  cartCheckoutBtn.hidden = isEmpty;

  if (isEmpty) {
    cartStatusEl.textContent = 'Your pickup list is empty.';
    return;
  }

  cartBadge.textContent = String(totalCount);
  cartStatusEl.textContent =
    totalCount === 1 ? '1 item on your pickup list.' : `${totalCount} items on your pickup list.`;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'cart-item';

    const info = document.createElement('div');
    info.className = 'cart-item-info';

    // textContent throughout: the names come back from localStorage, which the
    // visitor can edit, so nothing here is ever parsed as markup.
    const name = document.createElement('strong');
    name.textContent = item.name;
    info.appendChild(name);

    if (item.size) {
      const size = document.createElement('span');
      size.textContent = item.size;
      info.appendChild(size);
    }

    const qtyWrap = document.createElement('div');
    qtyWrap.className = 'cart-item-qty';

    const minus = document.createElement('button');
    minus.type = 'button';
    minus.className = 'qty-btn';
    minus.textContent = '−';
    minus.setAttribute('aria-label', `Remove one ${itemLabel(item)}`);
    minus.addEventListener('click', (e) => {
      e.stopPropagation();
      if (item.qty <= 1) cart.splice(index, 1);
      else item.qty -= 1;
      saveCart();
      renderCart();
    });

    const count = document.createElement('span');
    count.textContent = String(item.qty);

    const plus = document.createElement('button');
    plus.type = 'button';
    plus.className = 'qty-btn';
    plus.textContent = '+';
    plus.setAttribute('aria-label', `Add another ${itemLabel(item)}`);
    plus.disabled = item.qty >= MAX_QTY;
    plus.addEventListener('click', (e) => {
      e.stopPropagation();
      if (item.qty >= MAX_QTY) return;
      item.qty += 1;
      saveCart();
      renderCart();
    });

    qtyWrap.append(minus, count, plus);
    info.appendChild(qtyWrap);

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'cart-item-remove';
    remove.textContent = '×';
    remove.setAttribute('aria-label', `Remove ${itemLabel(item)} from your list`);
    remove.addEventListener('click', (e) => {
      e.stopPropagation();
      cart.splice(index, 1);
      saveCart();
      renderCart();
    });

    li.append(info, remove);
    cartItemsEl.appendChild(li);
  });

  updateWhatsAppLink();
}

function updateWhatsAppLink() {
  const message = [
    "Hi Frosty Haven! I'd like to order for pickup:",
    '',
    ...cart.map((item) => `- ${itemLabel(item)} x${item.qty}`),
    '',
    'Could you confirm the total? Thanks!',
  ].join('\n');
  cartCheckoutBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function openCart() {
  cartPanel.hidden = false;
  cartToggle.setAttribute('aria-expanded', 'true');
}

function closeCart({ returnFocus = false } = {}) {
  if (cartPanel.hidden) return;
  cartPanel.hidden = true;
  cartToggle.setAttribute('aria-expanded', 'false');
  if (returnFocus) cartToggle.focus();
}

document.querySelectorAll('.add-to-cart-btn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const container = btn.closest('.menu-product-body');
    const name = btn.dataset.item;
    const activeSize = container ? container.querySelector('.size-btn-active') : null;
    const size = activeSize ? activeSize.dataset.size : '';

    const existing = cart.find((item) => item.name === name && item.size === size);
    if (existing) {
      // Rapid repeat taps stop at the cap rather than climbing forever.
      existing.qty = Math.min(MAX_QTY, existing.qty + 1);
    } else {
      cart.push({ name, size, qty: 1 });
    }

    saveCart();
    renderCart();
    openCart();
  });
});

// The menu's category filter hides every section but the active one, so the
// empty state activates the tab rather than scrolling to something hidden.
document.querySelectorAll('[data-cat-target]').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const tab = document.querySelector(`.menu-cat-tab[data-target="${btn.dataset.catTarget}"]`);
    closeCart();
    if (!tab) return;
    tab.click();
    tab.scrollIntoView({ block: 'nearest' });
  });
});

cartToggle.addEventListener('click', () => {
  if (cartToggle.getAttribute('aria-expanded') === 'true') closeCart();
  else openCart();
});

document.addEventListener('click', (e) => {
  if (!cartPanel.contains(e.target) && !cartToggle.contains(e.target)) closeCart();
});

// Escape closes whichever is open and hands focus back to the control that
// opened it, so a mis-tap is never a dead end.
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (!cartPanel.hidden) {
    closeCart({ returnFocus: true });
  } else if (mainNav.classList.contains('nav-open')) {
    mainNav.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.focus();
  }
});

renderCart();
