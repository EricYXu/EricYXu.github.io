(function () {
  var HASH = "c6783f1d80cc9df64da84bb61b1f701e31fcfdeb8aef4c9fbb356e17cea03480";

  var items = document.querySelectorAll(".protected-nav");

  function unlock() {
    items.forEach(function (el) { el.style.display = ""; });
    var box = document.getElementById("_nav_pw_box");
    if (box) box.remove();
  }

  if (sessionStorage.getItem("authenticated") === "true") {
    unlock();
    return;
  }

  // Hide protected nav items
  items.forEach(function (el) { el.style.display = "none"; });

  // Small password box fixed to bottom-right
  var box = document.createElement("div");
  box.id = "_nav_pw_box";
  box.style.cssText = [
    "position:fixed", "bottom:18px", "right:18px", "z-index:9999",
    "display:flex", "flex-direction:column", "align-items:flex-end"
  ].join(";");

  box.innerHTML = [
    '<input id="_nav_pw" type="password" placeholder="password"',
    '  style="border:none;border-bottom:1px solid #8b4513;background:transparent;',
    '         outline:none;font-family:Georgia,serif;font-size:12px;',
    '         color:#2b2b2b;padding:2px 4px;width:100px;text-align:right;',
    '         caret-color:#8b4513">',
    '<div id="_nav_pw_err" style="color:#c00;font-size:10px;min-height:1em;',
    '     margin-top:3px;text-align:right"></div>'
  ].join("");

  document.body.appendChild(box);

  var input = document.getElementById("_nav_pw");
  var err   = document.getElementById("_nav_pw_err");

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
          unlock();
        } else {
          err.textContent = "incorrect";
          input.value = "";
        }
      });
  });
})();
