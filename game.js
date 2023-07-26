// colours for game
var buttonColours = ["red", "blue", "green", "yellow"];

// to know if the game has started
var started = false;
var level = 0;
var gamePattern = [];
// for music
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// for animation to see how the buttons look when pressed
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// it is responsible for leveling up and displaying current level and generating random colours and adding visual, audio cues.
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  // var gamePattern = []; its better to initialize this line of code before pushing elements in nextSequence()
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// it is for knowing which button is clicked
var userClickedPattern = [];
$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// this is to know when the game has started and starts from level 0 and carries on releated in the next (nextSequence)
$(document).on("keypress", function() {
  if (!started) {
    $("#level-title").text("Level 0");
    nextSequence();
    started = true;
  }
});

// it is responsible for comparing the user click pattern with game pattern... if user click patern does not match then it indicates a mistake and plays sound that is wrong and calls the gameOver() function
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        userClickedPattern = [];
        nextSequence();
      }, 1000);
    }
  } else {

    console.log("wrong");
    playSound("wrong");
    gameOver();
  }
}
// this occurs when the user clicks the colours in the wrong sequence and tells to start over again or restart 
function gameOver() {
  $("body").addClass("game-over");
  $("#level-title").text("Game Over Press Any Key To Restart");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  startOver();
}
// this is for restarting the game when the user has clicked the wrong sequence of colour
function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}
