$(document).ready(function() {
    
    $(".questionYes").on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        var currentRegion = $.cookie("REGION_ID");
        var selectRegion = $('#regionID').val();
        $.removeCookie('REGION_ID', { path: '/' });
        $.removeCookie('REGION_ID_NEW_USER', { path: '/' });
        $.cookie("REGION_ID", selectRegion, {domain: '.taxcom.ru', path: '/',expires: 366});
        $(".questionRegion").hide();
        location.reload();
    });
    $(".questionNo").on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        $(".questionRegion").hide();
        $(".selectRegionField").slideDown('fast');
    });

});