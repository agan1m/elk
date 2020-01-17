$(document).ready(function() {

    $("#srchFrm").mousedown(function(event) {
        $("#searchTips").fadeIn('fast');
        /*$(document).mouseup(function (e)
        {
            var container = $("#searchTips");

            if (e.target.id != "searchTips" && e.target.id != "srch_frm")
            {
                container.fadeOut('fast');
            }
        });*/
    });
    $("#srchFrm").keydown(function(event) {
        $("#searchTips").fadeOut('fast');
    });

    $("#close").click(function(event) {
        
        $(this).parent().fadeOut('fast');
        return false;
    });

});
