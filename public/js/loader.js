
    $( document ).ready(function() {
    console.log( "ready!" );
      $("form").submit(function () {
        $("#submit").fadeOut(function () {
        $("#loader").fadeIn();
      });
      })
    });
    