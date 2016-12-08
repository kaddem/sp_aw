$(document).ready(function(){

  function tabs(boxTabsLink){ 
    $(boxTabsLink + ' a').on('click', function(e){ 
      e.preventDefault(); 
      var attrb = $(this).attr('href').substring(1);
      var idBox = $('#'+attrb);
      // var attrb = $(this).attr('href'); 
      var currentPosition = $(document).scrollTop(); 
      var idPosition = $('#'+attrb).offset().top; 
      var scrollTime = Math.abs(currentPosition - idPosition) / 3; 
      $(boxTabsLink + ' a').removeClass('nomination__tabs-link--active');
      $(this).addClass('nomination__tabs-link--active');


      $('.nomination__box').addClass('nomination__box--deselected');
      $('.nomination__box').removeClass('nomination__box--selected');
      $(idBox)
        .addClass('nomination__box--selected')
        .removeClass('nomination__box--deselected');

      console.log(idBox);

      // $('body,html').animate({'scrollTop':idPosition},scrollTime); 
    }); 
  }; 
  tabs('#agensy-nom');
  tabs('#project-nom'); 

  // $('#tabs').tabulous({
  //   effect: 'scale'
  // });

  // $('#agensy_nom').tabulous({
  //   effect: 'scale'
  // });

});

