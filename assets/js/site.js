document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.endsWith("/call-now.html")) {
    return;
  }

  const sticky = document.createElement("div");
  sticky.className = "site-sticky";
  sticky.setAttribute("role", "navigation");
  sticky.setAttribute("aria-label", "Quick contact");
  sticky.innerHTML = `
    <div class="site-sticky__row">
      <a class="btn btn-primary" id="ctaCallSticky" href="tel:+447366302341">Call Now</a>
      <a class="btn btn-outline" id="ctaWhatsAppSticky" href="https://wa.me/447366302341?text=Hi%20Recovero%2C%20I%20need%20recovery.%20Location%2Fpostcode%3A%20____%20.%20Vehicle%3A%20____%20.%20Issue%3A%20____%20." target="_blank" rel="noopener">WhatsApp</a>
    </div>
  `;

  document.body.appendChild(sticky);
  document.body.classList.add("has-sticky");
});
