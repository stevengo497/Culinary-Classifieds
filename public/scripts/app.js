console.log('Up and running!')



$(document).ready(function(){

  $('#homeLogin').on("click", function(event){
    event.preventDefault()
    window.location.href = '/login'
  })

  $('#homeSignup').on("click", function(event){
    event.preventDefault()
    window.location.href = '/signup'
  })

  $("#signup-form").on("submit", function(event){

    event.preventDefault();
  //SIGN UP set up
  var formData = {
  email : $("#email-input").val(),
  password : $("#pw-input").val()
  }

  $.ajax({
    url  : "/signup",
    method : "POST",
    data : formData,
    success : function(response){
      $("h2").append(response.email + " is now signed up!")
    }
  })
  })

////LOGIN FORM
  $("#login-form").on("submit", function(event){
    event.preventDefault();

    var formData = {
      email : $("#email-input").val(),
      password : $("#pw-input").val()
    }

    $.ajax({
      url  : "/sessions",
      method : "POST",
      data : formData,
      success : function(response){
        window.location = "/profile"
      }
    })
  })


  $('.recipeCreate').on('submit', function (event){
    event.preventDefault();
    let recipeInput = {recipeName: $('#recipeCreateInput').val()};
    $.ajax({
      url: "/profile",
      method: "POST",
      data: recipeInput,
      success: function(response){
        ($("ul").append("<li>" + ($('#recipeCreateInput').val() + '<a href="profile/ingredient/' + response._id + '"><button id="' + response._id + '" type="button" class="float-right btn btn-success btn-sm">View Recipe</button></a>') + "</li>"))
        $('#recipeCreateInput').val("");

      }
    });
  });

//CREATE NEW INGREDIENT
  $('.ingredientCreate').on("submit", function (event){
    event.preventDefault();

    let ingredientInput = {
      ingredient: $('#ingredientCreateInput').val(),
      amount: $('#amountCreateInput').val(),
      recipe_id: $('#recipeIdHidden').val()
    }

    $.ajax({
      url: "/profile/ingredient",
      method: "POST",
      data: ingredientInput, //res.body
      success: function(response){
        $("ul").append('<li>' + $('#ingredientCreateInput').val() + " - " + $('#amountCreateInput').val() + '<button type="button" id="' + response._id + '" class="ingredientClassBtn float-right btn btn-success btn-sm" data-toggle="modal" data-target="#exampleModal">Update</button>' + '</li>');
        //$('.modal-title').empty().append("Update: " + response.ingredient + " - " + response.amount) /// only adds on first try, needs to stay though on DOM
        $('#ingredientCreateInput').val(" ");
        $('#amountCreateInput').val(" ");
        // console.log(response)
        ingredientListener();
      }
    })
  })

// DELETE Ingredient
$('#deleteBtn').on("click", function(e){
  e.preventDefault();

  $.ajax({
    url: "/profile/ingredient/"+$('#deleteBtn').data('ingredientId'), /// ends with object Id given on line 68
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
        $('.modal-title').empty().append("Update")
        $('.modal-body').empty().append('<form id="inputForm" class="input">Ingredient: <input type="text" class="updateBox1"> <br><br> Amount: <input type="text" class="updateBox2"></form>')
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

  ///DELETE RECIPE button

  $('.deleteRecipeBtn').on("click", function(e){
    e.preventDefault();

    $.ajax({
      url: "/profile/"+$(this)[0].id, // right now this is for Update id, need to change to recipe ID (same as url)
      method: "DELETE",
      success: function(){
        window.location.href = "/profile";
      }
    })

  })

})

///when click on view recipe, goes to ingredient page
//delete button will clear recipe ID on profile page and that will make
//ingredient page null and void, will have to auto redirect back to recipe page and
//everything will disappear
// also try to add a "are you sure?" box, if button yes is clicked then proceed,
// make sure order of events is right.
