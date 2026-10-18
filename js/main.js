/* Connor Brinkley Bookkeeping — site interactions */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");
  var toggleLabel = toggle ? toggle.querySelector(".sr-only") : null;

  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("open", open);
    if (toggleLabel) toggleLabel.textContent = open ? "Close menu" : "Open menu";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Close the menu after choosing a link
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        setMenu(false);
        toggle.focus();
      }
    });

    // Reset when resizing up to the desktop layout
    window.matchMedia("(min-width: 1024px)").addEventListener("change", function (mq) {
      if (mq.matches) setMenu(false);
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Highlight the nav link for the section in view ---------- */
  var navLinks = document.querySelectorAll('.primary-nav a[href^="#"]:not(.btn)');
  if ("IntersectionObserver" in window && navLinks.length) {
    var linkFor = {};
    navLinks.forEach(function (a) { linkFor[a.getAttribute("href").slice(1)] = a; });

    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = linkFor[entry.target.id];
        if (link && entry.isIntersecting) {
          navLinks.forEach(function (a) { a.classList.remove("active"); });
          link.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    Object.keys(linkFor).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });
  }

  /* ---------- Reveal-on-scroll animations ---------- */
  var revealTargets = document.querySelectorAll(
    ".section-head, .feature-card, .service-item, .split-media, .split-content, .step, .cta-media, .cta-content, .faq-list details, .contact-info, .contact-form, .timeline-item, .credential-card, .price-card, .table-block"
  );
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach(function (el) {
      el.classList.add("reveal");
      revealObserver.observe(el);
    });
  }

  /* ---------- Contact form ---------- */
  var form = document.getElementById("contact-form");
  if (!form) return;

  var statusEl = form.querySelector(".form-status");
  var submitBtn = form.querySelector('button[type="submit"]');
  var FALLBACK_EMAIL = "connor.f.brinkley@gmail.com";

  var messages = {
    name: "Please enter your name.",
    email: "Please enter a valid email address.",
    service: "Please choose a service.",
    message: "Please tell me a little about what you need."
  };

  function validateField(field) {
    var wrapper = field.closest(".field");
    var errorEl = wrapper ? wrapper.querySelector(".error") : null;
    var valid = field.checkValidity() && (!field.required || field.value.trim() !== "");
    if (wrapper) wrapper.classList.toggle("invalid", !valid);
    if (errorEl) errorEl.textContent = valid ? "" : (messages[field.name] || "This field is required.");
    field.setAttribute("aria-invalid", String(!valid));
    return valid;
  }

  // Validate a field once the visitor leaves it, then live as they fix it
  form.querySelectorAll("input, select, textarea").forEach(function (field) {
    field.addEventListener("blur", function () { validateField(field); });
    field.addEventListener("input", function () {
      if (field.closest(".field").classList.contains("invalid")) validateField(field);
    });
  });

  function setStatus(text, type) {
    statusEl.textContent = text;
    statusEl.className = "form-status" + (type ? " " + type : "");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var fields = form.querySelectorAll("[required]");
    var firstInvalid = null;
    fields.forEach(function (field) {
      if (!validateField(field) && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) {
      firstInvalid.focus();
      setStatus("Please fix the highlighted fields.", "failure");
      return;
    }

    var data = new FormData(form);

    // Until a Formspree form ID is configured, fall back to the visitor's email app
    if (form.action.indexOf("YOUR_FORM_ID") !== -1) {
      var body =
        "Name: " + data.get("name") + "\n" +
        "Email: " + data.get("email") + "\n" +
        "Phone: " + (data.get("phone") || "-") + "\n" +
        "Service: " + data.get("service") + "\n\n" +
        data.get("message");
      window.location.href =
        "mailto:" + FALLBACK_EMAIL +
        "?subject=" + encodeURIComponent("Consultation request: " + data.get("service")) +
        "&body=" + encodeURIComponent(body);
      setStatus("Opening your email app to send your message…", "success");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";
    setStatus("", "");

    fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" }
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Request failed");
        form.reset();
        setStatus("Thank you! Your message has been sent. I'll be in touch within one business day.", "success");
      })
      .catch(function () {
        setStatus("Sorry, something went wrong. Please call or email me directly.", "failure");
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      });
  });
})();
