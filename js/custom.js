// JavaScript Document
$(document).ready(function(e) {
	$(".app").hide();
	setTimeout(function(){colResize();$(".app").show();},1000);
	$(window).resize(function()
	{
		colResize();
	});
	
	$(".about").click( function()
	{
		$(".lightBox").animate({opacity: 1}, 500);
		$(".lightBox").css("display", "block");
	});
	
	$(".close").click( function()
	{
		$(".lightBox").animate({opacity: 0}, 500);
		$(".lightBox").css("display", "none");
	});
});

function colResize()
{
	var $col1 = $(".col1");
	var $col2 = $(".col2");
	
	var winWidth = $(window).width();
	var winHeight = $(window).height();
	
		$col1.css("width", winWidth + "px");
		$col2.css("width", winWidth + "px");
		
		$col1.css("height", winHeight/2 + "px");
		$col2.css("height", winHeight/2 + "px");		
		
		var $x = "auto ";
		var $y = (winHeight/2) + "px";
		
		$col1.css("background-size", $x + $y );
		$col2.css("background-size", $x + $y );
		
		var appWidth = parseInt($(".app").css("width"));
		var appLeft = (winWidth - appWidth) / 2;
		
		$(".app").css("left", appLeft + "px");
		$(".lightBox").css("width", (winWidth - 20) + "px" );
		$(".lightBox").css("height", (winHeight - 20) + "px" );
		
		$("body").css("height", winHeight + "px");
	
}