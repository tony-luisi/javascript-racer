function begin() {
	var canvas = document.getElementById("board");
	var ctx = canvas.getContext("2d");
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight / 3;
	ctx.fillStyle = "#FF0000";
	ctx.fillRect(0, 0, 80, 80);
}