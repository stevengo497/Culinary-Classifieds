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
      data: ingredientInput, //res.body
      success: function(response){
        $("ul").append('<li>' + $('#ingredientCreateInput').val() + " - " + $('#amountCreateInput').val() + '<button type="button" id="' + response._id + '" class="ingredientClassBtn float-right btn btn-success btn-sm" data-toggle="modal" data-target="#exampleModal">Update</button>' + '</li>');
        $('#ingredientCreateInput').val(" ");
        $('#amountCreateInput').val(" ");
        console.log(response)
        ingredientListener();
      }
    })
  })

$('#deleteBtn').on("click", function(e){
  e.preventDefault();

  $.ajax({
    url: "/profile/ingredient/:id",
    method: "DELETE",
    // success: console.log('gone')
    })
  })
})

function ingredientListener (){
  $('.ingredientClassBtn').on("click", function(e){
    e.preventDefault();
    // console.log($(this)[0].id) // this gets the specific id from the button click
    $.ajax({
      url: "/profile/ingredient/"+$(this)[0].id, //req.params
      method: "GET",
      // data: $(this)[0].id could also do it this way
      success: function(response){
        // for (let i = 0; i < response.length; i++) {
        //   console.log(response[i])
        $('.modal-body').append('<p>' + response.ingredient + " - " + response.amount + '</p>')
        // create form on the fly, 3 inputs in form - ingredient name, amount, hidden input w/ the ingredient id as value - then append to modal
        // }
      }
    })
  })
}

ingredientListener();



//creating controller to findOne ingredient
//create AJAX call that will hit the controller


//link specific update button per ingredient and link to end of URL on ajax call
//HTML data attributes



//url needs to have specific value of resource to delete

//serialize not ness if you use val() but needed if using whole form





/*Update button needs to link to modal when clicked
grab recipeCreateInput value and ingredientCreateInput value and show on modal body
allow updates and link to _id
Save changes button and append new things to DOM


*/
