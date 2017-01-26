// PHOTO VIEWER
// by Jieun Lee

// index of image currently in view
var curr = 2;

var images = [
	"images/test0.jpg",
	"images/test1.jpg",
	"images/test2.jpg",
	"images/test3.jpg",
	"images/test4.jpg",
	"images/test5.jpg"
];
var numImg = images.length;

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
	// image does not exist
	// return value of 0 for now to avoid errors
	return 0;
}

$(document).ready(function(){

	// hide for now
	// will be used for sliding animations
	$("#prev0").hide();
	$("#prev6").hide();

	// action when preview image is clicked
	$(".preview img").click(function() {
		var imgSrc = $(this).attr("src");
		$("#main img").attr("src", imgSrc);
		curr = getIndexByName(imgSrc);
		setImages();
	});

	// action when left arrow button is clicked
	$("#leftarrow").click(function() {
		var imgSrc = $("#prev2 img").attr("src");
		$("#main img").attr("src", imgSrc);
		curr = ((curr+numImg) - 1) % numImg;
		setImages();
	});

	// action when right arrow button is clicked
	$("#rightarrow").click(function() {
		var imgSrc = $("#prev4 img").attr("src");
		$("#main img").attr("src", imgSrc);
		curr = ((curr+numImg) +1) % numImg;
		setImages();
	});
});