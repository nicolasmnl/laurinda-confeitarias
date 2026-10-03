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
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  /* ---------- Vídeo ---------- */
  const video = $('[data-video]');
  const videoBtn = $('[data-video-toggle]');
  if (video && videoBtn) {
    const media = video.closest('.media');
    let userPaused = reducedMotion;

    const sync = () => {
      const playing = !video.paused;
      videoBtn.classList.toggle('is-playing', playing);
      videoBtn.setAttribute('aria-label', playing ? 'Pausar vídeo' : 'Reproduzir vídeo');
    };
    const fail = () => media.classList.add('is-missing');
    const play = () => video.play().catch(() => {
      if (video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) fail();
    });

    video.addEventListener('play', sync);
    video.addEventListener('pause', sync);
    video.addEventListener('playing', () => media.classList.add('is-loaded'));
    video.querySelector('source')?.addEventListener('error', fail);

    videoBtn.addEventListener('click', () => {
      if (video.paused) { userPaused = false; play(); }
      else { userPaused = true; video.pause(); }
    });

    new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !userPaused) play();
      else if (!e.isIntersecting) video.pause();
    }, { threshold: 0.35 }).observe(video);
  }
})();
