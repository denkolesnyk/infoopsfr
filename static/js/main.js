'use strict';

document.addEventListener('DOMContentLoaded', function () {
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
