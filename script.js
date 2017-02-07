// PHOTO VIEWER
// by Jieun Lee

////////////////////////////////////////////////////////////////////////////////
// VARIABLES
////////////////////////////////////////////////////////////////////////////////

// array of preview box positions
// images are 104px each with 20px in between
var prevPos = ["-124px", "0px", "124px", "248px", "372px", "496px", "620px"];

// array of preview box objects
var prevBox = ["#prev0", "#prev1", "#prev2", "#prev3", "#prev4", "#prev5"];

// in prevBox, the index of the hidden image
var hiddenInd = 0;

// array of image objects
var images = [
	{name: "images/test0.jpg", caption: "Leaves, Downtown, Water"},
	{name: "images/test1.jpg", caption: "Reflection"},
	{name: "images/test2.jpg", caption: "Rainy Day"},
	{name: "images/test3.jpg", caption: "Red"},
	{name: "images/test4.jpg", caption: "Orange Leaf"},
	{name: "images/test5.jpg", caption: "Dock"}
];
var numImg = images.length;
document.addEventListener("keydown", keyDownHandler, false);

// index of current image
var curr = 2;

var isGalleryOpen = false;

////////////////////////////////////////////////////////////////////////////////
// HELPER FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

/*
// array: length of array to deal with
// start: current index
// offset: what to subtract/add
var getNext = function(len, start, offset) {
	return ((start+len+offset) % len);
}
*/

// sets the main image and caption
var setMain = function() {
	$("#main img").attr("src", images[curr].name);
	$("#caption p").text(images[curr].caption);
}

// sets preview images based on current image
var setPreviewPos = function() {
	for (var i = 0; i < 6; i++) {
		var imgInd = (curr+numImg+i-3) % numImg;
		$(prevBox[i] + " img").attr("src", images[imgInd].name);
		$(prevBox[i]).css("left", prevPos[i]);
	}
	hiddenInd = 0;
}

// returns the image on the left (true) or right (false)
var getAdjacentImage = function(bLeft) {
	if (bLeft) {
		return images[(curr+numImg-3) % numImg].name;
	} else {
		return images[(curr+3) % numImg].name;
	}
}

// slides the images to the right
var moveRight = function() {
	$(prevBox[hiddenInd] + " img").attr("src", getAdjacentImage(true));
	$(prevBox[hiddenInd]).css("left", prevPos[0]);

	for (var i = 0; i < 6; i++) {
		var move = {left: prevPos[i+1]};
		var index = (hiddenInd+6+i) % 6;
		$(prevBox[index]).animate(move, {queue: false});
	}
	hiddenInd = (hiddenInd + 5) % 6;
}

// slides the images to the left
var moveLeft = function() {
	$(prevBox[hiddenInd] + " img").attr("src", getAdjacentImage(false));
	$(prevBox[hiddenInd]).css("left", prevPos[6]);

	for (var i = 0; i < 6; i++) {
		var move = {left: prevPos[i]};
		var index = (hiddenInd+6+i+1) % 6;
		$(prevBox[index]).animate(move, {queue: false});
	}
	hiddenInd = (hiddenInd + 1) % 6;
}

// returns the index of the image with the given name
var getIndexByName = function(sName) {
	for (var i = 0; i < 6; i++) {
		if (images[i].name === sName) {
			return i;
		}
	}
	// image does not exist, return first image
	return 0;
}

////////////////////////////////////////////////////////////////////////////////
// ACTION-HANDLING FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

var clickSelectImage = function(sName) {
	curr = getIndexByName(sName);
	setPreviewPos();
	setMain();
}

var scrollLeft = function() {
	moveLeft();
	curr = ((curr+numImg) + 1) % numImg;
	setMain();
}

var scrollRight = function() {
	moveRight();
	curr = ((curr+numImg) - 1) % numImg;
	setMain();
}

var toggleGallery = function() {
	if (isGalleryOpen) {
		$("#gallery").animate({top: "-50%"});
		isGalleryOpen = false;
	} else {
		$("#gallery").animate({top: "0px"});
		isGalleryOpen = true;
	}
}

function keyDownHandler(e) {
	// 37 = left arrow key
	if (e.keyCode == 37) {
		scrollLeft();
	}
	// 39 = right arrow key
	else if (e.keyCode == 39) {
		scrollRight();
	}
}

////////////////////////////////////////////////////////////////////////////////
// JQUERY DOCUMENT
////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){

	setPreviewPos();
	setMain();
	$("#caption").hide();

	// preview image clicked
	$(".preview img").click(function() {
		var imgSrc = $(this).attr("src");
		clickSelectImage(imgSrc);
	});

	// left arrow button clicked
	$("#leftarrow").click(function() {
		scrollLeft();
	});

	// right arrow button clicked
	$("#rightarrow").click(function() {
		scrollRight();
	});

	$("#main").mouseenter(function() {
		$("#caption").show();
	});

	$("#main").mouseleave(function() {
		$("#caption").hide();
	});

	$("#gallery-toggle").click(function() {
		toggleGallery();
	});
});