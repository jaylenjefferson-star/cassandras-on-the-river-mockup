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
// Close mobile menu on Escape (keyboard UX)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && links.classList.contains('is-open')) {
    links.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus();
  }
});

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

// ===== Menu tabs (accessible) =====
const tabs = document.querySelectorAll('.menu__tab');
const panels = document.querySelectorAll('.menu__panel');
function activateTab(tab) {
  tabs.forEach((t) => {
    t.classList.remove('is-active');
    t.setAttribute('aria-selected', 'false');
  });
  panels.forEach((p) => p.classList.remove('is-active'));
  tab.classList.add('is-active');
  tab.setAttribute('aria-selected', 'true');
  const target = document.querySelector(`[data-panel="${tab.dataset.tab}"]`);
  if (target) target.classList.add('is-active');
}
tabs.forEach((tab, i) => {
  tab.setAttribute('aria-selected', tab.classList.contains('is-active') ? 'true' : 'false');
  tab.addEventListener('click', () => activateTab(tab));
  // Arrow-key navigation between tabs
  tab.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const dir = e.key === 'ArrowRight' ? 1 : -1;
      const next = tabs[(i + dir + tabs.length) % tabs.length];
      next.focus();
      activateTab(next);
    }
  });
});

// ===== Scroll-spy: mark active nav link (aria-current) =====
const navAnchors = [...links.querySelectorAll('a[href^="#"]')];
const sections = navAnchors
  .map((a) => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);
if ('IntersectionObserver' in window && sections.length) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navAnchors.forEach((a) =>
            a.toggleAttribute('aria-current', a.getAttribute('href') === `#${id}`)
          );
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((s) => spy.observe(s));
}

// ===== Large-party hint =====
const guests = document.getElementById('guests');
const partyHint = document.getElementById('partyHint');
if (guests && partyHint) {
  const updateHint = () => {
    partyHint.hidden = !/10/.test(guests.value);
  };
  guests.addEventListener('change', updateHint);
  updateHint();
}

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
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Reservation Requested ✓';
  btn.disabled = true;
});

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();
