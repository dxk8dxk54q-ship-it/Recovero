document.addEventListener('DOMContentLoaded', function () {
  var hamburger = document.querySelector('.hamburger');
  var mobileNav = document.getElementById('mobileNav');
  var header = document.querySelector('.site-header');

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
