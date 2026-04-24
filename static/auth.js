(function () {
  var HASH = "c6783f1d80cc9df64da84bb61b1f701e31fcfdeb8aef4c9fbb356e17cea03480";

  if (sessionStorage.getItem("authenticated") === "true") return;

  var overlay = document.createElement("div");
  overlay.style.cssText = [
    "position:fixed", "inset:0", "z-index:9999",
    "background:#fff", "display:flex", "align-items:center",
    "justify-content:center", "font-family:inherit"
  ].join(";");

  overlay.innerHTML = [
    '<div style="text-align:center">',
    '  <input id="_pw" type="password" placeholder=""',
    '    style="border:none;border-bottom:1px solid #000;outline:none;',
    '           font-size:1rem;padding:4px 2px;width:180px;text-align:center">',
    '  <div id="_pw_err" style="color:#c00;font-size:0.8rem;margin-top:8px;',
    '       min-height:1.2em"></div>',
    '</div>'
  ].join("");

  document.documentElement.style.overflow = "hidden";
  document.body.appendChild(overlay);

  var input = document.getElementById("_pw");
  var err   = document.getElementById("_pw_err");

  input.focus();

  input.addEventListener("keydown", function (e) {
    if (e.key !== "Enter") return;
    var val = input.value;
    crypto.subtle.digest("SHA-256", new TextEncoder().encode(val))
      .then(function (buf) {
        var hex = Array.from(new Uint8Array(buf))
          .map(function (b) { return b.toString(16).padStart(2, "0"); })
          .join("");
        if (hex === HASH) {
          sessionStorage.setItem("authenticated", "true");
          document.documentElement.style.overflow = "";
          overlay.remove();
        } else {
          err.textContent = "Incorrect password.";
          input.value = "";
          input.focus();
        }
      });
  });
})();
