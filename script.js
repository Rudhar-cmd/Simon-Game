var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
function animatePress(currentcolor){
  $("."+currentcolor).addClass("pressed");
  setTimeout(function() {
  $("."+currentcolor).removeClass("pressed");
},100);
}
function checkAnswer(currentlevel){
  if(gamePattern[currentlevel]===userClickedPattern[currentlevel]){
    if (userClickedPattern.length === gamePattern.length) {
    setTimeout(function() {
        nextSequence();
      }, 1000); 
    }
  }
    else{
      playsound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game-over,Press Any Key to Restart");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 1000); 
      startOver();
    }
}
$(document).keypress(function(event) {
  if(!started){
    $("#level-title").text("Press Any Key to Start");
    level=level+1;
    started = true;
  }
  nextSequence();
});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playsound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
  userClickedPattern=[];
  if(level>=1){
   $("#level-title").text("Level "+level);
    level=level+1;
  }
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChosenColour);
}
function playsound(name){
  var sel = new Audio('sounds/' + name + '.mp3');
  sel.play();
}