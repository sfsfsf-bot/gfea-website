/* GFEA site · shared interactions */
(function () {
  var KEY = 'gfea-lang';
  var LANGS = ['en', 'zh', 'es'];
  var CODE = { en: 'en', zh: 'zh-CN', es: 'es' };

  function applyLang(lang) {
    if (LANGS.indexOf(lang) === -1) lang = 'en';
    document.body.classList.remove('lang-en', 'lang-zh', 'lang-es');
    document.body.classList.add('lang-' + lang);
    document.documentElement.lang = CODE[lang];
    document.querySelectorAll('[data-setlang]').forEach(function (b) {
      var on = b.getAttribute('data-setlang') === lang;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }

  /* default English; remember last choice */
  var saved = 'en';
  try { saved = localStorage.getItem(KEY) || 'en'; } catch (e) {}
  applyLang(saved);

  function setNav(open) {
    var nl = document.querySelector('.nav-links');
    var bg = document.querySelector('[data-burger]');
    if (!nl) return;
    nl.classList.toggle('open', open);
    if (bg) bg.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  document.addEventListener('click', function (e) {
    var setter = e.target.closest('[data-setlang]');
    if (setter) { applyLang(setter.getAttribute('data-setlang')); return; }

    var burger = e.target.closest('[data-burger]');
    if (burger) {
      setNav(!document.querySelector('.nav-links').classList.contains('open'));
      return;
    }
    if (e.target.closest('.nav-links a') || !e.target.closest('.nav-links')) setNav(false);
  });

  /* close the mobile menu on Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setNav(false);
  });

  /* reveal on scroll — skip entirely if the visitor prefers reduced motion */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  }
})();
