$(document).ready(function(){

  function tabs(boxTabsLink){ 
    $(boxTabsLink + ' a').on('click', function(e){ 
      e.preventDefault(); 
      var attrb = $(this).attr('href').substring(1);
      var idBox = $('#'+attrb);
      // var attrb = $(this).attr('href');  
      $(boxTabsLink + ' a').removeClass('nomination__tabs-link--active');
      $(this).addClass('nomination__tabs-link--active');

      // $(boxTabsLink + ' .nomination__box').addClass('nomination__box--deselected');
      $('.nomination__box').removeClass('nomination__box--visible');
      setTimeout(function() {
        $('.nomination__box').removeClass('nomination__box--selected');
      }, 200);
      setTimeout(function() {
        $(idBox).addClass('nomination__box--selected');
      }, 200);
      setTimeout(function() {
        $('.nomination__box--selected').addClass('nomination__box--visible');
      }, 300);

      console.log(idBox);
 
    }); 
  }; 
  // tabs('#agensy-nom');
  tabs('#project-nom');

  // var tab = $('#project-nom').find('a');


});

