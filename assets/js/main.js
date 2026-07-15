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
      b.classList.toggle('active', b.getAttribute('data-setlang') === lang);
    });
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }

  /* default English; remember last choice */
  var saved = 'en';
  try { saved = localStorage.getItem(KEY) || 'en'; } catch (e) {}
  applyLang(saved);

  document.addEventListener('click', function (e) {
    var setter = e.target.closest('[data-setlang]');
    if (setter) { applyLang(setter.getAttribute('data-setlang')); return; }

    var burger = e.target.closest('[data-burger]');
    if (burger) {
      document.querySelector('.nav-links').classList.toggle('open');
    } else if (!e.target.closest('.nav-links')) {
      var nl = document.querySelector('.nav-links.open');
      if (nl) nl.classList.remove('open');
    }
    if (e.target.closest('.nav-links a')) {
      document.querySelector('.nav-links').classList.remove('open');
    }
  });

  /* reveal on scroll */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
})();
