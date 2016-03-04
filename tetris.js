var noLogs = 20;
var ctx;

function start() {
    console.log("LOADING");

    gameStarted = false;
    gameReset = true;
    bg = new Audio('audio/soundtrack.mp3');

    c = document.getElementById("myCanvas");
    c.width = window.innerWidth;
    window.resizeTo(window.innerWidth, window.outerHeight);
    blockSize = c.width / 30;
    c.height = blockSize * 10;

    ctx=c.getContext("2d");

    duck = new block(20, c.height / 2, blockSize-10, blockSize-10);
    goal = new block(blockSize * 29, c.height / 2, blockSize-10, blockSize - 10);
    logs = [];

    board = new block(0,0, c.width, c.height);

    window.addEventListener("keydown", press, false);

    drawGame();



    document.getElementById("result").innerHTML = "";
}

function setDifficulty(text){
    if (text === "easy") {
        noLogs = 10;
    } else if (text === "medium") {
        noLogs = 20;
    } else if (text === "hard") {
        noLogs = 200;
    }
}

function stop() {
    cancelAnimationFrame(drawGame);
    bg.pause();
    gameStarted = false;
}

function go() {
    if (!gameStarted && gameReset) {
        requestAnimationFrame(updateGame);
        console.log("console go");
        for (var i = 0; i < noLogs; i++){
            logs[i] = createRandomLog();
        }
        gameStarted = true;
        gameReset = false;
        bg.play();

    }


}

function updateGame() {

    for (log in logs) {
        logs[log].y += logs[log].speed;
        if (logs[log].below(board))
            logs[log] = createRandomLog();
    }

        for (log in logs) {
        if (logs[log].intersects(duck)) {
            
            stop();
            return;
            //alert("you lose");
        }
    }

        if (duck.intersects(goal)) {
            
            stop();

            //alert("you win");
            document.getElementById("result").innerHTML = "<h1>YOU FOUND LOVE!</h1>";
            return;
        }

        drawGame();
        requestAnimationFrame(updateGame);

}



function simulateKeyPress(character) {
  jQuery.event.trigger({ type : 'keypress', which : character.charCodeAt(0) });
}

function drawGame() {

	clearCanvas(ctx, c);
    ctx.fillStyle="#66ccff";

    ctx.fillRect(0,0,c.width, c.height);
    ctx.drawImage(document.getElementById("water"), 0,0,c.width, c.height);

    //console.log("drawing water");


    ctx.drawImage(document.getElementById("duck"), duck.x-5, duck.y-5, duck.width+10, duck.width+10);
    ctx.drawImage(document.getElementById("female_duck"), goal.x-5, goal.y-5, goal.width+10, goal.width+10);



            for (log in logs) {

         ctx.drawImage(document.getElementById("alligator"), logs[log].x-10, logs[log].y-40, logs[log].width+20, logs[log].height+50);



    }

   
    ctx.stroke();

}

function press(event) {
                if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
    }

    if (gameStarted) {


    var key = event.keyCode || event.which;
    //console.log(duck.x)
    switch (key) {
        case 37: //left
            duck.x -= blockSize / 2;
            if (duck.x < 0) {
                duck.x += blockSize / 2;

            }
            
            break;
        case 39: //right
            duck.x += blockSize / 2;
            if (!board.contains(duck)) duck.x -= blockSize / 2;
            break;
        case 38: //up
            duck.y -= blockSize / 2;
            if (!board.contains(duck)) duck.y += blockSize / 2;
            break;
        case 40: //down
            duck.y += blockSize / 2;
            if (!board.contains(duck)) duck.y -= blockSize / 2;
            break;
        default:
            return;
    }
    //console.log(ctx.x);

    }



}

function clearCanvas(context, canvas) {
  context.clearRect(0, 0, canvas.width, canvas.width);
  var w = canvas.width;
  canvas.width = 1;
  canvas.width = w;
}

function createRandomLog() {

    var logCollides = true;

    while (logCollides) {

        var randomPostionX = Math.floor((Math.random() * (blockSize * 27 -  blockSize * 3)) + blockSize * 3);
        var randomPostionY = Math.floor((Math.random() * (blockSize * 30 -  blockSize * 5)) + blockSize * 5);
        var randomSpeed = Math.floor((Math.random() * 5 * 1) +  1);
        var width = 40;
        var height = width * 2.36;
        var newLog = new block(randomPostionX, randomPostionY*-1, width, height, "blue", randomSpeed);

        var collisions = 0;

        for(log in logs) {
            if (newLog.intersects(logs[log])){
                collisions++;
            } 
        }

        if (collisions === 0) {
            logCollides = false;
        }

    }
    return newLog;
}


 function block(x, y, width, height, colour, speed) {

	this.x = x;
	this.y = y;
	this.width = width;
    this.height = height;
	this.colour = colour;
    this.speed = speed;
    this.intersects = function(rect) {
        return (rect.x <= this.x+this.width && this.x <= rect.x+rect.width && rect.y <= this.y+this.height && this.y <= rect.y + rect.height);
    }
    this.contains = function(rect) {

        rect.width = rect.width||0;
        rect.height = rect.height||0;
        return (x >= this.x && rect.x+rect.width <= this.x+this.width && rect.y >= this.y && rect.y+rect.height <= this.y+this.height);
    };
    this.below = function(rect) {
        return (this.y> rect.y + rect.height);

    }
}
