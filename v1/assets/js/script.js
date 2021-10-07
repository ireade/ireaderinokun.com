$(document).ready(function() {


	$('#ToggleNavigation').on('click', function() {

		if ( $(this).parent('nav').hasClass('closed') ) {

			$(this).parent('nav').removeClass('closed');
			$(this).parent('nav').addClass('open');

		} else if ( $(this).parent('nav').hasClass('open') ) {

			$(this).parent('nav').removeClass('open');
			$(this).parent('nav').addClass('closed');
		}

		return false;
	});




	$('.item-list-item--work').hover(function() { 
		$(this).children('.cover-title').css('opacity', "1");
		$(this).removeClass('hideTitle');
		$(this).addClass('showTitle');	

	}, function() {    

		$(this).children('.cover-title').css('opacity', "0");
		$(this).removeClass('showTitle');
		$(this).addClass('hideTitle');
	});




	$(document).on("scroll", function() {
		var t = $(document).scrollTop();
		var change = -(t/2) + 5;
		$(".home-section--hero").css("top", change);
	}); 


})