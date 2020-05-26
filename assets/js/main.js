const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const clearButton = document.querySelector(".clear");
const colorPicker = document.querySelector(".color-picker")
const weightBtns = document.querySelectorAll(".weight-picker")
const weightPointers = document.querySelectorAll(".weight-picker .pointer")
const eraserButton = document.querySelector(".eraser")
const allBtns = document.querySelectorAll("button")


// ---- Global variables ---- //
let isDrawing = false;
let isErasing = false;
let strokeWeight = 7;
let strokeColor = "#000"


// ---- Events ---- //
canvas.addEventListener("mousedown", start);
canvas.addEventListener("touchstart", start);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("mouseup", stop);
canvas.addEventListener("touchend", stop);
eraserButton.addEventListener("click", () => {
	isErasing = !isErasing
	eraserButton.classList.toggle("active")
})
clearButton.addEventListener("click", clearCanvas);
weightBtns.forEach(btn => btn.addEventListener("click", () => {
	changeWeight(btn)
	changeActive(btn)
}))

//prevents scrolling on touch devices
// error:  Unable to preventDefault inside passive event listener due to target being treated as passive. See <URL> -> solved with the third paraeter passive:false
document.body.addEventListener("touchstart", function (e) {
	if (e.target == canvas) {
	  e.preventDefault();
	}
}, {passive:false});
 document.body.addEventListener("touchend", function (e) {
	if (e.target == canvas) {
	  e.preventDefault();
	}
}, {passive:false});
document.body.addEventListener("touchmove", function (e) {
	if (e.target == canvas) {
	  e.preventDefault();
	}
}, {passive:false});


// ---- Drawing Functions ---- //

function start(e) {
	isDrawing = true;
	// so it draws a dot
	draw(e);
}

function draw(e) {
	if(!isDrawing) return;

	// mouse || touch
	let x = e.clientX || e.targetTouches[0].pageX;
	let y = e.clientY || e.targetTouches[0].pageY;

	// This has to be defined before the methods
	//* in react: meterlo en this.state
	ctx.lineWidth = strokeWeight;
	ctx.lineCap = "round"
	ctx.strokeStyle = isErasing ? "#fff" : strokeColor;

	ctx.lineTo(x, y);
	ctx.stroke();
	// For some reason so is it less pixelated:
	ctx.beginPath();
	ctx.moveTo(x, y)
}

function stop() {
	isDrawing = false;
	ctx.beginPath();
	// ctx.closePath(); conecta los extremos para cerrar
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height); //it clears a rectangle space from the  canvas
}

function changeWeight(btn) {
	strokeWeight = btn.value	
}

function changeActive(btn) {
	weightBtns.forEach(btn => btn.classList.remove("active"))
	btn.classList.add("active")
}





// <!------------ iro Color picker  ------------>
// https://github.com/jaames/iro.js?ref=devawesome.io
// https://www.instagram.com/p/CAIkp90g5Om/

const Picker = new iro.ColorPicker("#color-picker", {
	width: 90,
	color: "#fff",
	layoutDirection: "horizontal",
	wheelLightness: true
});

Picker.on("color:change", function(color) {
	const newColor = color.hexString
	strokeColor = newColor;
	weightPointers.forEach(pointer => pointer.style.backgroundColor = newColor) 
})


resizeCanvas();
window.addEventListener("resize", resizeCanvas)
function resizeCanvas() {
	// console.log("resizing");
	//todo: ver como para que no sea tooda la pantalla	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	if(window.innerWidth < 480) {
		console.log("menor");
		Picker.width = 50
	}
}