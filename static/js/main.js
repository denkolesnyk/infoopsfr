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

  // Mobile nav toggle.
  // Toggles a class rather than an inline style, so the menu cannot stay
  // stuck closed when the viewport widens back to desktop.
  var icon = document.getElementById('menu_icon');
  var nav = document.getElementById('site_nav');
  if (icon && nav) {
    icon.addEventListener('click', function () {
      var open = nav.classList.toggle('is_open');
      icon.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is_open');
        icon.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Wrap wide tables so they scroll inside their own box instead of
  // pushing the whole page sideways on narrow screens.
  document.querySelectorAll('.post_content table').forEach(function (t) {
    if (t.parentElement && t.parentElement.classList.contains('table_wrap')) return;
    var wrap = document.createElement('div');
    wrap.className = 'table_wrap';
    wrap.setAttribute('tabindex', '0');
    wrap.setAttribute('role', 'region');
    wrap.setAttribute('aria-label', 'Tableau de données (défilement horizontal)');
    t.parentNode.insertBefore(wrap, t);
    wrap.appendChild(t);
  });
});
