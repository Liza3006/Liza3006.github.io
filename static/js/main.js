// ------ Мобильное меню ------
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
if (burger && nav) {
  burger.addEventListener('click', () => nav.classList.toggle('is-open'));
  document.querySelectorAll('.nav-link').forEach(l =>
    l.addEventListener('click', () => nav.classList.remove('is-open')));
}

// ------ Табы «Реализованные / Действующие» ------
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('is-active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('is-active'));
    btn.classList.add('is-active');
    document.getElementById('tab-' + key).classList.add('is-active');
  });
});

// ------ Форма обратной связи ------
const form = document.getElementById('feedbackForm');
if (form) {
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Отправляем...';
    status.style.color = '';

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const j = await res.json();
      if (res.ok && j.ok) {
        status.textContent = 'Спасибо! Мы свяжемся с вами в ближайшее время.';
        form.reset();
      } else {
        status.style.color = '#ff8a8a';
        status.textContent = j.error || 'Ошибка отправки';
      }
    } catch (err) {
      status.style.color = '#ff8a8a';
      status.textContent = 'Ошибка сети';
    }
  });
}

// ------ Плавное появление секций ------
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = 1;
      e.target.style.transform = 'translateY(0)';
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.section, .hero, .page-hero').forEach(s => {
  s.style.opacity = 0;
  s.style.transform = 'translateY(18px)';
  s.style.transition = 'opacity .6s ease, transform .6s ease';
  io.observe(s);
});
