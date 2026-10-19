import '@fontsource/titillium-web/300.css';
import '@fontsource/titillium-web/400.css';
import '@fontsource/titillium-web/600.css';
import '@fontsource/titillium-web/700.css';
import './style.css';

// Mobile nav + active link
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
});
nav?.querySelectorAll('a').forEach((a) => {
  if (a.getAttribute('href') === location.pathname) a.setAttribute('aria-current', 'page');
});
const header = document.querySelector('.site-header');
const onScroll = () => header?.classList.toggle('is-scrolled', scrollY > 40);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Lightweight carousel (replaces Nectar slider)
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('[data-carousel]').forEach((c) => {
  const slides = [...c.querySelectorAll('.carousel__slide')];
  const dots = c.querySelector('.carousel__dots');
  let i = 0, timer;
  slides.forEach((_, n) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', `Go to slide ${n + 1}`);
    b.addEventListener('click', () => { go(n); restart(); });
    dots.append(b);
  });
  const go = (n) => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => { s.classList.toggle('is-active', k === i); s.setAttribute('aria-hidden', String(k !== i)); });
    [...dots.children].forEach((d, k) => d.classList.toggle('is-active', k === i));
  };
  const restart = () => { clearInterval(timer); if (!reduce) timer = setInterval(() => go(i + 1), 6000); };
  c.querySelector('.carousel__prev').addEventListener('click', () => { go(i - 1); restart(); });
  c.querySelector('.carousel__next').addEventListener('click', () => { go(i + 1); restart(); });
  c.addEventListener('mouseenter', () => clearInterval(timer));
  c.addEventListener('mouseleave', restart);
  go(0); restart();
});
