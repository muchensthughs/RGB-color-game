var colors = [];
var numBlocks = 6;
var selectedColor;

var blocks = document.querySelectorAll(".block");
var colorDisplay = document.getElementById("colorDisplay");
var notice = document.querySelector("#notice");
var h1 = document.querySelector("h1");
var newColorButton = document.querySelector("#newColor");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
	// add listener to mode buttons
	setUpModeButtons();
	// add listener to reset button
	newColorButton.addEventListener("click", function() {
		generateNewBlocks();
	});
	//add listener to blocks
	setUpBlocks();
	// setup the begining page
	generateNewBlocks();
}

function setUpModeButtons() {
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			if (!this.classList.contains("selected")) {
				for (var j = 0; j < modeButtons.length; j++) {
					modeButtons[j].classList.remove("selected");
				}
				this.classList.add("selected");
				this.textContent === "Easy" ? numBlocks = 3 : numBlocks = 6;
				generateNewBlocks();
			}
		});
	}
}

function setUpBlocks() {
	for (var i = 0; i < blocks.length; i++) {
		// add eventListener to each block
		blocks[i].addEventListener("click", function() {
			var pickedColor = this.style.backgroundColor;
			notice.style.fontWeight = '600';
			notice.style.color = 'red';

			//console.log(this.style.backgroundColor);
			if (pickedColor === selectedColor) {
				var str = "Correct!!";
				notice.textContent = str;
				notice.style.fontWeight = '800';
				notice.style.color = 'green';
				var intervalID = setInterval(function() {
        notice.textContent = (notice.textContent == '' ? str : '');
    }, 200);
				setTimeout(function() {clearInterval(intervalID)}, 1200);
				changeColors(pickedColor);
				newColorButton.textContent = "Play Again?";
				// disablt all other buttuns except reset buttun
				//hard.removeEventListener("click");
			} else {
				var str = "Try Again!";
				notice.textContent = str;
				var intervalID = setInterval(function() {
        notice.textContent = (notice.textContent == '' ? str : '');
    }, 200);
				setTimeout(function() {clearInterval(intervalID)}, 450);
				this.style.backgroundColor = "#232323";
			}
		});	
	}
}

function generateNewBlocks() {
	newColorButton.textContent = "Now Colors";
	// generate new color array
	colors = generateRandomColors(numBlocks); 
	// set all blocks to background color
	// turning the blcoks on and off everytime we refresh may not ba efficient
	for (var i = 0; i < blocks.length; i++) {
		blocks[i].style.display = "none";
	}
	// set colors to blocks
	for (var i = 0; i < colors.length; i++) {
		blocks[i].style.display = "block";
		blocks[i].style.backgroundColor = colors[i];
	}
	// pick new target color
	selectedColor = selectRandomColor();
	colorDisplay.textContent = selectedColor;
	//change the notice content to null and color settings to beginning state
	notice.textContent = "";
	h1.style.backgroundColor = "steelblue";
}

function changeColors(color) {
	h1.style.backgroundColor = color;
	for (var i = 0; i < colors.length; i++) {
		blocks[i].style.backgroundColor = color;
	}
}

function selectRandomColor() {
	//select a random color from colors
	var number = Math.floor(Math.random() * colors.length);
	return colors[number];
}

function generateRandomColors() {
	var colorArray = [];
	for (var i = 0; i < numBlocks; i++) {
		var color = randomColor();
		// use push safer?
		colorArray[i] = color;
	}
	return colorArray;
}

function randomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}
