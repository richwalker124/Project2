// Create Account Fields
var $firstName = $("#firstName");
var $lastName = $("#lastName");
var $regUserName = $("#regUserName");
var $regEmail = $("#regEmail");
var $regPassword = $("#regPassword");
var $passwordRepeat = $("#regPassword-repeat");
var $userImg = $("#userImg");

// User Login fields
var $email = $("#email");
var $password = $("#password");

// Post textbox
var $postText = $("#postTextBox");
// var $postContainer = $("#postContainer");

// eslint-disable-next-line no-unused-vars
var $regSubmitBtn = $("#registerAccountSubmit");
var $loginSubmitBtn = $("#loginButton");
var $newPostSubmit = $("#newPostSubmit");

// The API object contains methods for each kind of request we'll make
var API = {
  // ~~~~~~ Creates an account with AJAX ~~~~~
  createAccount: function(account) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/account/add",
      data: JSON.stringify(account)
    });
  },
  // ~~~~~~~ Attempts a login with email and password ~~~~~~~~
  getAccount: function(account) {
    $.post("/api/login", {
      email: account.email,
      password: account.password
    })
      .then(function() {
        window.location.replace("/");
      })
      .catch(function(err) {
        console.alert("Invalid Email/Password Combination!");
        console.log(err);
      });
  },

  // ~~~~~~~~ Deletes account by ID ~~~~~~~~~~~~
  deleteAccount: function(id) {
    return $.ajax({
      url: "api/account/" + id,
      type: "DELETE"
    });
  },

  // ~~~~~~~ Submits post and reloads page ~~~~~~~~
  createPost: function(postBody) {
    $.post("/api/post/add", {
      text: postBody.text
    }).then(function() {
      location.reload();
    });
  }
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Register Account Button Process~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var registerFormSubmit = function(event) {
  event.preventDefault();

  var account = {
    firstName: $firstName.val().trim(),
    lastName: $lastName.val().trim(),
    userName: $regUserName.val().trim(),
    userImg: $userImg.val().trim(),
    email: $regEmail.val().trim(),
    password: $regPassword.val().trim()
  };

  if (
    !(
      account.firstName &&
      account.lastName &&
      account.userName &&
      account.email &&
      account.password
    )
  ) {
    alert("You must enter your account information!");
    return;
  } else {
    console.log(account);
  }

  API.createAccount(account).then(function() {
    $firstName.val("");
    $lastName.val("");
    $regUserName.val("");
    $regEmail.val("");
    $regPassword.val("");
    $passwordRepeat.val("");
    console.table(account);
    window.location.replace("/");
  });
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Login to your account button~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var loginAccount = function(event) {
  event.preventDefault();

  var account = {
    email: $email.val().trim(),
    password: $password.val().trim()
  };

  if (!(account.email && account.password)) {
    alert("You must enter your account information!");
    return;
  }

  API.getAccount(account).then(function() {
    $email.val("");
    $password.val("");
    console.table(account);
  });
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ New Post Submit ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var postSubmit = function(event) {
  event.preventDefault();

  var newPost = {
    text: $postText.val().trim(),
    likes: 0,
    dislikes: 0
  };

  API.createPost(newPost);
};

// Add Event Listener to Create an Account
$regSubmitBtn.on("click", registerFormSubmit);

// Add Event Listener to Login
$loginSubmitBtn.on("click", loginAccount);

// Add Event Listener to submit Post
$newPostSubmit.on("click", postSubmit);
