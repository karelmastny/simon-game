
var btnColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var usrClickedPattern = [];
var level = 0;

$(document).keypress(function () {
    if (level === 0) {
        nextSequence();
    }
})

function updateLevelText(level) {
    $("h1").text("Level " + level);
}

function nextSequence() {
    var rngNumber = Math.floor(Math.random()*4);
    var rngChosenColour = btnColours[rngNumber];
    gamePattern.push(rngChosenColour);

    $("#"+ rngChosenColour).fadeOut(100).fadeIn(100);

    playSound(rngChosenColour);
    level++;
    updateLevelText(level);

}

$(".btn").on("click", function() {
    var usrChosenColour = $(this).attr("id");

    usrClickedPattern.push(usrChosenColour);
    playSound(usrChosenColour);
    animatePress(usrChosenColour);
    checkAnswer(usrClickedPattern.length-1);


    console.log(usrClickedPattern);
});


function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(answerId) {

    if (gamePattern[answerId] === usrClickedPattern[answerId]) {
        // console.log(answerId + " success");

        if (gamePattern.length === usrClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
            usrClickedPattern = [];
        }

    } else {
        // console.log(answerId + " wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("GAME over. You got to lvl " + level);

        setTimeout(function () {
            startOver();
        }, 5000);
    }


}

function startOver() {
    level = 0;
    gamePattern = [];
    usrClickedPattern = [];
    $("h1").text("Press any key to start");
}