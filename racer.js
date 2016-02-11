function setup() {

	trackLength = sessionStorage.getItem('trackLength') || 10;
	players = sessionStorage.getItem('players') || 2;
	drawTable();
	addListeners();

}

function addListeners(){
	
}



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
		currentCell.className = "active";
	}


}

function update() {
	var trackLength = Number(document.parameters.length.value);
	sessionStorage.setItem('trackLength', trackLength);
	var players = Number(document.parameters.players.value);
	sessionStorage.setItem('players', players);
	drawTable();
}

