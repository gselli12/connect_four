var curPlayer = "player1";
var winner = null;
var html = "";
var gif = "";
var turn = "Arnold, your move";
var audioArnoldWin = new Audio ("Soundfiles/Hasta la vista.m4a");
function playArnoldMove() {
    var sounds = ["Soundfiles/Bullshit.m4a", "Soundfiles/Change.m4a", "Soundfiles/Chopper.m4a", "Soundfiles/Cookie.m4a", "Soundfiles/Kill you last.m4a", "Soundfiles/Quireboy.m4a", "Soundfiles/Room for my fist.m4a", "Soundfiles/Who is your daddy.m4a"];
    var index = Math.floor(Math.random() * (sounds.length));
    $(".sound").html("<embed src=\"" + sounds[index] + "\" hidden=\"true\" autostart=\"true\" />");
}
function playSylvesterMove() {
    var sounds = ["Soundfiles/DiseaseCureSS.m4a", "Soundfiles/DistractionSS.m4a", "Soundfiles/I am the Law SS.m4a", "Soundfiles/Take your lifeSS.m4a"];
    var index = Math.floor(Math.random() * (sounds.length));
    $(".sound").html("<embed src=\"" + sounds[index] + "\" hidden=\"true\" autostart=\"true\" />");
}
var audioSylvesterWin = new Audio ("Soundfiles/Life for nothing SS.m4a");

//initiate event handler on click
$(".column").on("click", function() {
    //check if there already is a winner
    if (winner != "red" && winner != "yellow") {
        //check if the column that was being clicked on is already full
        if ($(this).children().eq($(this).children().length -1).hasClass("red") || $(this).children().eq($(this).children().length -1).hasClass("yellow")) {
            return;
        }
        else {
            //IF PLAYER 1
            if (curPlayer== "player1") {
                //loop through all children of the column that was being clicked on
                for (let i = 0; i < $(this).children().length ; i++) {
                    //remove class "white" from first element you find & add "red"! Break after that
                    if($(this).children().eq(i).hasClass("white")) {
                        $(this).children().eq(i).removeClass("white");
                        $(this).children().eq(i).addClass("red");
                        //set var row eqal to i + 1 (used for winning condition on rows)
                        row = i;
                        break;
                    }
                }
            }

            //IF PLAYER 2
            else {
                for (let i = 0; i < $(this).children().length; i++) {
                    if($(this).children().eq(i).hasClass("white")) {
                        $(this).children().eq(i).removeClass("white");
                        $(this).children().eq(i).addClass("yellow");
                        row = i;
                        break;
                    }
                }
            }
        }

        //VICTORY CONDITIONS

        //COLUMNS
        //loop through column that was currently clicked on
        var checkWinnerC = "";
        for (let i = 0; i < $(this).children().length; i++) {
            //add colors contained in this column to variable checkWinner
            if ($(this).children().eq(i).hasClass("red")) {
                checkWinnerC += "r";
            }
            else if ($(this).children().eq(i).hasClass("yellow")){
                checkWinnerC += "y";
            }
            else {
                checkWinnerC += "w";
            }
        }
        //if checkWinner contains winning condition, set winner
        if (checkWinnerC.includes("rrrr")) {
            winner = "red";
        }
        else if (checkWinnerC.includes("yyyy")) {
            winner = "yellow";
        }

        //ROWS
        var row;
        var checkWinnerR = "";
        //loop through column that was currently clicked on
        for (let i = 0; i < $(".game").children().length; i ++) {
            //add colors contained in this column to variable checkWinner
            if ($(".game").children().eq(i).children().eq(row).hasClass("red")){
                checkWinnerR += "r";
            }
            else if ($(".game").children().eq(i).children().eq(row).hasClass("yellow")){
                checkWinnerR += "y";
            }
            else {
                checkWinnerR += "w";
            }
        }
        //if checkWinner contains winning condition, set winner
        if (checkWinnerR.includes("rrrr")) {
            winner = "red";
        }
        else if (checkWinnerR.includes("yyyy")) {
            winner = "yellow";
        }

        //DIAGONALS
        for (let i = 0; i < $(".game").children().length; i++) {
            for (let j = 0; j < $(".game").children().eq(i).children().length; j++) {
                if ($(".game").children().eq(j).children().eq(i).hasClass("red") && $(".game").children().eq(j +1).children().eq(i+1).hasClass("red") && $(".game").children().eq(j+2).children().eq(i+2).hasClass("red") && $(".game").children().eq(j+3).children().eq(i+3).hasClass("red")) {
                    winner = "red";
                }
                else if ($(".game").children().eq(j).children().eq(i).hasClass("red") && $(".game").children().eq(j +1).children().eq(i-1).hasClass("red") && $(".game").children().eq(j+2).children().eq(i-2).hasClass("red") && $(".game").children().eq(j+3).children().eq(i-3).hasClass("red")) {
                    winner = "red";
                }
                else if ($(".game").children().eq(j).children().eq(i).hasClass("yellow") && $(".game").children().eq(j +1).children().eq(i+1).hasClass("yellow") && $(".game").children().eq(j+2).children().eq(i+2).hasClass("yellow") && $(".game").children().eq(j+3).children().eq(i+3).hasClass("yellow")) {
                    winner = "yellow";
                }
                else if ($(".game").children().eq(j).children().eq(i).hasClass("yellow") && $(".game").children().eq(j +1).children().eq(i-1).hasClass("yellow") && $(".game").children().eq(j+2).children().eq(i-2).hasClass("yellow") && $(".game").children().eq(j+3).children().eq(i-3).hasClass("yellow")) {
                    winner = "yellow";
                }
            }
        }

        //play sounds after move
        if (curPlayer == "player1" && winner == null) {
            playArnoldMove();
        }
        else if (curPlayer == "player2" && winner == null) {
            playSylvesterMove();
        }

        //declare winner
        if (winner == "red") {
            audioArnoldWin.play();
            $(".menu").toggle();
            $(".win").toggle();
            html = "Arnold wins";
            $(".paragraph").html(html);
            gif = "<img src='https://bubble-medicine.glitch.me/gif?tag=schwarzenegger' alt=''>";
            $(".win").html(gif);
        }
        else if (winner == "yellow") {
            audioSylvesterWin.play();
            $(".menu").toggle();
            $(".win").toggle();
            html = "Sylvester wins";
            $(".paragraph").html(html);
            gif = "<img src='https://bubble-medicine.glitch.me/gif?tag=sylvester' alt=''>";
            $(".win").html(gif);
        }

        //switch player
        curPlayer = curPlayer == 'player1' ? 'player2' : 'player1';

        //indicate which player's turn it is
        if (curPlayer == "player1") {
            turn = "<p>Arnold, your move</p>";
        }
        else {
            turn = "<p>Sylvester, your move</p>";
        }
        $(".turn").html(turn);
    }
});


//button to restart the game
$("button").on("click", function() {
    winner = null;
    $(".red").each(function() {
        $(this).removeClass("red");
        $(this).addClass("white");
    });
    $(".yellow").each(function() {
        $(this).removeClass("yellow");
        $(this).addClass("white");
    });
    html = "";
    gif = "";
    $(".menu").toggle();
    $(".win").toggle();
});
