// ===== Sticky nav shadow =====
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 10);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ===== Mobile nav =====
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('is-open');
  toggle.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
});
links.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    links.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  })
);

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('is-visible'), i * 70);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

// ===== Menu tabs =====
const tabs = document.querySelectorAll('.menu__tab');
const panels = document.querySelectorAll('.menu__panel');
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.classList.remove('is-active'));
    panels.forEach((p) => p.classList.remove('is-active'));
    tab.classList.add('is-active');
    const target = document.querySelector(`[data-panel="${tab.dataset.tab}"]`);
    if (target) target.classList.add('is-active');
  });
});

// ===== Reservation form (demo) =====
const form = document.getElementById('reserveForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  note.hidden = false;
  form.querySelector('button[type="submit"]').textContent = 'Reservation Requested ✓';
});

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();
