document.addEventListener('DOMContentLoaded', function () {
  var hamburger = document.querySelector('.hamburger');
  var mobileNav = document.getElementById('mobileNav');
  var header = document.querySelector('.site-header');

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
    });
  });
});
