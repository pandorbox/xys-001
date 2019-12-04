// JavaScript Document
(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
    recalc = function() {
      function getScrollbarWidth() {
        var odiv = document.createElement("div"), //创建一个div
          styles = {
            width: "100px",
            height: "100px",
            overflowY: "scroll"
          },
          i,
          scrollbarWidth;
        for (i in styles) odiv.style[i] = styles[i];
        document.body.appendChild(odiv);
        scrollbarWidth = odiv.offsetWidth - odiv.clientWidth;
        odivParent = odiv.parentNode;
        odivParent.removeChild(odiv);
        return scrollbarWidth;
      }
      var result = window.matchMedia("(min-width:1480px)");
      var resultWAP = window.matchMedia("(max-width:768px)");

      var scrollbarWidth = getScrollbarWidth();
      var clientWidth = docEl.clientWidth - scrollbarWidth;
      if (!clientWidth) return;

      if (result.matches) {
        docEl.style.fontSize = "100px";
      } else if (resultWAP.matches) {
        docEl.style.fontSize = 100 * (clientWidth / (750 - scrollbarWidth)) + "px";
      } else {
        docEl.style.fontSize = 100 * (clientWidth / (1480 - scrollbarWidth)) + "px";
      }
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);

$(function() {
  /* 手机导航 */
  $(".m-icon").click(function() {
    $(".m-nav")
      .stop()
      .slideToggle();
  });
  $(".m-nav>li").each(function(ind, el) {
    if ($(el).find(".sub-nav li").length > 0) {
      $(el)
        .children("a")
        .attr("href", "javascript:;");
    }
  });
  /* pc导航 */
  if ($(".nav").length > 0) {
    $(".nav>li").hover(function() {
      $(this)
        .find(".sub-nav")
        .stop()
        .slideToggle();
    });
  }
  /* home-banner */
  if ($(".banner").length > 0) {
    $(window).resize(function() {
      getH();
    });

    function getH() {
      var mH = $(window).height();
      var hH = $(".header").height();
      $(".swiper-container.banner").css({
        height: mH - hH
      });
    }
    getH();
    $(".banner .swiper-slide").each(function(ind, el) {
      var img = $(el)
        .find("img")
        .eq(0);
      img.hide();
      $(el).css({
        backgroundImage: "url('" + img.attr("src") + "')"
      });
    });
    var hBanner = new Swiper(".swiper-container.banner", {
      // autoplay: {
      // 	delay: 3000
      // },
      navigation: {
        nextEl: ".swiper-button-next.b-next",
        prevEl: ".swiper-button-prev.b-prev"
      },
      pagination: {
        el: ".swiper-pagination",
        type: "fraction"
      },
      loop: true
    });
  }

  /* in-banner */
  $(".in-banner").each(function(ind, el) {
    var img = $(el).find("img");
    img.hide();
    $(el).css({
      backgroundImage: "url('" + img.attr("src") + "')"
    });
  });

  /* 768以下取消hover动画 */

  var resultWAP = window.matchMedia("(max-width:768px)");
  function removeC() {
    if (resultWAP.matches) {
      $(".ani").removeClass("act");
    } else {
      $(".ani").addClass("act");
    }
  }
  removeC();

  /* recommend-list */
  var pSwiper;
  function recSwiper() {
    if (pSwiper) {
      pSwiper.destroy();
      $(".recommend-list .item").css("margin", 0);
      $(".recommend-list .swiper-wrapper").css({
        transform: "translate3d(0px, 0px, 0px)"
      });
    }
    if (resultWAP.matches) {
      pSwiper = new Swiper(".recommend-list", {
        slidesPerView: "auto",
        spaceBetween: 30,
        loop: true
      });
    } else {
    }
  }
  recSwiper();
  /* product-box */
  var pNavSwiper;
  var plSwiperOne;
  function pMove() {
    if ($(".product-list-box").length > 0) {
      if (plSwiperOne) {
        plSwiperOne.destroy();
      }
      $(".p-nav .link").each(function(ind, el) {
        $(el).click(function() {
          $(this)
            .addClass("on")
            .siblings()
            .removeClass("on");
        });
      });
      if (resultWAP.matches) {
        $(".p-nav .link").addClass("swiper-slide");
        pNavSwiper = new Swiper(".p-nav", {
          slidesPerView: 4
        });
      } else {
        $(".p-nav .link").removeClass("swiper-slide");
        if (pNavSwiper) {
          pNavSwiper.destroy();
        }
        plSwiperOne = new Swiper(".product-list", {
          slidesPerView: 4,
          spaceBetween: 20,
          navigation: {
            nextEl: ".swiper-button-next.p-next",
            prevEl: ".swiper-button-prev.p-prev"
          }
        });
      }
    }
  }
  pMove();

  /* in-nav */
  var inNavSwiper;

  function inNav() {
    if ($(".in-nav".length > 0)) {
      inNavSwiper = new Swiper(".swiper-container.in-nav", {
        slidesPerView: "auto",
        spaceBetween: 15,
        observer: true
      });
      var lis = $(".in-nav").find("a");
      var len = lis.length;
      var liW = lis.outerWidth(true);
      var allW = $(".in-nav").width();
      if (len * liW > allW) {
        $(".in-nav .swiper-wrapper").css({
          "justify-content": "left"
        });
      } else {
        $(".in-nav .swiper-wrapper").css({
          "justify-content": "center"
        });
      }
    }
  }
  inNav();

  var timer = null;

  $(window).resize(function() {
    timer = setTimeout(function() {
      if ($(".recommend-list").length > 0) {
        if (pSwiper) {
          pSwiper.destroy();
        }
        recSwiper();
      }
      if ($(".ani").length > 0) {
        removeC();
      }
      if ($(".in-nav").length > 0) {
        inNavSwiper.destroy();
        inNav();
      }
      if ($(".p-nav").length > 0) {
        if (pNavSwiper) {
          pNavSwiper.destroy();
        }
      }
      pMove();
      recSwiper();
    }, 500);
  });

  /* m-product-d */
  if ($(".m-product-d").length > 0) {
    var mProduct = new Swiper(".mp-banner", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });
  }
  /** 变化active */
  $(".hactive").hover(function() {
    $(this)
      .find(".active")
      .removeClass("active");
  });
});
