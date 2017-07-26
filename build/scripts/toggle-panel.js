"use strict";

function TogglePanel(sSelector) { }

TogglePanel.prototype.mount = function() {
  var  asidePanel = $('.aside-panel')
  ,wrapper   = $('.wrapper')
  ,header    = $('.header')
  ,footer    = $('.footer')
  ;
  function toggleAsidePanel () {
    // event.preventDefault();
    if ( !asidePanel.hasClass('aside-panel_small_bar') ) {
      asidePanel.addClass('aside-panel_small_bar');
      wrapper.removeClass('wrapper_aside-panel_open');
      if ($(window).width() < 1023 ) {
        $("body").css("overflow","inherit");
      } else {
        $("body").css("overflow-x","inherit");
      }
      $(".aside-panel__inner").getNiceScroll().resize();
    } else {
      asidePanel.removeClass('aside-panel_small_bar');
      wrapper.addClass('wrapper_aside-panel_open');
      if ($(window).width() < 1023 ) {
        $("body").css("overflow","hidden");
      } else {
        $("body").css("overflow-x","hidden");
      }
      $(".aside-panel__inner").getNiceScroll().resize();
    }
  }
  if ($(window).width() > 1023) {
    toggleAsidePanel();
  } else {
    wrapper.removeClass('wrapper_aside-panel_open');
  }
  // toggleAsidePanel();
  asidePanel.find('.aside-panel__menu-button').bind('click', toggleAsidePanel);
  // asidePanel.find('.aside-panel__menu-button').bind('click', toggleAsidePanel);



  function headerAutoHeight () {
    var  ywindow    = window.innerHeight
    ,ywindowOut = window.outerHeight;
    document.getElementById('aside-block_1').style.minHeight = String(ywindow)+'px';
    // window.oAsideScroll.onResize();
  }
  function headerAutoHeightScroll (event) {
    var  ywindow = window.innerHeight
    ,nScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (  Number(nScroll) <= Number(ywindow) ) {
      document.getElementById('aside-block_1').style.minHeight = String( Number(ywindow) ) + 'px';
    }
    // window.oAsideScroll.onResize();
  }


  this.headerAutoHeight = headerAutoHeight;
  this.headerAutoHeightScroll = headerAutoHeightScroll;

  window.setTimeout(headerAutoHeight(),500);
  headerAutoHeight();
  window.addEventListener('click', headerAutoHeightScroll);
  window.addEventListener('scroll', headerAutoHeightScroll);
  window.addEventListener('resize', headerAutoHeight);
};


TogglePanel.prototype.unmount = function() {
  window.addEventListener('click', this.headerAutoHeightScroll);
  window.addEventListener('scroll', this.headerAutoHeightScroll);
  window.addEventListener('resize', this.headerAutoHeight);
};
