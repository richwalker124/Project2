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

// eslint-disable-next-line no-unused-vars
var $regSubmitBtn = $("#registerAccountSubmit");
var $loginSubmitBtn = $("#loginButton");

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

  getAccount: function(account) {
    $.post("/api/login", {
      email: account.email,
      password: account.password
    })

      .then(function() {
        window.location.replace("/");

        // If there's an error, log the error
      })
      .catch(function(err) {
        console.alert("Invalid Email/Password Combination!");
        console.log(err);
      });
  },
  deleteAccount: function(id) {
    return $.ajax({
      url: "api/account/" + id,
      type: "DELETE"
    });
  },
  createPost: function(postBody) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      url: "api/post/add",
      type: "POST",
      data: JSON.stringify(postBody)
    });
  },
  searchTag: function(searchBody){
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      url: "api/post/hash/:hashtag",
      type: "GET",
      data: JSON.stringify(searchBody)
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
$(document).on("click", "#newPostSubmit", function() {
  event.preventDefault();

  var postText = $("#postTextBox")
    .val()
    .trim();

  //Grab hashtags from post, sets them as a string to upload to database
  var hashTags = JSON.stringify({ hashtags: getHashTags(postText) });
  //console.log(hashTags);
  var newPost = {
    text: postText,
    hashtags: hashTags,
    image: localStorage.getItem("userImg"), // This still needs to be linked from login
    likes: 0,
    dislikes: 0,
    userLoginUserId: parseInt(localStorage.getItem("userId")) // This also needs to be linked from login
  };
  console.log("NEW post:", newPost);

  $.ajax({
    type: "POST",
    url: "/api/post/add",
    data: newPost
  }).then(function() {
    location.reload();
  });

  // newPostDOM(postText);
  // Clear form data
  $("#postTextBox").val("");
});

$(".showComments").on("click", function(){
  var clickedPost = $(this).find("div.commentRow");
  if (clickedPost.attr("data-value") === "false"){
    console.log(clickedPost);
    clickedPost.attr("style","display:block;");
    clickedPost.attr("data-value","true");
  } else{
    clickedPost.attr("style","display:none;");
    clickedPost.attr("data-value","false");
  }
});
// Add Event Listener to Create an Account
$regSubmitBtn.on("click", registerFormSubmit);

// Add Event Listener to Login
$loginSubmitBtn.on("click", loginAccount);
