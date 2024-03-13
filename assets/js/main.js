(function ($) {
  'use strict';

  /*--------------------------------------------------------------
    Scripts initialization
  --------------------------------------------------------------*/
  $.exists = function (selector) {
    return $(selector).length > 0;
  };

  $(window).on('load', function () {
    $(window).trigger('scroll');
    $(window).trigger('resize');
    preloader();
    isotopInit();
  });

  $(function () {
    $(window).trigger('resize');
    mainNav();
    stickyHeader();
    dynamicBackground();
    slickInit();
    isotopInit();
    tabs();
    accordian();
    counterInit();
    rippleInit();
    parallaxEffect();
    hobbleEffect();
    lightGalleryInit();
    scrollUp();
    parallaxSwiperSlider();
    fullScreenSwiperSlider();
    if ($.exists('.wow')) {
      new WOW().init();
    }
  });

  $(window).on('scroll', function () {
    counterInit();
    parallaxEffect();
    showScrollUp();
  });

  /*--------------------------------------------------------------
    Preloader
  --------------------------------------------------------------*/
  function preloader() {
    $('.cs-preloader_in').fadeOut();
    $('.cs-preloader').delay(150).fadeOut('slow');
  }

  /*--------------------------------------------------------------
    Mobile Menu
  --------------------------------------------------------------*/
  function mainNav() {
    $('.cs-nav').append('<span class="cs-munu_toggle"><span></span></span>');
    $('.menu-item-has-children').append(
      '<span class="cs-munu_dropdown_toggle"></span>',
    );
    $('.cs-munu_toggle').on('click', function () {
      $(this)
        .toggleClass('cs-toggle_active')
        .siblings('.cs-nav_list')
        .slideToggle();
    });
    $('.cs-munu_dropdown_toggle').on('click', function () {
      $(this).toggleClass('active').siblings('ul').slideToggle();
      $(this).parent().toggleClass('active');
    });
    // Mega Menu
    // $('.cs-mega_wrapper>li>a').removeAttr('href');
    // Modal Btn
    $('.cs-mode_btn').on('click', function () {
      $(this).toggleClass('active');
      $('body').toggleClass('cs-dark');
    });
    // Side Nav
    $('.cs-icon_btn').on('click', function () {
      $('.cs-side_header').addClass('active');
    });
    $('.cs-close, .cs-side_header_overlay').on('click', function () {
      $('.cs-side_header').removeClass('active');
    });
  }

  /*--------------------------------------------------------------
   Sticky Header
  --------------------------------------------------------------*/
  function stickyHeader() {
    var $window = $(window);
    var lastScrollTop = 0;
    var $header = $('.cs-sticky_header');
    var headerHeight = $header.outerHeight() + 30;

    $window.scroll(function () {
      var windowTop = $window.scrollTop();

      if (windowTop >= headerHeight) {
        $header.addClass('cs-gescout_sticky');
      } else {
        $header.removeClass('cs-gescout_sticky');
        $header.removeClass('cs-gescout_show');
      }

      if ($header.hasClass('cs-gescout_sticky')) {
        if (windowTop < lastScrollTop) {
          $header.addClass('cs-gescout_show');
        } else {
          $header.removeClass('cs-gescout_show');
        }
      }

      lastScrollTop = windowTop;
    });
  }

  /*--------------------------------------------------------------
    Dynamic Background
  --------------------------------------------------------------*/
  function dynamicBackground() {
    $('[data-src]').each(function () {
      var src = $(this).attr('data-src');
      $(this).css({
        'background-image': 'url(' + src + ')',
      });
    });
  }

  /*--------------------------------------------------------------
   Slick Slider
  --------------------------------------------------------------*/
  function slickInit() {
    if ($.exists('.cs-slider')) {
      $('.cs-slider').each(function () {
        // Slick Variable
        var $ts = $(this).find('.cs-slider_container');
        var $slickActive = $(this).find('.cs-slider_wrapper');

        // Auto Play
        var autoPlayVar = parseInt($ts.attr('data-autoplay'), 10);
        // Auto Play Time Out
        var autoplaySpdVar = 3000;
        if (autoPlayVar > 1) {
          autoplaySpdVar = autoPlayVar;
          autoPlayVar = 1;
        }
        // Slide Change Speed
        var speedVar = parseInt($ts.attr('data-speed'), 10);
        // Slider Loop
        var loopVar = Boolean(parseInt($ts.attr('data-loop'), 10));
        // Slider Center
        var centerVar = Boolean(parseInt($ts.attr('data-center'), 10));
        // Variable Width
        var variableWidthVar = Boolean(
          parseInt($ts.attr('data-variable-width'), 10),
        );
        // Pagination
        var paginaiton = $(this)
          .find('.cs-pagination')
          .hasClass('cs-pagination');
        // Slide Per View
        var slidesPerView = $ts.attr('data-slides-per-view');
        if (slidesPerView == 1) {
          slidesPerView = 1;
        }
        if (slidesPerView == 'responsive') {
          var slidesPerView = parseInt($ts.attr('data-add-slides'), 10);
          var lgPoint = parseInt($ts.attr('data-lg-slides'), 10);
          var mdPoint = parseInt($ts.attr('data-md-slides'), 10);
          var smPoint = parseInt($ts.attr('data-sm-slides'), 10);
          var xsPoing = parseInt($ts.attr('data-xs-slides'), 10);
        }
        // Fade Slider
        var fadeVar = parseInt($($ts).attr('data-fade-slide'));
        fadeVar === 1 ? (fadeVar = true) : (fadeVar = false);

        // Slick Active Code
        $slickActive.slick({
          autoplay: autoPlayVar,
          dots: paginaiton,
          centerPadding: '28%',
          speed: speedVar,
          infinite: loopVar,
          autoplaySpeed: autoplaySpdVar,
          centerMode: centerVar,
          fade: fadeVar,
          prevArrow: $(this).find('.cs-left_arrow'),
          nextArrow: $(this).find('.cs-right_arrow'),
          appendDots: $(this).find('.cs-pagination'),
          slidesToShow: slidesPerView,
          variableWidth: variableWidthVar,
          // slidesToScroll: slidesPerView,
          responsive: [
            {
              breakpoint: 1600,
              settings: {
                slidesToShow: lgPoint,
                // slidesToScroll: lgPoint,
              },
            },
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: mdPoint,
                // slidesToScroll: mdPoint,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: smPoint,
                // slidesToScroll: smPoint,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: xsPoing,
                slidesToScroll: xsPoing,
              },
            },
          ],
        });
      });
    }
    // Testimonial Slider
    $('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      asNavFor: '.slider-nav',
    });

    $('.slider-nav').slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      dots: true,
      centerMode: true,
      focusOnSelect: true,
      variableWidth: true,
    });
  }

  /*--------------------------------------------------------------
    Isotop Initialize
  --------------------------------------------------------------*/
  function isotopInit() {
    if ($.exists('.cs-isotop')) {
      $('.cs-isotop').isotope({
        itemSelector: '.cs-isotop_item',
        transitionDuration: '0.60s',
        percentPosition: true,
        masonry: {
          columnWidth: '.cs-grid_sizer',
        },
      });
      /* Active Class of Portfolio*/
      $('.cs-isotop_filter ul li').on('click', function (event) {
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        event.preventDefault();
      });
      /*=== Portfolio filtering ===*/
      $('.cs-isotop_filter ul').on('click', 'a', function () {
        var filterElement = $(this).attr('data-filter');
        $('.cs-isotop').isotope({
          filter: filterElement,
        });
      });
    }
  }


  /*--------------------------------------------------------------
    Tabs
  --------------------------------------------------------------*/
  function tabs() {
    $('.cs-tabs .cs-tab_links a').on('click', function (e) {
      var currentAttrValue = $(this).attr('href');
      $('.cs-tabs ' + currentAttrValue)
        .fadeIn(400)
        .siblings()
        .hide();
      $(this).parents('li').addClass('active').siblings().removeClass('active');
      e.preventDefault();
    });
  }

  /*--------------------------------------------------------------
    Accordian
  --------------------------------------------------------------*/
  function accordian() {
    $('.cs-accordian').children('.cs-accordian_body').hide();
    $('.cs-accordian.active').children('.cs-accordian_body').show();
    $('.cs-accordian_head').on('click', function () {
      $(this)
        .parent('.cs-accordian')
        .siblings()
        .children('.cs-accordian_body')
        .slideUp(250);
      $(this).siblings().slideDown(250);
      $(this)
        .parent()
        .parent()
        .siblings()
        .find('.cs-accordian_body')
        .slideUp(250);
      /* Accordian Active Class */
      $(this).parents('.cs-accordian').addClass('active');
      $(this).parent('.cs-accordian').siblings().removeClass('active');
    });
  }

    /*--------------------------------------------------------------
      Counter Animation
    --------------------------------------------------------------*/
    function counterInit() {
      if ($.exists('.odometer')) {
        $(window).on('scroll', function () {
          function winScrollPosition() {
            var scrollPos = $(window).scrollTop(),
              winHeight = $(window).height();
            var scrollPosition = Math.round(scrollPos + winHeight / 1.2);
            return scrollPosition;
          }

          $('.odometer').each(function () {
            var elemOffset = $(this).offset().top;
            if (elemOffset < winScrollPosition()) {
              $(this).html($(this).data('count-to'));
            }
          });
        });
      }
    }

  /*--------------------------------------------------------------
     Ripple
  --------------------------------------------------------------*/
  function rippleInit() {
    if ($.exists('.cs-ripple_version')) {
      $('.cs-ripple_version').each(function () {
        $('.cs-ripple_version').ripples({
          resolution: 512,
          dropRadius: 20,
          perturbance: 0.04,
        });
      });
    }
  }

  /*--------------------------------------------------------------
    Parallax
  --------------------------------------------------------------*/
  function parallaxEffect() {
    $('.cs-parallax_bg, .cs-parallax').each(function () {
      var windowScroll = $(document).scrollTop(),
        windowHeight = $(window).height(),
        barOffset = $(this).offset().top,
        barHeight = $(this).height(),
        barScrollAtZero = windowScroll - barOffset + windowHeight,
        barHeightWindowHeight = windowScroll + windowHeight,
        barScrollUp = barOffset <= windowScroll + windowHeight,
        barSctollDown = barOffset + barHeight >= windowScroll;

      if (barSctollDown && barScrollUp) {
        var calculadedHeight = barHeightWindowHeight - barOffset;
        var largeEffectPixel = calculadedHeight / 5 - 150;
        var mediumEffectPixel = calculadedHeight / 20;
        var miniEffectPixel = calculadedHeight / 10;

        $(this)
          .find('.cs-to_left')
          .css('transform', `translateX(-${miniEffectPixel}px)`);
        $(this)
          .find('.cs-to_right')
          .css('transform', `translateX(${miniEffectPixel}px)`);
        $(this)
          .find('.cs-to_up')
          .css('transform', `translateY(-${miniEffectPixel}px)`);
        $(this)
          .find('.cs-to_down')
          .css('transform', `translateY(${miniEffectPixel}px)`);
        $(this)
          .find('.cs-to_rotate')
          .css('transform', `rotate(${miniEffectPixel}deg)`);
        $(this).css('background-position', `center -${largeEffectPixel}px`);
      }
    });
  }

  /*--------------------------------------------------------------
    Hobble Effect
  --------------------------------------------------------------*/
  function hobbleEffect() {
    $(document)
      .on('mousemove', '.cs-hobble', function (event) {
        var halfW = this.clientWidth / 2;
        var halfH = this.clientHeight / 2;
        var coorX = halfW - (event.pageX - $(this).offset().left);
        var coorY = halfH - (event.pageY - $(this).offset().top);
        var degX1 = (coorY / halfH) * 8 + 'deg';
        var degY1 = (coorX / halfW) * -8 + 'deg';
        var degX2 = (coorY / halfH) * -50 + 'px';
        var degY2 = (coorX / halfW) * 70 + 'px';
        var degX3 = (coorY / halfH) * -10 + 'px';
        var degY3 = (coorX / halfW) * 10 + 'px';
        var degX4 = (coorY / halfH) * 15 + 'deg';
        var degY4 = (coorX / halfW) * -15 + 'deg';
        var degX5 = (coorY / halfH) * -30 + 'px';
        var degY5 = (coorX / halfW) * 60 + 'px';

        $(this)
          .find('.cs-hover_layer1')
          .css('transform', function () {
            return (
              'perspective( 800px ) translate3d( 0, 0, 0 ) rotateX(' +
              degX1 +
              ') rotateY(' +
              degY1 +
              ')'
            );
          });
        $(this)
          .find('.cs-hover_layer2')
          .css('transform', function () {
            return (
              'perspective( 800px ) translateY(' +
              degX2 +
              ') translateX(' +
              degY2 +
              ')'
            );
          });
        $(this)
          .find('.cs-hover_layer3')
          .css('transform', function () {
            return (
              'perspective( 800px ) translateX(' +
              degX3 +
              ') translateY(' +
              degY3 +
              ') scale(1.02)'
            );
          });
      })
      .on('mouseout', '.cs-hobble', function () {
        $(this).find('.cs-hover_layer1').removeAttr('style');
        $(this).find('.cs-hover_layer2').removeAttr('style');
        $(this).find('.cs-hover_layer3').removeAttr('style');
      });
  }

  /*--------------------------------------------------------------
    Light Gallery
  --------------------------------------------------------------*/
  function lightGalleryInit() {
    $('.cs-lightgallery').each(function () {
      $(this).lightGallery({
        selector: '.cs-lightbox_item',
        subHtmlSelectorRelative: false,
        thumbnail: false,
        mousewheel: true,
      });
    });
  }

  /*--------------------------------------------------------------
     Scroll Up
  --------------------------------------------------------------*/
  function scrollUp() {
    $('.cs-scrollup').on('click', function (e) {
      e.preventDefault();
      $('html,body').animate(
        {
          scrollTop: 0,
        },
        0,
      );
    });
  }
  // For Scroll Up
  function showScrollUp() {
    let scroll = $(window).scrollTop();
    if (scroll >= 350) {
      $('.cs-scrollup').addClass('cs-scrollup_show');
    } else {
      $('.cs-scrollup').removeClass('cs-scrollup_show');
    }
  }

  /*--------------------------------------------------------------
    Parallax Swiper Slider
  --------------------------------------------------------------*/
  function parallaxSwiperSlider() {
    if ($.exists('.cs-parallax_slider')) {
      // Params
      let mainSliderSelector = '.cs-parallax_slider',
        interleaveOffset = 0.5;
      // Main Slider
      let mainSliderOptions = {
        loop: true,
        speed: 1000,
        autoplay: false,
        loopAdditionalSlides: 10,
        grabCursor: true,
        watchSlidesProgress: true,
        mousewheel: true,
        navigation: {
          nextEl: '.cs-swiper_button_next',
          prevEl: '.cs-swiper_button_prev',
        },
        pagination: {
          el: '.cs-swiper_pagination',
          clickable: true,
        },
        on: {
          init: function () {
            this.autoplay.stop();
          },
          imagesReady: function () {
            this.el.classList.remove('loading');
            this.autoplay.start();
          },
          progress: function (swiper) {
            for (let i = 0; i < swiper.slides.length; i++) {
              let slideProgress = swiper.slides[i].progress,
                innerOffset = swiper.width * interleaveOffset,
                innerTranslate = slideProgress * innerOffset;

              swiper.slides[i].querySelector(
                '.cs-swiper_parallax_bg',
              ).style.transform = 'translateX(' + innerTranslate + 'px)';
            }
          },
          touchStart: function (swiper) {
            for (let i = 0; i < swiper.slides.length; i++) {
              swiper.slides[i].style.transition = '';
            }
          },
          setTransition: function (swiper, transition) {
            for (let i = 0; i < swiper.slides.length; i++) {
              swiper.slides[i].style.transition = transition + 'ms';
              swiper.slides[i].querySelector(
                '.cs-swiper_parallax_bg',
              ).style.transition = transition + 'ms';
            }
          },
        },
      };
      let mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);
    }
  }

  /* Vertical Full Screen Swiper Slider Active */
  function fullScreenSwiperSlider() {
    if ($.exists('.cs-fullscreen_swiper_slider')) {
      var swiper = new Swiper('.cs-fullscreen_swiper_slider', {
        direction: 'vertical',
        mousewheel: true,
        loop: true,
        speed: 1000,
        pagination: {
          el: '.cs-swiper_pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.cs-swiper_button_next',
          prevEl: '.cs-swiper_button_prev',
        },
      });
    }
  }

  /*--------------------------------------------------------------
    Cursor Animation
  --------------------------------------------------------------*/
  $(function () {
    $('body').append('<span class="cs-cursor_lg d"></span>');
    $('body').append('<span class="cs-cursor_sm"></span>');
    $(
      '.cs-text_btn, .cs-site_header a, .cs-down_btn, .cs-social_btns a, .cs-menu_widget',
    ).on('mouseenter', function () {
      $('.cs-cursor_lg').addClass('opacity-0');
      $('.cs-cursor_sm').addClass('opacity-0');
    });
    $(
      '.cs-text_btn, .cs-site_header a, .cs-down_btn, .cs-social_btns a, .cs-menu_widget',
    ).on('mouseleave', function () {
      $('.cs-cursor_lg').removeClass('opacity-0');
      $('.cs-cursor_sm').removeClass('opacity-0');
    });
  });
  function cursorMovingAnimation(event) {
    try {
      const timing = gsap.timeline({
        defaults: {
          x: event.clientX,
          y: event.clientY,
        },
      });

      timing
        .to('.cs-cursor_lg', {
          ease: 'power2.out',
        })
        .to(
          '.cs-cursor_sm',
          {
            ease: 'power2.out',
          },
          '-=0.4',
        );
    } catch (err) {
      console.log(err);
    }
  }
  document.addEventListener('mousemove', cursorMovingAnimation);
})(jQuery); // End of use strict


  /*--------------------------------------------------------------
    Banner
  --------------------------------------------------------------*/

const showcaseSlider = new Swiper(".home-showcaseSlider", {
  speed: 1000,
  slidesPerView: 1,
  parallax: true,
  // centeredSlides: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".showcaseSlider-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: '.showcaseSlider-next',
    prevEl: '.showcaseSlider-prev',
  },
});


  /*--------------------------------------------------------------
   End Banner
  --------------------------------------------------------------*/


  /*--------------------------------------------------------------
    Section 2
  --------------------------------------------------------------*/

  const choiceArray = document.querySelectorAll(".choice")

  choiceArray.forEach((card) => {
      card.addEventListener("click", () => {
          choiceArray.forEach((element) => {
              element.classList.remove("expand", "unset")
              element.classList.add('small')
          })
          card.classList.remove("small")
          card.classList.add('expand')
      });

      card.addEventListener("click", () => {
        choiceArray.forEach((element) => {
            element.classList.remove("expand", "oneset")
            element.classList.add('medium')
        })
        card.classList.remove("medium")
        card.classList.add('expand')
    });

  });



  /*--------------------------------------------------------------
    End  Section 2
  --------------------------------------------------------------*/