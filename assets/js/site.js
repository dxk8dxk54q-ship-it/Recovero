document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.endsWith("/call-now.html") || document.querySelector(".sticky-cta")) {
    return;
  }

  const sticky = document.createElement("div");
  sticky.className = "sticky-cta";
  sticky.setAttribute("role", "navigation");
  sticky.setAttribute("aria-label", "Quick contact");
  sticky.innerHTML = `
    <div class="sticky-cta__inner">
      <a id="ctaCallSticky" class="sticky-cta__btn sticky-cta__btn--call" href="tel:+447366302341">
        <span class="sticky-cta__icon" aria-hidden="true">📞</span>
        <span class="sticky-cta__text">
          <span class="sticky-cta__title">Call</span>
          <span class="sticky-cta__sub">Recovero 24/7 dispatch</span>
        </span>
      </a>

      <a id="ctaWhatsAppSticky" class="sticky-cta__btn sticky-cta__btn--wa" href="https://wa.me/447366302341?text=Hi%20Recovero%2C%20I%20need%20recovery.%20Location%2Fpostcode%3A%20____%20.%20Vehicle%3A%20____%20.%20Issue%3A%20____%20." target="_blank" rel="noopener">
        <span class="sticky-cta__icon" aria-hidden="true">💬</span>
        <span class="sticky-cta__text">
          <span class="sticky-cta__title">WhatsApp</span>
          <span class="sticky-cta__sub">Best for noisy locations / if you can’t talk.</span>
        </span>
      </a>
    </div>
  `;

  document.body.appendChild(sticky);
  document.body.classList.add("has-sticky");
});
