"use strict";

$(document).ready(function () {
  $(".link-row").click(function() {
    window.location = $(this).attr("data-href");
  });

  function msieversion() { // ie detection

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    var value = null;

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
    {
        // alert(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
        value = true;
    }
    else  // If another browser, return 0
    {
        // alert('otherbrowser');
        value = false
    }

    return value;
  }

  if( msieversion() ) {
    $('body').addClass('ie-browser');
  }

  (function ($, undefined) { // scrollbar
    window.oAsideScroll = $(".aside-panel__inner").niceScroll(
                            ".aside-panel__inner-scrolled",
                            {cursorcolor: "#ED423E"}
                          );
    $('.select-block__list').niceScroll({cursorcolor:"#ED423E"});
    $(".modal-box").niceScroll({cursoropacitymax: 0});
    // $('body').niceScroll({cursorcolor:"#ED423E"});



})($);


$(function ($, undefined) {
      $("#datepicker_from").datepicker();
      $("#datepicker_before").datepicker();

      $('.form-reccall__from .btn-cldr').delegate('#datepicker_from');
      $('.form-reccall__before .btn-cldr').delegate('#datepicker_before');
      // var widget = null;
      // var widget = $("#ui-datepicker-div").clone();
      // $("body > #ui-datepicker-div").remove();
      // $(".g-form__input_datapicker").append(widget);
});


(function($,undefined){
  var  slider = $("#materials-sliders_1")
      ;

  if (slider.length) {
    var oSlider = slider.find('.bxslider').bxSlider({
      nextSelector: '.materials-slider__btn-prev',
      prevSelector: '.materials-slider__btn-next',
      // adaptiveHeight: true,
      loop: true,
      nextText: '<i class="ar-icon ar-icon-chevron-left"></i>',
      prevText: '<i class="ar-icon ar-icon-chevron-right"></i>'
    });

    $('#btn-show-slider').bind('click', function (event) {
        var tm = setTimeout(function () {
          oSlider.redrawSlider();
          clearTimeout(tm);
        }
        ,500
        );
    });
  }

})($);

$( function() {
  var dateFormat = "mm/dd/yy",
      from = $( "#o-f-period-from" )
          .datepicker({
            defaultDate: "+1w",
            changeMonth: true
          })
          .on( "change", function() {
            to.datepicker( "option", "minDate", getDate( this ) );
          }),
      to = $( "#o-f-period-to" ).datepicker({
            defaultDate: "+1w",
            changeMonth: true
          })
          .on( "change", function() {
            from.datepicker( "option", "maxDate", getDate( this ) );
          });

  function getDate( element ) {
    var date;
    try {
      date = $.datepicker.parseDate( dateFormat, element.value );
    } catch( error ) {
      date = null;
    }

    return date;
  }
} );
  $( "#o-f-event-date" ).datepicker();

});
