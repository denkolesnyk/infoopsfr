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
  // Visionneuse d'images (lightbox).
  // Les figures marquées data-lightbox (shortcode figure, zoom="true")
  // s'agrandissent dans un <dialog> par-dessus la page assombrie, avec leur
  // légende. Fermeture : clic, Échap ou bouton ×. Sans JavaScript, ou avec
  // Cmd/Ctrl-clic, le lien ouvre simplement l'image.
  var links = document.querySelectorAll('a[data-lightbox]');
  if (links.length && window.HTMLDialogElement) {
    var dlg = document.createElement('dialog');
    dlg.className = 'lightbox';
    // Le focus va à la visionneuse elle-même, pas au bouton × (pas de cadre
    // de focus à l'ouverture) ; Tab mène ensuite au bouton.
    dlg.setAttribute('tabindex', '-1');
    dlg.setAttribute('autofocus', '');
    dlg.setAttribute('aria-label', 'Image agrandie');
    dlg.innerHTML =
      '<button type="button" class="lightbox_close" aria-label="Fermer">×</button>' +
      '<img class="lightbox_img" alt="" />' +
      '<p class="lightbox_caption"></p>';
    document.body.appendChild(dlg);
    var big = dlg.querySelector('.lightbox_img');
    var cap = dlg.querySelector('.lightbox_caption');
    var thumb = null;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Animation via View Transitions quand le navigateur la prend en charge.
    // Garde-fou : si la transition ne démarre pas (navigateur qui ne dessine
    // pas, onglet en arrière-plan…), la mise à jour s'exécute quand même
    // après 500 ms, sans animation. La visionneuse ne reste jamais bloquée.
    var animate = function (fn) {
      var done = false;
      var run = function () { if (!done) { done = true; fn(); } };
      var settle = new Promise(function (r) { setTimeout(function () { run(); r(); }, 500); });
      if (document.startViewTransition && !reduced) {
        try {
          var vt = document.startViewTransition(run);
          return Promise.race([vt.finished.catch(function () {}), settle]);
        } catch (e) {}
      }
      run();
      return Promise.resolve();
    };

    var open = function (a) {
      thumb = a.querySelector('img');
      var fig = a.closest('figure');
      var fc = fig && fig.querySelector('figcaption');
      cap.innerHTML = fc ? fc.innerHTML : '';
      cap.hidden = !fc;
      big.alt = thumb ? thumb.alt : '';
      big.src = a.href;
      // On attend que l'image pleine taille soit décodée pour que l'animation
      // ne parte pas d'un cadre vide, mais 600 ms au plus : sur une connexion
      // lente, la visionneuse s'ouvre et l'image arrive ensuite.
      var ready = Promise.race([
        big.decode ? big.decode().catch(function () {}) : Promise.resolve(),
        new Promise(function (r) { setTimeout(r, 600); })
      ]);
      ready.then(function () {
        if (thumb) thumb.style.viewTransitionName = 'lightbox';
        animate(function () {
          if (thumb) thumb.style.viewTransitionName = '';
          big.style.viewTransitionName = 'lightbox';
          dlg.showModal();
          dlg.focus();
          document.documentElement.classList.add('lightbox_open');
        }).then(function () { big.style.viewTransitionName = ''; });
      });
    };

    var close = function () {
      if (!dlg.open) return;
      big.style.viewTransitionName = 'lightbox';
      animate(function () {
        big.style.viewTransitionName = '';
        if (thumb) thumb.style.viewTransitionName = 'lightbox';
        dlg.close();
        document.documentElement.classList.remove('lightbox_open');
      }).then(function () {
        if (thumb) thumb.style.viewTransitionName = '';
      });
    };

    links.forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        open(a);
      });
    });

    // Clic n'importe où (sauf sur un lien de la légende) : fermer.
    dlg.addEventListener('click', function (e) {
      if (e.target.closest('.lightbox_caption a')) return;
      close();
    });
    // Échap : fermeture animée plutôt que la fermeture brute du navigateur.
    dlg.addEventListener('cancel', function (e) { e.preventDefault(); close(); });
    dlg.addEventListener('close', function () {
      document.documentElement.classList.remove('lightbox_open');
    });
  }
});
