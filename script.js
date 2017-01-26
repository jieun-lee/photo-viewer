// PHOTO VIEWER
// by Jieun Lee

$(document).ready(function(){

	// action when preview image is clicked
	$(".preview img").click(function() {
		var imgSrc = $(this).attr("src");
		$("#main img").attr("src", imgSrc);
	});

});