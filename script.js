// PHOTO VIEWER
// by Jieun Lee

var images = [
	"images/test0.jpg",
	"images/test1.jpg",
	"images/test2.jpg",
	"images/test3.jpg",
	"images/test4.jpg",
	"images/test5.jpg"
];

var curr = 2;
var numImg = images.length;
document.addEventListener("keydown", keyDownHandler, false);

var setCurrent = function(n) {
	curr = n;
}

var setImages = function() {
	var min = ((curr+numImg) - 2);
	var getImgSrc = function(n) {
		return images[(min+n) % numImg];
	}
	$("#prev1 img").attr("src", getImgSrc(0));
	$("#prev2 img").attr("src", getImgSrc(1));
	$("#prev3 img").attr("src", getImgSrc(2));
	$("#prev4 img").attr("src", getImgSrc(3));
	$("#prev5 img").attr("src", getImgSrc(4));
}

var getIndexByName = function(sName) {
	for (var i = 0; i < 6; i++) {
		if (images[i] === sName) {
			return i;
		}
	}
	// image does not exist, return first image (for now)
	return 0;
}

var selectImage = function(sName) {
	$("#main img").attr("src", sName);
	curr = getIndexByName(sName);
	setImages();
}

var scrollLeft = function() {
	var imgSrc = $("#prev4 img").attr("src");
	$("#main img").attr("src", imgSrc);
	curr = ((curr+numImg) + 1) % numImg;
	setImages();
}

var scrollRight = function() {
	var imgSrc = $("#prev2 img").attr("src");
	$("#main img").attr("src", imgSrc);
	curr = ((curr+numImg) - 1) % numImg;
	setImages();
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

$(document).ready(function(){

	// hide for now
	$("#prev0").hide();
	$("#prev6").hide();

	// preview image clicked
	$(".preview img").click(function() {
		var imgSrc = $(this).attr("src");
		selectImage(imgSrc);
	});

	// left arrow button clicked
	$("#leftarrow").click(function() {
		scrollLeft();
	});

	// right arrow button clicked
	$("#rightarrow").click(function() {
		scrollRight();
	});
});