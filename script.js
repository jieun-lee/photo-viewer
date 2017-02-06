// PHOTO VIEWER
// by Jieun Lee

////////////////////////////////////////////////////////////////////////////////
// VARIABLES
////////////////////////////////////////////////////////////////////////////////

// array of preview box objects
var prevBox = ["#prev0", "#prev1", "#prev2", "#prev3", "#prev4", "#prev5"];

// in prevBox, the index of the center image
var prevCent = 3;


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


// index of preview images
// TODO: want to replace this
var prevImg = [0, 1, 2, 3, 4];

var bGalleryOpen = false;

////////////////////////////////////////////////////////////////////////////////
// HELPER FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

// sets the position of the preview images
var setPreviewPos = function() {
	for (var i = 0; i < prevBox.length; i++) {
		// images are 104px each + 20px in between
		var imgPos = (i-1)*124 + "px";
		$(prevBox[i]).css("left", imgPos);
	}
}

// sets the indices of the preview images
var setPrevArray = function() {
	var min = ((curr+numImg) - 2);
	for (var i = 0; i < 5; i++) {
		prevImg[i] = (min+i) % numImg;
	}
}

// returns the image based on the preview image index
var getImage = function(n) {
	return images[prevImg[n]].name;
}

// sets the caption of the main image
var setCaption = function() {
	$("#caption p").text(images[curr].caption);
}

// sets the images and captions
var setImages = function(iCurr) {
	// sets index of current image
	curr = iCurr;

	// sets the indices of the preview images
	setPrevArray();

	// sets preview images based on array values
	$("#prev1 img").attr("src", getImage(0));
	$("#prev2 img").attr("src", getImage(1));
	$("#prev3 img").attr("src", getImage(2));
	$("#prev4 img").attr("src", getImage(3));
	$("#prev5 img").attr("src", getImage(4));

	// set main image and caption
	$("#main img").attr("src", getImage(2));
	setCaption();
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

// sets the image based on click-select
var clickSelectImage = function(sName) {
	var iCurr = getIndexByName(sName);
	setImages(iCurr);
}

// scrolls left
var scrollLeft = function() {
	var iCurr = ((curr+numImg) + 1) % numImg;
	setImages(iCurr);
}

// scrolls right
var scrollRight = function() {
	iCurr = ((curr+numImg) - 1) % numImg;
	setImages(iCurr);
}

var toggleGallery = function() {
	// if gallery is open, close gallery
	if (bGalleryOpen) {
		$("#gallery").animate({top: "-50%"});
		bGalleryOpen = false;
	}
	// if gallery is closed, open gallery
	else {
		$("#gallery").animate({top: "0px"});
		bGalleryOpen = true;
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

	$("#caption").hide();
	setCaption();

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