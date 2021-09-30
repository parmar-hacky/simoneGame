
var buttonColours = ["red", "blue", "green", "yellow","purple","pink"];

var gamePattern = [];
var userClickedPattern=[];
var started=false;
var level=0;
$(document).keypress(function(){
  if(!started){
  $("#level-title").text("level "+level);
  nextSequence();
    started=true;
  }
});

$(".btn").click(function(){
 var userChosenColour= $(this).attr("id");
 userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
 animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function () {
       nextSequence();
        }, 1000);
    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("OOps 😥 Game over!! Press any key to restart ");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },1000)
    startover();
  }
}

function nextSequence() {
userClickedPattern=[]  ;
level++;
  $("#level-title").text("level "+level);

  var randomNumber = Math.floor(Math.random() * 6);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
 $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");

  setTimeout(function () {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function startover(){
  level=0;
  gamePattern = [];
  started = false;
}