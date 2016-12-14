$(document).ready(function(){

  function resizeViewport() {

    // $('.promo').css('height', 'auto');
    var hViewport = $(window).height();
    var hDoc = $('body').height();
    var hHeader = $('.header').innerHeight();
    var hFooter = $('.footer').innerHeight();


    var hPromoInfo = $('.promo > .container').innerHeight();
    var hPromo = hViewport - hHeader - hFooter;
    var promo = $('.promo');

    if ( hViewport < 560 && hViewport >= 460) {
      promo.addClass('promo--small');
      promo.removeClass('promo--fixheight');
    } else if ( hViewport < 460 ) {
      promo.addClass('promo--small');
      promo.addClass('promo--fixheight');
    } else {
      promo.removeClass('promo--small');
      promo.removeClass('promo--fixheight');
    }
  }


  resizeViewport();

  $( window ).resize(function() {
    resizeViewport();
  });

});