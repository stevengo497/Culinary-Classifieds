console.log('Up and running!')

$(document).ready(function(){
  $('.recipeCreate').on('submit', function (event){
    event.preventDefault();

    let recipeInput = $('#recipeCreateInput').val();
    $.ajax({
      url: "/profile",
      method: "POST",
      data: recipeInput,
      success: function(response){
        $("h3").append(recipeInput)
      }
    })

  })


})
