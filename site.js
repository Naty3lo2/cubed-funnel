/* Signup form and booking links. Reads window.CUBED_CONFIG from config.js. */
(function () {
  var MAILTO = "mailto:natalyvidales@gmail.com?subject=Intro%20call";
  var TRADES = [
    "General Contractor",
    "Remodeling",
    "Electrical",
    "Plumbing",
    "HVAC",
    "Painting",
    "Other"
  ];
  var NOT_SAVED =
    "CUB³D: signup was not saved. config.js still has placeholder Google Form settings, so nothing was sent. Opening the thank-you page anyway. No email was sent. See README.md for how to connect the form.";

  function start() {
    var config = window.CUBED_CONFIG || {};
    applyBooking(config);
    var form = document.getElementById("get-guide");
    if (!form) return;
    form.addEventListener("submit", function (event) {
      event.preventDefault();
    if (!validate(form)) return;
    submitGuide(form, window.CUBED_CONFIG || config);
    });
    form.addEventListener("input", function (event) {
      var field = event.target;
      if (!field || !field.id) return;
      clearField(field);
      var summary = document.getElementById("form-summary");
      if (summary && form.querySelector("[aria-invalid='true']") === null) {
        summary.textContent = "";
        summary.hidden = true;
      }
    });
  }

  function applyBooking(config) {
    var href = bookingHref(config);
    var external = /^https?:\/\//i.test(href);
    var links = document.querySelectorAll("[data-booking]");
    for (var i = 0; i < links.length; i++) {
      links[i].setAttribute("href", href);
      if (external) {
        links[i].setAttribute("target", "_blank");
        links[i].setAttribute("rel", "noopener noreferrer");
      } else {
        links[i].removeAttribute("target");
        links[i].removeAttribute("rel");
      }
    }
  }

  function bookingHref(config) {
    var url = String((config && config.BOOKING_URL) || "").trim();
    if (!url || /^todo$/i.test(url) || /placeholder/i.test(url)) return MAILTO;
    if (!/^https?:\/\//i.test(url)) return MAILTO;
    return url;
  }

  function formSettings(config) {
    var action = String((config && config.GOOGLE_FORM_ACTION) || "").trim();
    action = action.replace(/[?#].*$/, "").replace(/\/+$/, "");
    action = action.replace(/\/viewform$/i, "/formResponse");
    var ids = [
      entryId(config && config.ENTRY_FIRST_NAME),
      entryId(config && config.ENTRY_EMAIL),
      entryId(config && config.ENTRY_TRADE)
    ];
    var actionOk = /^https:\/\/docs\.google\.com\/forms\/(?:u\/\d+\/)?d\/(?:e\/)?[A-Za-z0-9_-]+\/formResponse$/.test(action);
    if (!actionOk || !ids[0] || !ids[1] || !ids[2]) return null;
    return { action: action, ids: ids };
  }

  function entryId(value) {
    var raw = String(value || "").trim();
    var match = raw.match(/^(?:entry\.)?(\d+)$/i);
    return match ? "entry." + match[1] : "";
  }

  function validate(form) {
    var name = fieldState(form, "fn", "fn-error", nameError(valueOf("fn")));
    var email = fieldState(form, "em", "em-error", emailError(valueOf("em")));
    var trade = fieldState(form, "tr", "tr-error", tradeError(valueOf("tr")));
    var summary = document.getElementById("form-summary");
    var ok = name && email && trade;
    if (summary) {
      summary.textContent = ok ? "" : "Please fix the highlighted fields.";
      summary.hidden = ok;
    }
    if (!ok) {
      var first = form.querySelector("[aria-invalid='true']");
      if (first) first.focus();
    }
    return ok;
  }

  function valueOf(id) {
    var input = document.getElementById(id);
    return input ? input.value : "";
  }

  function nameError(value) {
    var text = value.trim();
    if (!text) return "Enter your first name.";
    if (text.length > 80) return "First name must be 80 characters or fewer.";
    return "";
  }

  function emailError(value) {
    var text = value.trim();
    if (!text) return "Enter your email address.";
    if (text.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
      return "Enter a valid email address.";
    }
    return "";
  }

  function tradeError(value) {
    if (TRADES.indexOf(value) === -1) return "Choose your trade.";
    return "";
  }

  function fieldState(form, fieldId, errorId, message) {
    var input = document.getElementById(fieldId);
    var error = document.getElementById(errorId);
    if (!input || !error) return !message;
    if (message) {
      error.textContent = message;
      error.hidden = false;
      input.setAttribute("aria-invalid", "true");
      input.setAttribute("aria-describedby", errorId);
      return false;
    }
    clearField(input);
    return true;
  }

  function clearField(input) {
    input.removeAttribute("aria-invalid");
    var errorId = input.getAttribute("aria-describedby");
    if (!errorId) return;
    var error = document.getElementById(errorId);
    if (!error) return;
    error.textContent = "";
    error.hidden = true;
  }

  function submitGuide(form, config) {
    var button = form.querySelector("button[type='submit']");
    if (button) button.disabled = true;
    var settings = formSettings(config);
    var payload = {
      firstName: valueOf("fn").trim(),
      email: valueOf("em").trim(),
      trade: valueOf("tr")
    };
    if (!settings) {
      console.warn(NOT_SAVED);
      window.location.href = "thank-you.html";
      return;
    }
    postToForm(settings, payload);
  }

  function postToForm(settings, payload) {
    var iframe = document.getElementById("cubed-form-target");
    var holder = document.createElement("form");
    holder.method = "POST";
    holder.action = settings.action;
    holder.target = "cubed-form-target";
    holder.acceptCharset = "UTF-8";
    holder.style.position = "absolute";
    holder.style.left = "-9999px";
    holder.setAttribute("aria-hidden", "true");
    addField(holder, settings.ids[0], payload.firstName);
    addField(holder, settings.ids[1], payload.email);
    addField(holder, settings.ids[2], payload.trade);
    document.body.appendChild(holder);

    var left = false;
    function go() {
      if (left) return;
      left = true;
      window.location.href = "thank-you.html";
    }
    if (iframe) iframe.addEventListener("load", go);
    window.setTimeout(go, 1500);
    holder.submit();
  }

  function addField(holder, name, value) {
    var input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    holder.appendChild(input);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
