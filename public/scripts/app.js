console.log('Up and running!')



$(document).ready(function(){
  $('.recipeCreate').on('submit', function (event){
    event.preventDefault();

    let recipeInput = {recipeName: $('#recipeCreateInput').val()};
    $.ajax({
      url: "/profile",
      method: "POST",
      data: recipeInput,
      success: function(response){
        $("ul").append('<li>' + $('#recipeCreateInput').val() + '</li>');
        // $('li').after($('#viewRecipe'));
        $('#recipeCreateInput').val(" ");
      }
    });
  });
})
