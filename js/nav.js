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
  var navPos = promoHeight - navHeight //$('#nav-from').offset().top;
  var docScroll = $(document).scrollTop();

  // console.log(promoHeight);
  // console.log(navHeight);
  // console.log(navPos);  

  // console.log('высота навигации ' + navHeight)
  if( docScroll > navPos ) { // если скролл более чем на 500px
    $('.nav-block').addClass('nav-block--scroll');
    // $('#nav-from').css('padding-top', navHeight); // то покажем кнопку перемотки вверх
  }
  else { // иначе
    $('.nav-block').removeClass('nav-block--scroll');
    // $('#nav-from').css('padding-top', 0); // скроем кнопку перемотки
  }
}