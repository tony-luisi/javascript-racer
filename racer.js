function setup() {

	trackLength = Number(sessionStorage.getItem('trackLength')) || 10;
	players = Number(sessionStorage.getItem('players')) || 2;
	document.parameters.length.value = trackLength;
	document.parameters.players.value = players;
	positions = [];
	timer = 5;
	drawTable();
	won = false;


}

function press(e) {
	//check bounds to make sure only valid keys are pressed
	if ((e.keyCode > 48) && e.keyCode < (Number(players) + 49)) {
		var pressedNumber = Number(e.keyCode) - 49;
		mainTable.rows[pressedNumber].cells[positions[pressedNumber]].className = "";
		mainTable.rows[pressedNumber].cells[positions[pressedNumber] + 1].className = "active";
		positions[pressedNumber] += 1;
	}
	checkWon();
}

function checkWon() {
	for(var i = 0; i < players; i++) {
		if (positions[i] == trackLength-1) {
			alert("Player " + (i+1) + " has won.");
			document.removeEventListener('keyup', press);
			won = true;
			window.clearInterval(computerPlayer);

		}
	}
}


function go() {
	if (timer > 0) {
		document.getElementById('display').innerHTML = timer;
		timer--;
		var countdown = window.setInterval(go, 1200);
	} else {
		document.getElementById('display').innerHTML = "GO!";
		document.addEventListener('keyup', press);
		window.clearInterval(countdown);
		if (document.getElementById("CPU").checked) {
			computerPlayer = window.setInterval(CPU(), 1);
		}

	}

	
}

function CPU(){
	console.log("THE CPU IS PLAYING");
	for (var i = 1; i < players; i++) {
		var pressKey = Math.round(Math.random());
		if (pressKey && !won){
			console.log("player: " + i + " is going to press a key");
			var e = new Object();
			e.keyCode = i + 49;
			press(e);
		} else {
			console.log("player: " + i + " NO KEY PRESS");
		}

	}


}

//draw/update the table
function drawTable() {

	//create the table
	mainTable = document.getElementById("racer_table");

	mainTable.innerHTML = "";

	for (var i = 0; i < players; i++){
		var row = mainTable.insertRow(0);
		row.id = "player_" + (i+1);
		for (var j = 0; j < trackLength; j++){
			var cell = row.insertCell();
			cell.id = j;
		}

	}
	//set the initial positions
	for (var i = 0; i < players; i++) {
		var currentCell = mainTable.rows[i].cells[0];
		positions[i] = 0;
		currentCell.className = "active";
	}
}

function update() {
	trackLength = Number(document.parameters.length.value) || trackLength;
	sessionStorage.setItem('trackLength', trackLength);
	players = Number(document.parameters.players.value) || players;
	sessionStorage.setItem('players', players);
	drawTable();
}

