$(document).ready(function(){

  function anchorScroll(boxAnchorLink){ 
    $(boxAnchorLink + ' a').on('click', function(e){ 
      e.preventDefault(); 
      var attr = $(this).attr('href').substring(1); 
      var currentPosition = $(document).scrollTop(); 
      var idPosition = $('#'+attr).offset().top; 
      var scrollTime = Math.abs(currentPosition - idPosition) / 3; 
      $('body,html').animate({'scrollTop':idPosition},scrollTime); 
    }); 
    }; 
    anchorScroll('#main-nav');

});

$(window).on('scroll', function(e) { // отслеживаем событие на элементе window
    navPosition(); // на любой скролл запускаем функцию
});

navPosition();

function navPosition() {
  var promoHeight = $('.promo').height();
  var navHeight = $('.nav-block').height();
  var navPos = promoHeight - navHeight 
  var docScroll = $(document).scrollTop();
 

  if( docScroll > navPos ) {
    $('.nav-block').addClass('nav-block--scroll');
  }
  else { // иначе
    $('.nav-block').removeClass('nav-block--scroll');
  }
}