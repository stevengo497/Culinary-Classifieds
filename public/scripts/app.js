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

//CREATE NEW INGREDIENT
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

// DELETE Ingredient
$('#deleteBtn').on("click", function(e){
  e.preventDefault();

  $.ajax({
    url: "/profile/ingredient/"+$('#deleteBtn').data('ingredientId'), /// ends with object Id given on line 61
    method: "DELETE",
    success: function(response){
    window.location.reload();

    // success: console.log('gone')
    }
    })
  })



//UPDATE INGREDIENT BUTTON - Delete button works here
function ingredientListener (){
  $('.ingredientClassBtn').on("click", function(e){
    e.preventDefault();
    $('#deleteBtn').data('ingredientId', $(this)[0].id) // once the update button clicked, we add to the delete button the object ID
    $('#saveChangesBtn').data('saveChangesId', $(this)[0].id)
    // console.log($(this)[0].id) // this gets the specific id from the button click
    $.ajax({
      url: "/profile/ingredient/"+$(this)[0].id, //req.params
      method: "GET",
      // data: $(this)[0].id could also do it this way
      success: function(response){
        $('.modal-title').empty().append("Update: " + response.ingredient + " - " + response.amount)
        $('.modal-body').empty().append('<form id="inputForm" class="input" action="/profile/ingredient/"+$(this)[0].id" method="post">Ingredient: <input type="text" class="updateBox1"> <br><br> Amount: <input type="text" class="updateBox2"></form>')
        // create form on the fly, 3 inputs in form - ingredient name, amount, hidden input w/ the ingredient id as value - then append to modal
      }
    })
  })
}
ingredientListener();


///UPDATE ACTUAL INGREDIENT
  $('#saveChangesBtn').on("click", function(e){
    e.preventDefault();
    let ingredient = $('.updateBox1').val();
    let amount = $('.updateBox2').val();
    $.ajax({
      url: "/profile/ingredient/"+$('#saveChangesBtn').data('saveChangesId'),
      method: "PUT",
      data: {
        ingredient,
        amount
      },
      success: function(response){
        window.location.reload();
      }
    })
  })

})
// need to collect data from input boxes in form in Modal
//PUT ajax call
//link save changes button and make sure it works (console.log)
//needs to update in the DOM and Database
