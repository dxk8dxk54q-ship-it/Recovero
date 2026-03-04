document.addEventListener('DOMContentLoaded', function () {
  var hamburger = document.querySelector('.hamburger');
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

    if (excluded.indexOf(path) !== -1 || document.querySelector('.site-sticky')) {
      return;
    }

    var sticky = document.createElement('div');
    sticky.className = 'site-sticky';
    sticky.setAttribute('role', 'group');
    sticky.setAttribute('aria-label', 'Quick contact options');
    sticky.innerHTML =
      '<div class="site-sticky__row">' +
      '<a href="tel:+447366302341" class="btn btn-primary">📞 Call Now</a>' +
      '<a href="https://wa.me/447366302341?text=Hi%20Recovero%2C%20I%20need%20recovery.%20Location%2Fpostcode%3A%20____%20.%20Vehicle%3A%20____%20.%20Issue%3A%20____%20." class="btn btn-outline" target="_blank" rel="noopener">💬 WhatsApp</a>' +
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

  if (!hamburger || !mobileNav || !header) {
    return;
  }

  function setExpanded(isExpanded) {
    header.classList.toggle('nav-open', isExpanded);
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
});
