document.addEventListener('DOMContentLoaded', function () {
  var hamburger = document.getElementById('navToggle') || document.querySelector('.hamburger');
  var mobileNav = document.getElementById('mobileNav');
  var header = document.querySelector('.site-header');

  function trackStickyEvent(name) {
    if (window.dataLayer && typeof window.dataLayer.push === 'function') {
      window.dataLayer.push({ event: name });
      return;
    }

    if (typeof window.gtag === 'function') {
      window.gtag('event', name);
    }
  }

  function maybeInjectSiteSticky() {
    var path = window.location.pathname;
    var excluded = [
      '/call-now.html',
      '/terms.html',
      '/privacy-policy.html',
      '/privacy.html'
    ];

    if (excluded.indexOf(path) !== -1 || document.querySelector('.sticky-cta')) {
      return;
    }

    var sticky = document.createElement('div');
    sticky.className = 'sticky-cta';
    sticky.setAttribute('role', 'navigation');
    sticky.setAttribute('aria-label', 'Quick contact');
    sticky.innerHTML =
      '<div class="sticky-cta__inner">' +
      '<a id="ctaCallSticky" class="sticky-cta__btn sticky-cta__btn--call" href="tel:+447366302341">' +
      '<span class="sticky-cta__icon" aria-hidden="true">📞</span>' +
      '<span class="sticky-cta__text">' +
      '<span class="sticky-cta__title">Call</span>' +
      '<span class="sticky-cta__sub">Recovero 24/7 roadside help</span>' +
      '</span>' +
      '</a>' +
      '<a id="ctaWhatsAppSticky" class="sticky-cta__btn sticky-cta__btn--wa" href="https://wa.me/447366302341?text=Hi%20Recovero%2C%20I%20need%20recovery.%20Location%2Fpostcode%3A%20____%20.%20Vehicle%3A%20____%20.%20Issue%3A%20____%20." target="_blank" rel="noopener">' +
      '<span class="sticky-cta__icon" aria-hidden="true">💬</span>' +
      '<span class="sticky-cta__text">' +
      '<span class="sticky-cta__title">WhatsApp</span>' +
      '<span class="sticky-cta__sub">Best if you can’t talk.</span>' +
      '</span>' +
      '</a>' +
      '</div>';

    sticky.querySelector('a[href^="tel:"]').addEventListener('click', function () {
      trackStickyEvent('click_call_sticky');
    });

    sticky.querySelector('a[href^="https://wa.me"]').addEventListener('click', function () {
      trackStickyEvent('click_whatsapp_sticky');
    });

    document.body.classList.add('has-sticky');
    document.body.appendChild(sticky);
  }

  function closeLocationsDropdown() {
    var dropdownParent = document.querySelector('.nav-dropdown');
    var trigger = document.querySelector('.nav-dropdown-trigger');

    if (!dropdownParent || !trigger) {
      return;
    }

    dropdownParent.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
  }

  var dropdownParent = document.querySelector('.nav-dropdown');
  var trigger = document.querySelector('.nav-dropdown-trigger');
  var dropdown = document.getElementById('locationsDropdown');

  if (dropdownParent && trigger && dropdown) {
    trigger.addEventListener('click', function (event) {
      event.preventDefault();
      var isOpen = dropdownParent.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', function (event) {
      if (!dropdownParent.contains(event.target)) {
        closeLocationsDropdown();
      }
    });

    window.addEventListener('scroll', function () {
      if (dropdownParent.classList.contains('is-open')) {
        closeLocationsDropdown();
      }
    });

    dropdown.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        closeLocationsDropdown();
      });
    });
  }

  maybeInjectSiteSticky();


  var faqDetails = document.querySelectorAll('.faq .faq-item');

  faqDetails.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) {
        return;
      }

      faqDetails.forEach(function (other) {
        if (other !== item) {
          other.open = false;
        }
      });
    });
  });

  var areaData = {
    portsmouth: {
      title: 'Portsmouth',
      summary: '24/7 vehicle recovery across Portsmouth, from city centre roads to the seafront.',
      roads: ['A3', 'M275', 'Southsea & Cosham'],
      href: '/locations/portsmouth-vehicle-recovery.html'
    },
    havant: {
      title: 'Havant',
      summary: 'Fast local recovery across Havant, including home, roadside, and non-runner callouts.',
      roads: ['A27', 'A3(M)', 'Emsworth & Bedhampton'],
      href: '/locations/havant-vehicle-recovery.html'
    },
    fareham: {
      title: 'Fareham',
      summary: '24/7 vehicle recovery across Fareham and nearby routes including the M27 and A27.',
      roads: ['M27', 'A27', 'Portchester & Titchfield'],
      href: '/locations/fareham-vehicle-recovery.html'
    },
    gosport: {
      title: 'Gosport',
      summary: 'Fast local recovery across Gosport and surrounding routes.',
      roads: ['A32', 'B3333', 'Lee-on-the-Solent'],
      href: '/locations/gosport-vehicle-recovery.html'
    },
    waterlooville: {
      title: 'Waterlooville',
      summary: '24/7 vehicle recovery across Waterlooville and nearby areas including Cowplain and Purbrook.',
      roads: ['A3', 'A27', 'Purbrook & Cowplain'],
      href: '/locations/waterlooville-vehicle-recovery.html'
    },
    chichester: {
      title: 'Chichester',
      summary: '24/7 vehicle recovery across Chichester and nearby A27 and A259 routes.',
      roads: ['A27', 'A259', 'Fishbourne & Bosham'],
      href: '/locations/chichester-vehicle-recovery.html'
    },
    winchester: {
      title: 'Winchester',
      summary: 'Fast local recovery across Winchester and nearby routes including the M3 and A34.',
      roads: ['M3', 'A34', 'Kings Worthy & Harestock'],
      href: '/locations/winchester-vehicle-recovery.html'
    }
  };

  var areaPills = document.querySelectorAll('.area-pill');
  var areaPanelTitle = document.getElementById('areaPanelTitle');
  var areaPanelSummary = document.getElementById('areaPanelSummary');
  var areaPanelRoads = document.getElementById('areaPanelRoads');
  var areaPanelLink = document.getElementById('areaPanelLink');

  function renderArea(areaKey) {
    var selected = areaData[areaKey];

    if (!selected || !areaPanelTitle || !areaPanelSummary || !areaPanelRoads || !areaPanelLink) {
      return;
    }

    areaPanelTitle.textContent = selected.title;
    areaPanelSummary.textContent = selected.summary;
    areaPanelRoads.innerHTML = '';
    selected.roads.forEach(function (road) {
      var item = document.createElement('li');
      item.textContent = road;
      areaPanelRoads.appendChild(item);
    });
    areaPanelLink.href = selected.href;
    areaPanelLink.textContent = 'Vehicle recovery in ' + selected.title;

    areaPills.forEach(function (pill) {
      var isActive = pill.getAttribute('data-area') === areaKey;
      pill.classList.toggle('is-active', isActive);
      pill.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  if (areaPills.length && areaPanelTitle && areaPanelSummary && areaPanelRoads && areaPanelLink) {
    areaPills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        renderArea(pill.getAttribute('data-area'));
      });
    });

    renderArea('portsmouth');
  }

  if (!hamburger || !mobileNav || !header) {
    return;
  }

  function setExpanded(isExpanded) {
    header.classList.toggle('nav-open', isExpanded);
    document.body.classList.toggle('nav-open', isExpanded);
    hamburger.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
  }

  hamburger.addEventListener('click', function () {
    var isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    setExpanded(!isExpanded);
  });

  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      setExpanded(false);
      closeLocationsDropdown();
    });
  });

  document.addEventListener('click', function (event) {
    if (!document.body.classList.contains('nav-open')) {
      return;
    }

    if (header.contains(event.target)) {
      return;
    }

    setExpanded(false);
  });

  window.addEventListener('scroll', function () {
    if (document.body.classList.contains('nav-open')) {
      setExpanded(false);
    }
  }, { passive: true });
});
