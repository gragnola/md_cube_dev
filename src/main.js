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

// Contact forms -> /contact.php (JSON)
document.querySelectorAll('form[data-contact]').forEach((form) => {
  const status = form.querySelector('.form-status');
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    if (!form.checkValidity()) { status.textContent = 'Please fill in your name, a valid email and a message.'; form.reportValidity(); return; }
    const btn = form.querySelector('button[type=submit]');
    btn.disabled = true; status.textContent = 'Sending…';
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      const data = await res.json().catch(() => ({}));
      status.textContent = data.message || (res.ok ? 'Thank you, your message has been sent.' : 'Sorry, something went wrong. Please email enquiries@cubedevelopments.com.');
      if (res.ok && data.ok) form.reset();
    } catch {
      status.textContent = 'Sorry, the message could not be sent. Please email enquiries@cubedevelopments.com.';
    } finally { btn.disabled = false; }
  });
});
