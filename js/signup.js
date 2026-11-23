(function () {
  "use strict";

  // How long to leave the hidden Google Form post running before the
  // thank-you page opens. Raise this if responses are not showing up.
  var POST_WAIT_MS = 1200;

  var form = document.getElementById("signup-form");
  if (!form) return;

  var nameInput = document.getElementById("name");
  var emailInput = document.getElementById("email");
  var typeInput = document.getElementById("contractor-type");
  var errorBox = document.getElementById("form-error");
  var submitBtn = form.querySelector('button[type="submit"]');

  function config() {
    return window.CUBED_CONFIG || {};
  }

  function normalizeAction(url) {
    var value = String(url || "").trim();
    value = value.replace(/\/viewform(?:\?.*)?$/i, "/formResponse");
    value = value.replace(/\/formResponse\/(?:\?.*)?$/i, "/formResponse");
    return value;
  }

  function actionReady(url) {
    if (!url || url === "GOOGLE_FORM_ACTION_URL") return false;
    if (url.indexOf("XXXX") !== -1) return false;
    if (url.indexOf("https://") !== 0) return false;
    if (url.indexOf("docs.google.com/forms") === -1) return false;
    if (url.indexOf("formResponse") === -1) return false;
    return true;
  }

  function entryReady(value) {
    return /^entry\.\d+$/i.test(String(value || "").trim());
  }

  function formReady() {
    var current = config();
    var entries = current.entries || {};
    return actionReady(normalizeAction(current.GOOGLE_FORM_ACTION_URL)) &&
      entryReady(entries.name) &&
      entryReady(entries.email) &&
      entryReady(entries.contractorType);
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function clearFieldState(input) {
    input.removeAttribute("aria-invalid");
    if (input.getAttribute("aria-describedby") === "form-error") {
      input.removeAttribute("aria-describedby");
      errorBox.textContent = "";
    }
  }

  function showError(input, message) {
    errorBox.textContent = message;
    input.setAttribute("aria-invalid", "true");
    input.setAttribute("aria-describedby", "form-error");
    input.focus();
  }

  nameInput.addEventListener("input", function () {
    clearFieldState(nameInput);
  });
  emailInput.addEventListener("input", function () {
    clearFieldState(emailInput);
  });
  typeInput.addEventListener("change", function () {
    clearFieldState(typeInput);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (submitBtn.disabled) return;

    var name = nameInput.value.trim();
    var email = emailInput.value.trim();
    var type = typeInput.value;

    if (!name) {
      showError(nameInput, "Add your name.");
      return;
    }
    if (!email) {
      showError(emailInput, "Add your email so we know where to send the guide.");
      return;
    }
    if (!validEmail(email)) {
      showError(emailInput, "That email doesn't look right. Check it and try again.");
      return;
    }
    if (!type) {
      showError(typeInput, "Choose what kind of contractor you are.");
      return;
    }

    nameInput.value = name;
    emailInput.value = email;
    submitBtn.disabled = true;

    var current = config();
    var thankYou = String(current.thankYouPath || "thank-you.html").trim();

    if (!formReady()) {
      window.location.href = thankYou;
      return;
    }

    var entries = current.entries;
    form.action = normalizeAction(current.GOOGLE_FORM_ACTION_URL);
    form.method = "post";
    form.target = "cubed-form-sink";
    form.acceptCharset = "UTF-8";
    nameInput.setAttribute("name", String(entries.name).trim());
    emailInput.setAttribute("name", String(entries.email).trim());
    typeInput.setAttribute("name", String(entries.contractorType).trim());
    form.submit();

    window.setTimeout(function () {
      window.location.href = thankYou;
    }, POST_WAIT_MS);
  });
})();
