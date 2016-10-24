$(document).ready(function(){

  function resizeViewport() {

    $('.promo').css('height', 'auto');
    var hViewport = $(window).height();
    var hDoc = $('body').height();
    var hHeader = $('.header').innerHeight();
    var hFooter = $('.footer').innerHeight();

    if (hViewport > hDoc) {
      var hPromo = hViewport - hHeader - hFooter;
      $('.promo').css('height', hPromo);
    }
  }

  resizeViewport();

  $( window ).resize(function() {
    resizeViewport();
  });

});