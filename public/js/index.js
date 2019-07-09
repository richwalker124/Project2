// Create Account Fields
var $firstName = $("#firstName");
var $lastName = $("#lastName");
var $regUserName = $("#regUserName");
var $regEmail = $("#regEmail");
var $regPassword = $("#regPassword");
var $passwordRepeat = $("#regPassword-repeat");
// var $userImg = $("#userImg");

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

//Hashtag grabber
function getHashTags(inputText) {
  inputText = inputText.toLowerCase();
  var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
  var matches = [];
  var match;

  while ((match = regex.exec(inputText))) {
    matches.push(match[1]);
  }

  return matches;
}

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
      text: postBody.text,
      image: postBody.image,
      hashtags: postBody.hashtags
    }).then(function() {
      location.reload();
    });
  }
};
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~userImg Selection~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var userImg;
// Button Options
$("#imgBtnOne").on("click", function() {
  event.preventDefault();
  userImg = "/images/userImgOne.jpg";
});

$("#imgBtnTwo").on("click", function() {
  event.preventDefault();
  userImg = "/images/userImgTwo.jpg";
});

$("#imgBtnThree").on("click", function() {
  event.preventDefault();
  userImg = "/images/userImgThree.jpg";
});

$("#imgBtnFour").on("click", function() {
  event.preventDefault();
  userImg = "/images/userImgFour.jpg";
});

$("#imgBtnFive").on("click", function() {
  event.preventDefault();
  userImg = "/images/userImgFive.jpg";
});

$("#imgBtnSix").on("click", function() {
  event.preventDefault();
  userImg = "/images/userImgSix.jpg";
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Register Account Button Process~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var registerFormSubmit = function(event) {
  event.preventDefault();

  var account = {
    firstName: $firstName.val().trim(),
    lastName: $lastName.val().trim(),
    userName: $regUserName.val().trim(),
    userImg: userImg,
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

  //Grab hashtags from post, sets them as a string to upload to databas
  var hashTags = JSON.stringify({
    hashtags: getHashTags($postText.val().trim())
  });

  var newPost = {
    text: $postText.val().trim(),
    hashtags: hashTags,
    image: localStorage.getItem("userImg") // This still needs to be linked from login
  };
  console.log(newPost);

  API.createPost(newPost);
};

// Add Event Listener to Create an Account
$regSubmitBtn.on("click", registerFormSubmit);

// Add Event Listener to Login
$loginSubmitBtn.on("click", loginAccount);

// Add Event Listener to submit Post
$newPostSubmit.on("click", postSubmit);
