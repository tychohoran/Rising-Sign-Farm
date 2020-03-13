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
			points[i] = Math.random() * 2;

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
	$(".menu-icon, .site-nav .page-link").click(function() {
		$(".site-header").toggleClass("clicked");
		$('object').contents().find('svg').toggleClass("clicked");
	});

	//Subpage links
	$(".sub.page-link").click(function() {
		$(this).parent().toggleClass("selected");
	});

	//Make boxes uneven
	unevenBoxes("p");
	unevenBoxes("a.page-link");
	unevenBoxes(".post-header");

	var h = $(window).height();
	var fh = $(document).height();
	var bh = $("#background").height();
	console.log(bh);
	// build tween
	var tween = TweenMax.to("#site-title", 1, {className: "-=centered"});

	// build scene
	var scene = new ScrollMagic.Scene({triggerElement: "#intro", duration: h/2, offset: h/2})
					.setTween(tween)
					// .addIndicators({name: "intro animation"})
					.addTo(controller);
	var scene2 = new ScrollMagic.Scene({triggerElement: "#intro", duration: fh, offset: h/2}).setTween( new TweenMax.to('#background', 2, { css: { transform: 'translate(0, -'+1.8*bh+'px)' }}))
    				.addTo(controller);

    $(window).resize(function(){
    	h = $(window).height();
		fh = $(document).height();
		bh = $("#background").height();

    	tween.invalidate();
    });
});
