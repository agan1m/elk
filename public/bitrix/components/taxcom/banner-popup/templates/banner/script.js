$(document).ready(function() {
    $(".popupBanner-close").click(function(event) {
		event.preventDefault();
        $(this).parent().hide('fast');
		$(".popupBanner-overlay").hide();
    });
	$(".popupBanner-overlay").click(function(event) {
		event.preventDefault();
		$(".popupBanner").hide();
		$(".popupBanner-overlay").hide();
	});
});