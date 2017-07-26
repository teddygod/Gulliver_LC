"use strict";

// window.onbeforeunload = function(){
// 	return false;
// 	}

// var m1 = new Modal('#main');

function Modal (sSelector, callback) {
    var m = this;
    // 1. Data section
    m.main           = $(sSelector);
    m.backgroundMask = m.main.find('.background-mask');
    m.AllModalBox    = m.main.find('.modal-box');
    m.callback = callback;
    // 2. Logic section
    m.showModal = function (event) {
        var CurrentModalDiv = $(this).attr('href');
        var ScrollPosition  = $(window).scrollTop() + 100;

        if (typeof event === 'string') {
          CurrentModalDiv = '#id-' + event;
        } else {
          event.preventDefault();
          CurrentModalDiv = $(this).attr('href');
        }

        m.backgroundMask.fadeIn(400,
                        function () {
                            $(CurrentModalDiv).css('display', 'block')//.toggleClass('scale-in');
                                           .animate({
                                               // top : ScrollPosition + 'px'
                                               top : 10 + 'vh'
                                              ,opacity : 1
                                              //,transform : 'scale('1')'
                                            }
                                            , 300
                                            );

                                            if (m.callback != null) {
                                                m.callback();
                                            }

                            }
                        );
        }
    m.closeModal = function () {
        m.AllModalBox.animate({
                            opacity: 0
                            ,top: 0
                            }
                            ,400
                            ,function(){
                                $(this).css('display', 'none');
                                m.backgroundMask.fadeOut(400);
                                // m.backgroundMask.fadeDown(400);
                                }
             );
        }
    // 3. Evevnts section
    m.main.find('.modal-show').bind('click', m.showModal);
    // $('.modal-show').bind('click', m.showModal);
    m.main.find('.modal-box__close-btn, .background-mask, .modal-close').bind('click', m.closeModal);
}


Modal.prototype.unmount = function() {
  var m = this;

  m.main.find('.modal-show').unbind('click', m.showModal);
  // $('.modal-show').bind('click', m.showModal);
  m.main.find('.modal-box__close-btn, .background-mask, .modal-close').unbind('click', m.closeModal);
}


Modal.prototype.refresh = function() {
    var m = this;

    m.unmount();
  
    m.main.find('.modal-show').bind('click', m.showModal);
    // $('.modal-show').bind('click', m.showModal);
    m.main.find('.modal-box__close-btn, .background-mask, .modal-close').bind('click', m.closeModal);
}
