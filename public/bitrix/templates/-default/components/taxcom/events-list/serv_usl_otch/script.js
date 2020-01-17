$(document).ready(function()
{
    $(".account").click(function()
    {
        var X=$(this).attr('id');
        if(X==1)
        {
            $(".submenu").hide();
            $(this).attr('id', '0'); 
        }
        else
        {
            $(".submenu").show();
            $(this).attr('id', '1');
        }
    });

//Mouse click on sub menu
$(".submenu").mouseup(function()
{
    return false
});

//Mouse click on my account link
$(".account").mouseup(function()
{
    return false
});


//Document Click
$(document).mouseup(function()
{
    $(".submenu").hide();
    $(".account").attr('id', '');
});
});


function ddMenu(a) {
    
    $(".serv_usl ul > li").addClass("disable");

    if (a == "all") {
        $(".serv_usl ul > li").removeClass("disable");
        $(".dropdown .account").html("все сервисы и услуги");
    };
    if (a == "new") {
        $(".serv_usl ul > li:lt(4)").removeClass("disable");
        $(".dropdown .account").html("все новинки");
    };
    if (a == "otch") {
        $("#bx_925308402_46128, #bx_925308402_46126, #bx_925308402_46142, #bx_925308402_46136, #bx_925308402_46143, #bx_925308402_46129, #bx_925308402_46140, #bx_925308402_46130, #bx_925308402_46141, #bx_925308402_46144, #bx_925308402_46138, #bx_925308402_46193, #bx_925308402_46255, #bx_925308402_46201").removeClass("disable");
        $(".dropdown .account").html("все для отчетности через Интернет");
    };
    if (a == "elTorg") {
        $("#bx_925308402_46259, #bx_925308402_46261, #bx_925308402_46268, #bx_925308402_, #bx_925308402_46269, #bx_925308402_46270, #bx_925308402_46271, #bx_925308402_46125, #bx_925308402_46193").removeClass("disable");
        $(".dropdown .account").html("все для электронных торгов");
    };
    if (a == "elDoc") {
            $("#bx_925308402_46264, #bx_925308402_46267, #bx_925308402_46262, #bx_925308402_46137, #bx_925308402_46265, #bx_925308402_46141, #bx_925308402_46193").removeClass("disable");
        $(".dropdown .account").html("все для электронного документооборота");    
    };


}