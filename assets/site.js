// Sketchify Studio · small site behaviours (no dependencies)
(() => {
  // Header gets a solid background once the page scrolls
  const header = document.querySelector('.header');
  const onScroll = () => header && header.classList.toggle('is-scrolled', scrollY > 10);
  onScroll(); addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  const btn = document.querySelector('.menu-btn'), nav = document.querySelector('.nav');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open);
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('is-open'); btn.setAttribute('aria-expanded', false);
    }));
  }

  // Fade sections in as they scroll into view
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(el => io.observe(el));
  } else items.forEach(el => el.classList.add('is-in'));

  // Screenshot lightbox
  const box = document.getElementById('lightbox');
  if (box) {
    const img = box.querySelector('img');
    document.querySelectorAll('.shot').forEach(b => b.addEventListener('click', () => {
      img.src = b.dataset.full; img.alt = b.querySelector('img').alt; box.showModal();
    }));
    box.addEventListener('click', e => { if (e.target !== img) box.close(); });
  }

  // Footer year
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();
