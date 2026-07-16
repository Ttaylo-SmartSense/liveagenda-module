/* ═══════════════════════════════════════════════
   LiveAgenda Module — JS Tab
   HubSpot wraps module JS in a private scope and
   may tree-shake unused declarations. Keep a
   top-level side effect so the bundle is not empty.
═══════════════════════════════════════════════ */

(function () {
  var LA_MOBILE_MQ = '(max-width: 700px)';

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

  function laGetMount() {
    return document.getElementById('main-content')
      || document.querySelector('.body-container-wrapper')
      || document.body;
  }

  function laEnsureMarker(root, key, beforeEl) {
    if (root[key] && root[key].parentNode) return root[key];
    var marker = document.createComment(key);
    beforeEl.parentNode.insertBefore(marker, beforeEl);
    root[key] = marker;
    return marker;
  }

  function laEnsurePortal(kind) {
    var id = 'la-portal-' + kind;
    var portal = document.getElementById(id);
    if (portal) return portal;
    portal = document.createElement('div');
    portal.id = id;
    portal.className = 'live26-agenda live26-agenda--portal live26-agenda--portal-' + kind;
    return portal;
  }

  function laRestoreBleed(root, el, markerKey) {
    var marker = root[markerKey];
    if (!el || !marker || !marker.parentNode) return;
    marker.parentNode.insertBefore(el, marker.nextSibling);
  }

  function laFindBleed(root, sel, portalId) {
    return root.querySelector(':scope > ' + sel)
      || document.querySelector('#' + portalId + ' ' + sel);
  }

  function laPortalBleed(root) {
    if (root.classList.contains('live26-agenda--portal')) return;

    var hero = laFindBleed(root, '.la-hero', 'la-portal-hero');
    var cta = laFindBleed(root, '.la-cta-band', 'la-portal-cta');
    if (!hero && !cta) return;

    var mobile = window.matchMedia(LA_MOBILE_MQ).matches;
    var mount = laGetMount();

    if (hero) {
      if (!root._laHeroMark) {
        var heroHome = root.querySelector(':scope > .la-hero') || hero;
        if (heroHome.parentNode === root) {
          laEnsureMarker(root, '_laHeroMark', heroHome);
        } else {
          // Marker was lost; recreate at top of root
          var hm = document.createComment('_laHeroMark');
          root.insertBefore(hm, root.firstChild);
          root._laHeroMark = hm;
        }
      }
      if (mobile) {
        var heroPortal = laEnsurePortal('hero');
        if (heroPortal.parentNode !== mount || mount.firstElementChild !== heroPortal) {
          mount.insertBefore(heroPortal, mount.firstChild);
        }
        if (hero.parentNode !== heroPortal) heroPortal.appendChild(hero);
      } else {
        laRestoreBleed(root, hero, '_laHeroMark');
        var hp = document.getElementById('la-portal-hero');
        if (hp && !hp.firstElementChild) hp.remove();
      }
    }

    if (cta) {
      if (!root._laCtaMark) {
        var ctaHome = root.querySelector(':scope > .la-cta-band') || cta;
        if (ctaHome.parentNode === root) {
          laEnsureMarker(root, '_laCtaMark', ctaHome);
        } else {
          var cm = document.createComment('_laCtaMark');
          root.appendChild(cm);
          root._laCtaMark = cm;
        }
      }
      if (mobile) {
        var ctaPortal = laEnsurePortal('cta');
        if (ctaPortal.parentNode !== mount) mount.appendChild(ctaPortal);
        if (cta.parentNode !== ctaPortal) ctaPortal.appendChild(cta);
      } else {
        laRestoreBleed(root, cta, '_laCtaMark');
        var cp = document.getElementById('la-portal-cta');
        if (cp && !cp.firstElementChild) cp.remove();
      }
    }
  }

  function laInitBleed(root) {
    laPortalBleed(root);
    if (root._laBleedBound) return;
    root._laBleedBound = true;

    var mq = window.matchMedia(LA_MOBILE_MQ);
    var onChange = function () { laPortalBleed(root); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
    window.addEventListener('resize', onChange);
  }

  function laInit() {
    document.querySelectorAll('.live26-agenda:not(.live26-agenda--portal)').forEach(function (root) {
      if (root.getAttribute('data-la-ready') === 'true') {
        laInitBleed(root);
        return;
      }
      root.setAttribute('data-la-ready', 'true');

      root.querySelectorAll('.la-day-tab').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          laShowDay(root, btn.getAttribute('data-day') || 'all', btn);
        });
      });

      laInitBleed(root);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', laInit);
  } else {
    laInit();
  }
})();
