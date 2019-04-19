window.addEventListener("DOMContentLoaded", event => {
  console.log("DOM fully loaded and parsed");
  let last_known_scroll_position = 0;
  let ticking = false;

  function alterElements(scroll_pos) {
    const logoEl = document.querySelector("#logo");
    const headerEls = document.querySelectorAll("header div");
    const headerEl = document.querySelector("header");

    if (scroll_pos <= convertRemToPixels(4)) {
      logoEl.style.height =
        100 - (scroll_pos / convertRemToPixels(4)) * 50 + "%";
      headerEl.style.width =
        90 + (scroll_pos / convertRemToPixels(4)) * 10 + "%";
      headerEl.style.marginLeft =
        5 - (scroll_pos / convertRemToPixels(4)) * 5 + "%";
      headerEls.forEach(header => {
        header.style.backgroundColor =
          "rgba(38, 24, 14, " +
          (scroll_pos / convertRemToPixels(4)) * 0.85 +
          ")";
      });
      document.querySelector("#logo img").src = "resources/imgs/logo.png";
      document.querySelector("#logo").style.borderBottomRightRadius =
        Math.round(3 - (scroll_pos / convertRemToPixels(4)) * 3) + "px";
      document.querySelector("#logo").style.borderBottomLeftRadius =
        Math.round(3 - (scroll_pos / convertRemToPixels(4)) * 3) + "px";
      document.querySelector("#menu").style.borderBottomLeftRadius =
        Math.round(3 - (scroll_pos / convertRemToPixels(4)) * 3) + "px";
      document.querySelector("#search").style.borderBottomRightRadius =
        Math.round(3 - (scroll_pos / convertRemToPixels(4)) * 3) + "px";
    } else {
      logoEl.style.height = "50%";

      document.querySelector("#logo img").src =
        "resources/imgs/second_logo.png";
      headerEl.style.width = "100%";
      headerEl.style.marginLeft = "0%";
      headerEls.forEach(header => {
        header.style.backgroundColor = "rgba(38, 24, 14, 0.85)";
      });
      document.querySelector("#logo").style.borderBottomRightRadius = "0px";
      document.querySelector("#logo").style.borderBottomLeftRadius = "0px";
      document.querySelector("#logo").style.border =
        "border: 1px solid #70695c";
      document.querySelector("#menu").style.borderBottomLeftRadius = "0px";
      document.querySelector("#search").style.borderBottomRightRadius = "0px";
    }
  }
  window.addEventListener("scroll", function(e) {
    last_known_scroll_position = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function() {
        alterElements(last_known_scroll_position);
        ticking = false;
      });

      ticking = true;
    }
  });
  document.querySelector("#rail1").style.left = "0px";
  document.querySelector("#rail2").style.left = -1 * screen.width + "px";
  var rail1Scroll = window.setInterval(moveRail1, 8);
  function moveRail1() {
    var positionLeft =
      document.querySelector("#rail1").style.left.split("px")[0] * 1;
    if (positionLeft <= screen.width) {
      document.querySelector("#rail1").style.left = positionLeft + 1 + "px";
    } else {
      document.querySelector("#rail1").style.left = -1 * screen.width + "px";
    }
  }
  var rail1Scroll = window.setInterval(moveRail2, 8);
  function moveRail2() {
    var positionLeft =
      document.querySelector("#rail2").style.left.split("px")[0] * 1;
    if (positionLeft <= screen.width) {
      document.querySelector("#rail2").style.left = positionLeft + 1 + "px";
    } else {
      document.querySelector("#rail2").style.left = -1 * screen.width + "px";
    }
  }
});

function convertRemToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
