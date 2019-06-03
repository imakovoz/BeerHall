window.addEventListener("DOMContentLoaded", event => {
  console.log("DOM fully loaded and parsed");

  // scrolling for header
  let last_known_scroll_position = 0;
  let ticking = false;

  function alterElements(scroll_pos) {
    const logoEl = document.querySelector("#logo");
    const headerEls = document.querySelectorAll("#desktopHeader div");
    const headerEl = document.querySelector("#desktopHeader");

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
      document.querySelector("#logo img").style.transition = "0s";
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
});

window.addEventListener("load", event => {
  window.menuLowered = false;
  document.querySelector("#headerMobilLeft").addEventListener("click", () => {
    if (window.menuLowered) {
      document.querySelector("#mobileMenuDropdown").style.display = "none";
      window.menuLowered = false;
    }
  });
  document.querySelectorAll(".openMenu").forEach(e => {
    e.addEventListener("click", () => {
      if (screen.width > 950) {
        window.menuLowered = false;
        window.shouldLowerMenu = true;
        window.moveMenuDown = window.setInterval(lowerMenu, 8);
        window.scrollMenuBeers = window.setInterval(scrollAllBeers, 8000);
        document.querySelector("#desktopHeader").style.display = "none";
        document.querySelector("#mobileHeader").style.display = "none";
        document.querySelector("#menuDropdown").style.display = "block";
        document.querySelector("#main-container").style.marginTop = "0px";
      } else {
        if (!window.menuLowered) {
          document.querySelector("#mobileMenuDropdown").style.display = "block";
          window.setTimeout(function() {
            window.menuLowered = true;
          }, 100);
        }
      }
    });
  });
  document.querySelector("#menuClose").addEventListener("click", () => {
    clearInterval(window.scrollMenuBeers);
    if (screen.width < 950) {
      document.querySelector("#mobileHeader").style.display = "flex";
    } else {
      document.querySelector("#desktopHeader").style.display = "grid";
    }
    document.querySelector("#menuDropdown").style.display = "none";
    document.querySelector("#main-container").style.marginTop = null;
  });

  document
    .querySelector("#menuScrollLeft")
    .addEventListener("click", beerScrollLeft);

  function beerScrollLeft() {
    clearInterval(window.scrollMenuBeers);
    document
      .querySelector("#menuScrollRight")
      .removeEventListener("click", beerScrollRight);
    document
      .querySelector("#menuScrollLeft")
      .removeEventListener("click", beerScrollLeft);
    var beerElList = document.querySelectorAll("#menuImageHolderBL > div");
    for (var i = 0; i < beerElList.length; i++) {
      if (beerElList[i].classList.contains("activeBeer")) {
        if (i === 0) {
          beerElList[beerElList.length - 1].classList.remove("inactiveBeer");
          beerElList[beerElList.length - 1].classList.add("activeBeer");
          scrollBeerViewReverse(
            beerElList[i],
            beerElList[beerElList.length - 1],
            0,
            true
          );
        } else {
          beerElList[i - 1].classList.remove("inactiveBeer");
          beerElList[i - 1].classList.add("activeBeer");
          scrollBeerViewReverse(beerElList[i], beerElList[i - 1], 0, true);
        }
        i = beerElList.length;
        window.scrollMenuBeers = window.setInterval(scrollAllBeers, 8000);
      }
    }
  }

  document
    .querySelector("#menuScrollRight")
    .addEventListener("click", beerScrollRight);

  function beerScrollRight() {
    clearInterval(window.scrollMenuBeers);
    document
      .querySelector("#menuScrollRight")
      .removeEventListener("click", beerScrollRight);
    document
      .querySelector("#menuScrollLeft")
      .removeEventListener("click", beerScrollLeft);
    var beerElList = document.querySelectorAll("#menuImageHolderBL > div");
    for (var i = 0; i < beerElList.length; i++) {
      if (beerElList[i].classList.contains("activeBeer")) {
        if (i === beerElList.length - 1) {
          beerElList[0].classList.remove("inactiveBeer");
          beerElList[0].classList.add("activeBeer");
          scrollBeerView(beerElList[i], beerElList[0], 0);
        } else {
          beerElList[i + 1].classList.remove("inactiveBeer");
          beerElList[i + 1].classList.add("activeBeer");
          scrollBeerView(beerElList[i], beerElList[i + 1], 0);
        }
        i = beerElList.length;
        window.scrollMenuBeers = window.setInterval(scrollAllBeers, 8000);
        document
          .querySelector("#menuScrollRight")
          .addEventListener("click", beerScrollRight);
      }
    }
  }

  function scrollBeerView(el1, el2, count, click = false) {
    setTimeout(function() {
      el1.style.left = count + "%";
      el2.style.left = count - 100 + "%";
      if (count < 100) {
        scrollBeerView(el1, el2, count + 1);
      } else {
        el1.classList.remove("activeBeer");
        el1.classList.add("inactiveBeer");
        if (click === true) {
          document
            .querySelector("#menuScrollRight")
            .addEventListener("click", beerScrollRight);
          document
            .querySelector("#menuScrollLeft")
            .addEventListener("click", beerScrollLeft);
        }
      }
    }, 30);
  }

  function scrollBeerViewReverse(el1, el2, count, click = false) {
    setTimeout(function() {
      el1.style.left = count + "%";
      el2.style.left = count + 100 + "%";
      if (count > -100) {
        scrollBeerViewReverse(el1, el2, count - 1);
      } else {
        el1.classList.remove("activeBeer");
        el1.classList.add("inactiveBeer");
        if (click === true) {
          document
            .querySelector("#menuScrollRight")
            .addEventListener("click", beerScrollRight);
          document
            .querySelector("#menuScrollLeft")
            .addEventListener("click", beerScrollLeft);
        }
      }
    }, 50);
  }

  function scrollAllBeers() {
    var beerElList = document.querySelectorAll("#menuImageHolderBL > div");
    for (var i = 0; i < beerElList.length; i++) {
      if (beerElList[i].classList.contains("activeBeer")) {
        if (i === beerElList.length - 1) {
          beerElList[0].classList.remove("inactiveBeer");
          beerElList[0].classList.add("activeBeer");
          scrollBeerView(beerElList[i], beerElList[0], 0);
        } else {
          beerElList[i + 1].classList.remove("inactiveBeer");
          beerElList[i + 1].classList.add("activeBeer");
          scrollBeerView(beerElList[i], beerElList[i + 1], 0);
        }
        i = beerElList.length;
      }
    }
  }

  function lowerMenu() {
    if (
      document.querySelector("#menuContainerDesktop").style.bottom === "" ||
      (document.querySelector("#menuContainerDesktop").style.bottom ===
        "1rem" &&
        window.shouldLowerMenu)
    ) {
      window.shouldLowerMenu = false;
      window.menuLowered = true;
      document.querySelector("#menuContainerDesktop").style.bottom =
        Math.ceil(
          window.innerHeight /
            parseFloat(getComputedStyle(document.documentElement).fontSize)
        ) + "rem";
    } else if (
      document
        .querySelector("#menuContainerDesktop")
        .style.bottom.replace("rem", "") *
        1 <=
        1 &&
      !window.shouldLowerMenu
    ) {
      clearInterval(window.moveMenuDown);
    } else {
      document.querySelector("#menuContainerDesktop").style.bottom =
        document
          .querySelector("#menuContainerDesktop")
          .style.bottom.replace("rem", "") -
        1 +
        "rem";
    }
  }

  // fit rail item covers

  document.querySelectorAll(".railItem").forEach(railEl => {
    railEl.querySelector(".beerItem").style.height =
      railEl.querySelector(".beer").clientHeight * 0.85 + "px";
  });

  // Beerousel scrolling
  var horizontalOffset = document.querySelector("#rail1").offsetWidth;

  document.querySelector("#rail1").style.left = "0px";
  document.querySelector("#rail2").style.left = -1 * horizontalOffset + "px";
  var railScroll = window.setInterval(moveRail, 10);
  function moveRail() {
    var positionLeft =
      document.querySelector("#rail1").style.left.split("px")[0] * 1;
    if (positionLeft <= horizontalOffset) {
      document.querySelector("#rail1").style.left = positionLeft + 1 + "px";
    } else {
      document.querySelector("#rail1").style.left =
        -1 * horizontalOffset + 1 + "px";
    }
    positionLeft =
      document.querySelector("#rail2").style.left.split("px")[0] * 1;
    if (positionLeft <= horizontalOffset) {
      document.querySelector("#rail2").style.left = positionLeft + 1 + "px";
    } else {
      document.querySelector("#rail2").style.left =
        -1 * horizontalOffset + 1 + "px";
    }
  }

  document.querySelectorAll(".beerItem").forEach(beer => {
    beer.addEventListener("mouseenter", function(event) {
      clearInterval(railScroll);
    });
  });
  document.querySelectorAll(".beerItem").forEach(beer => {
    beer.addEventListener("mouseleave", function(event) {
      clearInterval(railScroll);

      railScroll = window.setInterval(moveRail, 20);
    });
  });
  document
    .querySelector("#bottomBeerousel")
    .addEventListener("mouseenter", function(event) {
      clearInterval(railScroll);

      railScroll = window.setInterval(moveRail, 20);
    });
  document
    .querySelector("#bottomBeerousel")
    .addEventListener("mouseleave", function(event) {
      clearInterval(railScroll);

      railScroll = window.setInterval(moveRail, 10);
    });
});

function convertRemToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
