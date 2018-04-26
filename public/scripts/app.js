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
        ($("ul").append("<li>" + ($('#recipeCreateInput').val() + '<button type="button" class="float-right btn btn-success btn-sm">View Recipe</button>') + "</li>"))
        $('#recipeCreateInput').val("");
      }
    });
  });

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
        $("ul").append('<li>' + $('#ingredientCreateInput').val() + " - " + $('#amountCreateInput').val() + '<button type="button" class="float-right btn btn-success btn-sm" data-toggle="modal" data-target="#exampleModal">Update</button>' + '</li>');
        $('#ingredientCreateInput').val(" ");
        $('#amountCreateInput').val(" ");
      }
    })
  })

$('#deleteBtn').on("click", function(e){
  e.preventDefault();

  $.ajax({
    url: "/profile/ingredient/:id",
    method: "DELETE",
    success: console.log('gone')
    })
  })
})

//link specific update button per ingredient and link to end of URL on ajax call
//HTML data attributes



//url needs to have specific value of resource to delete

//serialize not ness if you use val() but needed if using whole form

  // $('#saveChangesBtn').on("click", function (event){
  //   event.preventDefault();
  //
  //   $.ajax({
  //     url: "/profile/ingredient/:id",
  //     method: "PUT",
  //     success: console.log('It actually worked')
  //   })
  // })




/*Update button needs to link to modal when clicked
grab recipeCreateInput value and ingredientCreateInput value and show on modal body
allow updates and link to _id
Save changes button and append new things to DOM


*/
