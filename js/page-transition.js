/* ==========================================================================
   Smooth fade transition between pages (Menu <-> Home)
   ========================================================================== */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  requestAnimationFrame(() => {
    document.body.classList.remove('is-loading');
  });

  if (reduceMotion) return;

  const FADE_MS = 200;

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (link.target === '_blank' || link.hasAttribute('download')) return;

    const href = link.getAttribute('href');
    if (!href || !href.startsWith('/')) return;

    e.preventDefault();
    document.body.classList.add('is-transitioning');
    setTimeout(() => {
      window.location.href = href;
    }, FADE_MS);
  });
})();
