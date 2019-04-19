window.addEventListener("DOMContentLoaded", event => {
  console.log("DOM fully loaded and parsed");
  let last_known_scroll_position = 0;
  let ticking = false;

  function doSomething(scroll_pos) {
    const logoEl = document.querySelector("#logo");
    const headerEls = document.querySelectorAll("header div");

    if (scroll_pos <= convertRemToPixels(4)) {
      logoEl.style.height = 100 - scroll_pos / convertRemToPixels(4) * 50 + "%";
      headerEls.forEach(header => {
        header.style.backgroundColor =
          "rgba(38, 24, 14, " + scroll_pos / convertRemToPixels(4) * 0.98 + ")";
      });

      console.log(logoEl.style.height);
    } else {
      logoEl.style.height = "50%";
      headerEls.forEach(header => {
        header.style.backgroundColor = "rgba(38, 24, 14, 0.98)";
      });
    }

    console.log(scroll_pos);
    // Do something with the scroll position
  }
  window.addEventListener("scroll", function(e) {
    last_known_scroll_position = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function() {
        doSomething(last_known_scroll_position);
        ticking = false;
      });

      ticking = true;
    }
  });
});

function convertRemToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
