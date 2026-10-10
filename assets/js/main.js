/* =========================================================
   Laurinda Confeitaria — scripts
   ========================================================= */

const CONFIG = {
  WHATSAPP_NUMBER: '5511976916652',
  WHATSAPP_MESSAGE: 'Vim pelo site! Pode me explicar mais como funcionam os orçamentos?',
};

(() => {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ---------- Links de WhatsApp ---------- */
  const waUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(CONFIG.WHATSAPP_MESSAGE)}`;
  $$('[data-whatsapp]').forEach((a) => { a.href = waUrl; });

  /* ---------- Ano no copyright ---------- */
  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  /* ---------- Placeholders de imagem ---------- */
  const markMissing = (el) => el.closest('.media')?.classList.add('is-missing');
  $$('.media img').forEach((img) => {
    const media = img.closest('.media');
    if (img.complete) {
      img.naturalWidth ? media.classList.add('is-loaded') : markMissing(img);
    }
    img.addEventListener('load', () => media.classList.add('is-loaded'));
    img.addEventListener('error', () => markMissing(img));
  });

  /* ---------- Header + WhatsApp flutuante ---------- */
  const header = $('[data-header]');
  const waFloat = $('[data-wa-float]');
  let nearEnd = false;

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 24);
    waFloat?.classList.toggle('is-visible', y > window.innerHeight * 0.6 && !nearEnd);
  };

  if ('IntersectionObserver' in window && waFloat) {
    const endTargets = $$('[data-final-cta], [data-footer]');
    const visible = new Set();
    const endObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      nearEnd = visible.size > 0;
      onScroll();
    });
    endTargets.forEach((t) => endObserver.observe(t));
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  const toggle = $('[data-menu-toggle]');
  const menu = $('[data-menu]');
  const outside = [$('main'), $('footer'), waFloat].filter(Boolean);

  const setMenu = (open, { restoreFocus = true } = {}) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menu.classList.toggle('is-open', open);
    menu.inert = !open;
    outside.forEach((el) => { el.inert = open; });
    document.documentElement.classList.toggle('menu-open', open);
    if (open) $('a', menu)?.focus({ preventScroll: true });
    else if (restoreFocus) toggle.focus({ preventScroll: true });
  };

  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false, { restoreFocus: false })));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false);
  });
  window.matchMedia('(min-width: 960px)').addEventListener('change', (e) => {
    if (e.matches && menu.classList.contains('is-open')) setMenu(false, { restoreFocus: false });
  });

  /* ---------- Galeria: filtros ---------- */
  const galleryItems = $$('[data-gallery] .gallery-item');
  const filters = $$('[data-filter]');
  filters.forEach((btn) => btn.addEventListener('click', () => {
    const cat = btn.dataset.filter;
    filters.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    galleryItems.forEach((item) => {
      item.hidden = cat !== 'todas' && item.dataset.category !== cat;
    });
  }));

  /* ---------- Galeria: foto ampliada ---------- */
  const lightbox = $('[data-lightbox]');
  if (lightbox && typeof lightbox.showModal === 'function') {
    const lbImg = $('[data-lightbox-img]', lightbox);
    const lbCaption = $('[data-lightbox-caption]', lightbox);
    const prevBtn = $('[data-lightbox-prev]', lightbox);
    const nextBtn = $('[data-lightbox-next]', lightbox);
    let list = [];
    let index = 0;

    const show = (i) => {
      index = (i + list.length) % list.length;
      const item = list[index];
      const img = $('img', item);
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt;
      lbCaption.textContent = $('figcaption', item)?.textContent ?? '';
    };

    galleryItems.forEach((item) => {
      $('[data-gallery-open]', item).addEventListener('click', (e) => {
        e.preventDefault();
        list = galleryItems.filter((el) => !el.hidden);
        prevBtn.hidden = nextBtn.hidden = list.length < 2;
        show(list.indexOf(item));
        lightbox.showModal();
      });
    });

    prevBtn.addEventListener('click', () => show(index - 1));
    nextBtn.addEventListener('click', () => show(index + 1));
    $('[data-lightbox-close]', lightbox).addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.close();
    });
    lightbox.addEventListener('keydown', (e) => {
      if (list.length < 2) return;
      if (e.key === 'ArrowLeft') show(index - 1);
      else if (e.key === 'ArrowRight') show(index + 1);
    });
  }

  if (!('IntersectionObserver' in window)) {
    $$('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
    return;
  }

  /* ---------- Reveal ao rolar ---------- */
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-visible');
      obs.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  $$('[data-reveal]').forEach((el) => revealObserver.observe(el));

  /* ---------- Link ativo na navegação ---------- */
  const navLinks = $$('[data-nav]');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((a) => {
        if (a.hash === `#${e.target.id}`) a.setAttribute('aria-current', 'location');
        else a.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  navLinks.forEach((a) => { const s = $(a.hash); if (s) navObserver.observe(s); });
})();
