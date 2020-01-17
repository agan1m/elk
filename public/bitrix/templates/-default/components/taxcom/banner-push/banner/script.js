 $(document).ready(function() {
 	setTimeout(function() {$("#push-banner").fadeIn('slow')}, 5000);
 	$('.push-banner__close').on("click", function() {
 		$('#push-banner').hide();
 		return false;
 	});
 });
