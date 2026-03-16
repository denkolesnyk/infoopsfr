'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // back-to-top
  var bt = document.getElementById('back_to_top');
  if (bt && document.documentElement.clientWidth > 480) {
    window.addEventListener('scroll', function () {
      bt.style.display = (window.scrollY > 30) ? 'block' : 'none';
    });
    bt.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // nav-toggle
  var icon = document.getElementById('menu_icon');
  var nav = document.getElementById('site_nav');
  if (icon && nav) {
    icon.addEventListener('click', function () {
      if (nav.style.display === 'none' || nav.style.display === '') {
        nav.style.display = 'block';
      } else {
        nav.style.display = 'none';
      }
    });
  }
});

// FancyBox (still depends on fancybox.min.js)
document.addEventListener('DOMContentLoaded', function () {
  if (typeof Fancybox !== 'undefined') {
    Fancybox.bind('[data-fancybox="gallery"]', {
      arrows: false,
      infobar: false,
      Toolbar: false,
      clickContent: 'close',
      autoFocus: false,
      backFocus: false,
      wheel: false,
    });
  } else if (typeof jQuery !== 'undefined' && jQuery.fn.fancybox) {
    // legacy fallback for old fancybox
    jQuery('[data-fancybox="gallery"]').fancybox({
      arrows: false,
      infobar: false,
      buttons: [],
      clickContent: 'close',
      autoFocus: false,
      backFocus: false,
      wheel: false,
    });
  }
});
