/* ═══════════════════════════════════════════════
   LiveAgenda Module — JS Tab
   HubSpot wraps module JS in a private scope and
   may tree-shake unused declarations. Keep a
   top-level side effect so the bundle is not empty.
═══════════════════════════════════════════════ */

(function () {
  function laShowDay(root, day, btn) {
    root.querySelectorAll('.la-day-tab').forEach(function (b) {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    if (btn) {
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
    }

    var panels = root.querySelectorAll('.la-day-panel');

    if (day === 'all') {
      panels.forEach(function (p, i) {
        p.classList.add('active');
        if (i === 0) {
          p.classList.remove('la-day-panel--stacked');
        } else {
          p.classList.add('la-day-panel--stacked');
        }
      });
    } else {
      panels.forEach(function (p) {
        p.classList.remove('active');
        p.classList.remove('la-day-panel--stacked');
      });
      var target = root.querySelector('.la-day-panel[data-day="' + day + '"]');
      if (target) target.classList.add('active');
    }

    var tabs = root.querySelector('.la-day-tabs');
    if (tabs && tabs.scrollIntoView) {
      tabs.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }

  function laInit() {
    document.querySelectorAll('.live26-agenda').forEach(function (root) {
      if (root.getAttribute('data-la-ready') === 'true') return;
      root.setAttribute('data-la-ready', 'true');

      root.querySelectorAll('.la-day-tab').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          laShowDay(root, btn.getAttribute('data-day') || 'all', btn);
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', laInit);
  } else {
    laInit();
  }
})();
