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
        ($("ul").append('<li>' + $('#recipeCreateInput').val() + '<button type="button" class="float-right btn btn-success btn-sm">View Recipe</button>' + '</li>'))
        $('#recipeCreateInput').val("");
      }
    });
  });
})

  $('.ingredientCreate').on("submit", function (event){
    event.preventDefault();

    let ingredientInput = {
      ingredient: $('#ingredientCreateInput').val(),
      amount: $('#amountCreateInput').val()
    }

    $.ajax({
      url: "/profile/ingredient",
      method: "POST",
      data: ingredientInput,
      success: function(response){
        // console.log('working!') // working
        $("ul").append('<li>' + $('#ingredientCreateInput').val() + " - " + $('#amountCreateInput').val() + '<button type="button" class="float-right btn btn-success btn-sm">Update</button>' + '</li>');
        $('#ingredientCreateInput').val(" ");
        $('#amountCreateInput').val(" ");
      }
    })
  })
