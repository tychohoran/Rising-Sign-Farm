function isEven(n) {
   return n % 2 == 0;
}

function removeC(select, remclass) {
	$(select).removeClass(remclass);
}

// Make box elements uneven polygons
function unevenBoxes(select) {
	$(select).each(function(){
		var points = new Array;
		for(i = 0; i < 8; i++) {
			points[i] = Math.round(Math.random() * 3);

			if(i == 2) {
				points[i] = 100 - points[i];
			} else if(i > 3 & i != 6) {
				points[i] = 100 - points[i];
			}
		};
		var poly = "polygon(";
		for(i = 0; i < 8; i++) {
			poly += points[i] + "%";
			if(i == 7) {
				poly += ")";
			} else if(!isEven(i)){
				poly += ", ";
			} else {
				poly += " "
			}
		}
		$(this).css("clip-path", poly);
	});
}

$(document).ready(function(){
	// Menu animation
	$(".menu-icon").click(function() {
		$(".site-header").toggleClass("clicked");
		$('object').contents().find('svg').toggleClass("clicked");
	});
	unevenBoxes("p");
	unevenBoxes(".site-nav a");
	unevenBoxes(".post-header");

	var h = $(window).height();
	console.log(h);
	// build tween
	var tween = TweenMax.to("#site-title", 1, {className: "-=centered"});

	// build scene
	var scene = new ScrollMagic.Scene({triggerElement: "#intro", duration: h/2, offset: h/2})
					.setTween(tween)
					// .addIndicators({name: "intro animation"}) // add indicators (requires plugin)
					.addTo(controller);
});
