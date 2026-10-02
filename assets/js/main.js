'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // Theme toggle.
  // The stored choice is applied by an inline script in <head> so there is
  // no flash on load; this only wires up the control and keeps it in sync.
  var KEY = 'iof-theme';
  var root = document.documentElement;
  var toggle = document.getElementById('theme_toggle');
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  var stored = function () {
    try {
      var t = localStorage.getItem(KEY);
      return (t === 'dark' || t === 'light') ? t : null;
    } catch (e) { return null; }
  };

  var effective = function () {
    return stored() || (media && media.matches ? 'dark' : 'light');
  };

  var sync = function () {
    if (!toggle) return;
    var now = effective();
    toggle.setAttribute('data-state', now);
    toggle.setAttribute('aria-label', now === 'dark' ? TEXT.light : TEXT.dark);
    toggle.setAttribute('title', now === 'dark' ? TEXT.light : TEXT.dark);
  };

  var TEXT = {
    light: (toggle && toggle.getAttribute('data-label-light')) || 'Passer au thème clair',
    dark: (toggle && toggle.getAttribute('data-label-dark')) || 'Passer au thème sombre'
  };

  if (toggle) {
    sync();            // set the icon state before revealing the button
    toggle.hidden = false;
    toggle.addEventListener('click', function () {
      var next = effective() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      sync();
    });
  }

  // Follow the system if the reader has never chosen explicitly.
  if (media && media.addEventListener) {
    media.addEventListener('change', function () {
      if (!stored()) sync();
    });
  }

  // Back to top
  var bt = document.getElementById('back_to_top');
  if (bt) {
    var toggleBackToTop = function () {
      bt.classList.toggle('is_visible', window.scrollY > 300);
    };
    toggleBackToTop();
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    bt.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Page Soutenir : copier une adresse de portefeuille.
  document.querySelectorAll('.copy_btn').forEach(function (b) {
    b.addEventListener('click', function () {
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(b.getAttribute('data-copy')).then(function () {
        var t = b.textContent;
        b.textContent = 'Copié';
        setTimeout(function () { b.textContent = t; }, 1500);
      });
    });
  });
});
