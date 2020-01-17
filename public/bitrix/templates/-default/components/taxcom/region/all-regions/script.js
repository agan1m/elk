$(document).ready(function() {
    //$("#servicePopUp").toggle('400');
    //$("#serviceField").toggle("400");
    /*function hideShowServiceField() {
        $("#servicePopUp").toggle('400');
    }*/
    



});

function changeRegion (name) {
    //alert(name);
    if (!name) {
        changeRegion($('#regionID').val());
    } else {
        //alert(name);
        var selectRegion = name;
        var redirectUrl = '';

    //setCookie("isRightRegion","true");

    $("#region_link .form_select select").find('option').each(function() {
        if($(this).val() == selectRegion) {
            redirectUrl = $(this).attr('data-url');
        }
    });

    var currentRegion = $.cookie("REGION_ID");
    //alert(currentRegion);
    //$.cookie("REGION_ID", null); //$.cookie("REGION_ID", null, {domain:'.taxcom.ru'});
    $.removeCookie('REGION_ID', { path: '/' });
    $.removeCookie('REGION_ID_NEW_USER', { path: '/' });
    $.cookie("REGION_ID", selectRegion, {domain: '.taxcom.ru', path: '/',expires: 366}); //$.cookie("REGION_ID", selectRegion, {path: '/',expires: 366});

    if(currentRegion != selectRegion) {

        // Если регион 77/50
        if(currentRegion == 12 && selectRegion == 13) location.reload();
        else if(selectRegion == 12 && currentRegion == 13) location.reload();
        // Если регион 78/47
        else if(selectRegion == 14 && currentRegion == 15) location.reload();
        else if(currentRegion == 14 && selectRegion == 15) location.reload();
        // Если регион 52
        else if(selectRegion == 16 && currentRegion == 70) location.reload();
        else if(currentRegion == 16 && selectRegion == 70) location.reload();
        // Если регион 54
        else if(selectRegion == 17 && currentRegion == 72) location.reload();
        else if(currentRegion == 17 && selectRegion == 72) location.reload();
        // Если регион 60
        else if(selectRegion == 18 && currentRegion == 78) location.reload();
        else if(currentRegion == 18 && selectRegion == 78) location.reload();
        // Если регион 61
        else if(selectRegion == 19 && currentRegion == 79) location.reload();
        else if(currentRegion == 19 && selectRegion == 79) location.reload();
        // Если регион 66
        else if(selectRegion == 20 && currentRegion == 84) location.reload();
        else if(currentRegion == 20 && selectRegion == 84) location.reload();
        else {
            $.post('/shop/ajax/delete_all.php', function(data) {
                if(redirectUrl != undefined && redirectUrl != '') {window.location.href = redirectUrl;}
                else {location.reload();}
            });
        }

    } else {
        if(redirectUrl != undefined && redirectUrl != '') {window.location.href = redirectUrl;}
        else {location.reload();}
    }
}

}

$(function() {
    

    $("#linkByNumber").click(function(event) {
        $("#linkByABC").removeClass('selected');
        $("#linkByNumber").addClass('selected');
        $(".selectByABC").hide();
        $(".selectByNumber").show();
    });

    $("#linkByABC").click(function(event) {
        $("#linkByNumber").removeClass('selected');
        $("#linkByABC").addClass('selected');
        $(".selectByABC").show();
        $(".selectByNumber").hide();
    });

 $(".region_link").click(function(event) {
        $(".selectRegionField").slideToggle("fast");
        $(".questionRegion").hide();

    });    

    $(".closeRegionField").click(function(event) {
        $(".selectRegionField").slideUp("fast")
    });   
    


    $("#sort_01_09").click(function(event) {
        $(".numbers li a").removeClass('selected');
        $(this).addClass('selected');
        $("#regionNumbersContainer").html('<ul class="regionNumbers">\
            <li>(01) <a onclick="changeRegion(21)" href="javascript:void(0);">Республика Адыгея</a></li>                          \
            <li>(02) <a onclick="changeRegion(22)" href="javascript:void(0);">Республика Башкортостан</a></li>                    \
            <li>(03) <a onclick="changeRegion(23)" href="javascript:void(0);">Республика Бурятия</a></li>                         \
            <li>(04) <a onclick="changeRegion(24)" href="javascript:void(0);">Республика Алтай</a></li>                           \
            <li>(05) <a onclick="changeRegion(25)" href="javascript:void(0);">Республика Дагестан</a></li>                        \
            <li>(06) <a onclick="changeRegion(26)" href="javascript:void(0);">Республика Ингушетия</a></li>                       \
            <li>(07) <a onclick="changeRegion(27)" href="javascript:void(0);">Кабардино-Балкарская Республика</a></li></ul>            \
            <ul class="regionNumbers">\
            <li>(08) <a onclick="changeRegion(28)" href="javascript:void(0);">Республика Калмыкия</a></li>                        \
            <li>(09) <a onclick="changeRegion(29)" href="javascript:void(0);">Карачаево-Черкесская Республика</a></li></ul>');
    });

    $("#sort_10_19").click(function(event) {
        $(".numbers li a").removeClass('selected');
        $(this).addClass('selected');
        $("#regionNumbersContainer").html('\
            <ul class="regionNumbers">                                                                                                    \
            <li>(10) <a onclick="changeRegion(30)" href="javascript:void(0);">Республика Карелия</a></li>                          \
            <li>(11) <a onclick="changeRegion(31)" href="javascript:void(0);">Республика Коми</a></li>                    \
            <li>(12) <a onclick="changeRegion(32)" href="javascript:void(0);">Республика Марий Эл</a></li>                         \
            <li>(13) <a onclick="changeRegion(33)" href="javascript:void(0);">Республика Мордовия</a></li>                           \
            <li>(14) <a onclick="changeRegion(34)" href="javascript:void(0);">Республика Саха (Якутия)</a></li>                        \
            <li>(15) <a onclick="changeRegion(35)" href="javascript:void(0);">Республика Северная Осетия</a></li>                       \
            <li>(16) <a onclick="changeRegion(36)" href="javascript:void(0);">Республика Татарстан</a></li></ul>            \
            <ul class="regionNumbers">                                                                                              \
            <li>(17) <a onclick="changeRegion(37)" href="javascript:void(0);">Республика Тыва (Тува)</a></li>                        \
            <li>(18) <a onclick="changeRegion(38)" href="javascript:void(0);">Удмуртская Республика</a></li>                  \
            <li>(19) <a onclick="changeRegion(39)" href="javascript:void(0);">Республика Хакасия</a></li></ul>');
    });
    $("#sort_20_29").click(function(event) {
        $(".numbers li a").removeClass('selected');
        $(this).addClass('selected');
        $("#regionNumbersContainer").html('<ul class="regionNumbers">\
            <li>(20) <a onclick="changeRegion(40)" href="javascript:void(0);">Чеченская Республика</a></li>                          \
            <li>(21) <a onclick="changeRegion(41)" href="javascript:void(0);">Чувашская Республика</a></li>                    \
            <li>(22) <a onclick="changeRegion(42)" href="javascript:void(0);">Алтайский край</a></li>                         \
            <li>(23) <a onclick="changeRegion(43)" href="javascript:void(0);">Краснодарский край</a></li>                           \
            <li>(24) <a onclick="changeRegion(44)" href="javascript:void(0);">Красноярский край</a></li>                        \
            <li>(25) <a onclick="changeRegion(45)" href="javascript:void(0);">Приморский край</a></li>                       \
            <li>(26) <a onclick="changeRegion(46)" href="javascript:void(0);">Ставропольский край</a></li></ul>            \
            <ul class="regionNumbers">\
            <li>(27) <a onclick="changeRegion(47)" href="javascript:void(0);">Хабаровский край</a></li>                        \
            <li>(28) <a onclick="changeRegion(48)" href="javascript:void(0);">Амурская область</a></li>                  \
            <li>(29) <a onclick="changeRegion(49)" href="javascript:void(0);">Архангельская область</a></li></ul>');
    });
    $("#sort_30_39").click(function(event) {
        $(".numbers li a").removeClass('selected');
        $(this).addClass('selected');
        $("#regionNumbersContainer").html('<ul class="regionNumbers">\
            <li>(30) <a onclick="changeRegion(50)" href="javascript:void(0);">Астраханская область</a></li>                          \
            <li>(31) <a onclick="changeRegion(51)" href="javascript:void(0);">Белгородская область</a></li>                    \
            <li>(32) <a onclick="changeRegion(52)" href="javascript:void(0);">Брянская область</a></li>                         \
            <li>(33) <a onclick="changeRegion(53)" href="javascript:void(0);">Владимирская область</a></li>                           \
            <li>(34) <a onclick="changeRegion(54)" href="javascript:void(0);">Волгоградская область</a></li>                        \
            <li>(35) <a onclick="changeRegion(55)" href="javascript:void(0);">Вологодская область</a></li>                       \
            <li>(36) <a onclick="changeRegion(56)" href="javascript:void(0);">Воронежская область</a></li></ul>            \
            <ul class="regionNumbers">\
            <li>(37) <a onclick="changeRegion(57)" href="javascript:void(0);">Ивановская область</a></li>                        \
            <li>(38) <a onclick="changeRegion(58)" href="javascript:void(0);">Иркутская область</a></li>                  \
            <li>(39) <a onclick="changeRegion(59)" href="javascript:void(0);">Калининградская область</a></li></ul>');
    });

    $("#sort_40_49").click(function(event) {
        $(".numbers li a").removeClass('selected');
        $(this).addClass('selected');
        $("#regionNumbersContainer").html('<ul class="regionNumbers">\
            <li>(40) <a onclick="changeRegion(60)" href="javascript:void(0);">Калужская область</a></li>                          \
            <li>(41) <a onclick="changeRegion(61)" href="javascript:void(0);">Камчатская область</a></li>                    \
            <li>(42) <a onclick="changeRegion(62)" href="javascript:void(0);">Кемеровская область</a></li>                         \
            <li>(43) <a onclick="changeRegion(63)" href="javascript:void(0);">Кировская область</a></li>                           \
            <li>(44) <a onclick="changeRegion(64)" href="javascript:void(0);">Костромская область</a></li>                        \
            <li>(45) <a onclick="changeRegion(65)" href="javascript:void(0);">Курганская область</a></li>                       \
            <li>(46) <a onclick="changeRegion(66)" href="javascript:void(0);">Курская область</a></li></ul>            \
            <ul class="regionNumbers">\
            <li>(47) <a onclick="changeRegion(15)" href="javascript:void(0);">Ленинградская область</a></li>                        \
            <li>(48) <a onclick="changeRegion(67)" href="javascript:void(0);">Липецкая область</a></li>                  \
            <li>(49) <a onclick="changeRegion(68)" href="javascript:void(0);">Магаданская область</a></li></ul>');
    });

    $("#sort_50_59").click(function(event) {
        $(".numbers li a").removeClass('selected');
        $(this).addClass('selected');
        $("#regionNumbersContainer").html('<ul class="regionNumbers">\
            <li>(50) <a onclick="changeRegion(13)" href="javascript:void(0);">Московская область</a></li>                          \
            <li>(51) <a onclick="changeRegion(69)" href="javascript:void(0);">Мурманская область</a></li>                    \
            <li>(52) <a onclick="changeRegion(70)" href="javascript:void(0);">Нижегородская область</a></li>                           \
            <li>(53) <a onclick="changeRegion(71)" href="javascript:void(0);">Новгородская область</a></li>                        \
            <li>(54) <a onclick="changeRegion(72)" href="javascript:void(0);">Новосибирская область</a></li></ul>            \
            <ul class="regionNumbers">\
            <li>(55) <a onclick="changeRegion(73)" href="javascript:void(0);">Омская область</a></li>                        \
            <li>(56) <a onclick="changeRegion(74)" href="javascript:void(0);">Оренбургская область</a></li>                  \
            <li>(57) <a onclick="changeRegion(75)" href="javascript:void(0);">Орловская область</a></li>                \
            <li>(58) <a onclick="changeRegion(76)" href="javascript:void(0);">Пензенская область</a></li>                \
            <li>(59) <a onclick="changeRegion(77)" href="javascript:void(0);">Пермский край</a></li></ul>');
    });

    $("#sort_60_69").click(function(event) {
        $(".numbers li a").removeClass('selected');
        $(this).addClass('selected');
        $("#regionNumbersContainer").html('<ul class="regionNumbers">\
            <li>(60) <a onclick="changeRegion(78)" href="javascript:void(0);">Псковская область</a></li>                    \
            <li>(61) <a onclick="changeRegion(79)" href="javascript:void(0);">Ростовская область</a></li>                           \
            <li>(62) <a onclick="changeRegion(80)" href="javascript:void(0);">Рязанская область</a></li>                        \
            <li>(63) <a onclick="changeRegion(81)" href="javascript:void(0);">Самарская область</a></li>                       \
            <li>(64) <a onclick="changeRegion(82)" href="javascript:void(0);">Саратовская область</a></li></ul>            \
            <ul class="regionNumbers">\
            <li>(65) <a onclick="changeRegion(83)" href="javascript:void(0);">Сахалинская область</a></li>                        \
            <li>(66) <a onclick="changeRegion(84)" href="javascript:void(0);">Свердловская область</a></li>                \
            <li>(67) <a onclick="changeRegion(85)" href="javascript:void(0);">Смоленская область</a></li>                \
            <li>(68) <a onclick="changeRegion(86)" href="javascript:void(0);">Тамбовская область</a></li>                 \
            <li>(69) <a onclick="changeRegion(87)" href="javascript:void(0);">Тверская область</a></li></ul>');
    });
    $("#sort_70_79").click(function(event) {
        $(".numbers li a").removeClass('selected');
        $(this).addClass('selected');
        $("#regionNumbersContainer").html('<ul class="regionNumbers">\
            <li>(70) <a onclick="changeRegion(88)" href="javascript:void(0);">Томская область</a></li>                          \
            <li>(71) <a onclick="changeRegion(89)" href="javascript:void(0);">Тульская область</a></li>                    \
            <li>(72) <a onclick="changeRegion(90)" href="javascript:void(0);">Тюменская область</a></li>                         \
            <li>(73) <a onclick="changeRegion(91)" href="javascript:void(0);">Ульяновская область</a></li>                           \
            <li>(74) <a onclick="changeRegion(92)" href="javascript:void(0);">Челябинская область</a></li>                        \
            <li>(75) <a onclick="changeRegion(93)" href="javascript:void(0);">Забайкальский край</a></li>                       \
            <li>(76) <a onclick="changeRegion(94)" href="javascript:void(0);">Ярославская область</a></li></ul>            \
            <ul class="regionNumbers">\
            <li>(77) <a onclick="changeRegion(12)" href="javascript:void(0);">Москва</a></li>                        \
            <li>(78) <a onclick="changeRegion(14)" href="javascript:void(0);">Санкт-Петербург</a></li>                  \
            <li>(79) <a onclick="changeRegion(95)" href="javascript:void(0);">Еврейская автономная область</a></li></ul>');
    });

    $("#sort_80_89").click(function(event) {
        $(".numbers li a").removeClass('selected');
        $(this).addClass('selected');
        $("#regionNumbersContainer").html('<ul class="regionNumbers">\
            <li>(83) <a onclick="changeRegion(96)" href="javascript:void(0);">Ненецкий автономный округ</a></li>                          \
            <li>(86) <a onclick="changeRegion(97)" href="javascript:void(0);">Ханты-Мансийский автономный округ</a></li>                    \
            <li>(87) <a onclick="changeRegion(98)" href="javascript:void(0);">Чукотский автономный округ</a></li>                         \
            <li>(89) <a onclick="changeRegion(99)" href="javascript:void(0);">Ямало-Ненецкий автономный округ</a></li></ul>');
    });



    $("#sort_90_99").click(function(event) {
        $(".numbers li a").removeClass('selected');
        $(this).addClass('selected');
        $("#regionNumbersContainer").html('<ul class="regionNumbers">\
            <li>(91) <a onclick="changeRegion(216056)" href="javascript:void(0);">Республика Крым</a></li>                          \
            <li>(92) <a onclick="changeRegion(4662)" href="javascript:void(0);">Севастополь</a></li>\
            <li>(99) <a onclick="changeRegion(211492)" href="javascript:void(0);">Байконур</a></li></ul>');

    });

    $("#selectByA").click(function(event) {
        $(".ABC li a").removeClass('selected');
        $(this).addClass('selected');
        $("#regionContainer").html('<ul class="region">\
            <li>(22) <a onclick="changeRegion(42)" href="javascript:void(0);">Алтайский край</a></li>                   \
            <li>(28) <a onclick="changeRegion(48)" href="javascript:void(0);">Амурская область</a></li>                 \
            <li>(29) <a onclick="changeRegion(49)" href="javascript:void(0);">Архангельская область</a></li>            \
            <li>(30) <a onclick="changeRegion(50)" href="javascript:void(0);">Астраханская область</a></li></ul>');
    })
    $("#selectByB").click(function(event) {
        $(".ABC li a").removeClass('selected');
        $(this).addClass('selected');
        $("#regionContainer").html('<ul class="region">\
            <li>(99) <a onclick="changeRegion(211492)" href="javascript:void(0);">Байконур</a></li> \
            <li>(31) <a onclick="changeRegion(51)" href="javascript:void(0);">Белгородская область</a></li>                    \
            <li>(32) <a onclick="changeRegion(52)" href="javascript:void(0);">Брянская область</a></li></ul>');
    });

    $("#selectByV").click(function(event) {
        $(".ABC li a").removeClass('selected');
        $(this).addClass('selected');
        $("#regionContainer").html('<ul class="region">\
            <li>(33) <a onclick="changeRegion(53)" href="javascript:void(0);">Владимирская область</a></li>                           \
            <li>(34) <a onclick="changeRegion(54)" href="javascript:void(0);">Волгоградская область</a></li>                        \
            <li>(35) <a onclick="changeRegion(55)" href="javascript:void(0);">Вологодская область</a></li>                       \
            <li>(36) <a onclick="changeRegion(56)" href="javascript:void(0);">Воронежская область</a></li></ul>');
    });

    $("#selectByE").click(function(event) {
        $(".ABC li a").removeClass('selected');
        $(this).addClass('selected');
        $("#regionContainer").html('<ul class="region">\
            <li>(79) <a onclick="changeRegion(95)" href="javascript:void(0);">Еврейская автономная область</a></li></ul>');
    });    

    $("#selectByZ").click(function(event) {
        $(".ABC li a").removeClass('selected');
        $(this).addClass('selected');
        $("#regionContainer").html('<ul class="region">\
            <li>(75) <a onclick="changeRegion(93)" href="javascript:void(0);">Забайкальский край</a></li></ul>');
    });    


    $("#selectByI").click(function(event) {
        $(".ABC li a").removeClass('selected');
        $(this).addClass('selected');
        $("#regionContainer").html('<ul class="region">                 \
            <li>(37) <a onclick="changeRegion(57)" href="javascript:void(0);">Ивановская область</a></li>                        \
            <li>(38) <a onclick="changeRegion(58)" href="javascript:void(0);">Иркутская область</a></li></ul>');
    });    

    $("#selectByK").click(function(event) {
        $(".ABC li a").removeClass('selected');
        $(this).addClass('selected');
        $("#regionContainer").html('<ul class="region">        \
            <li>(07) <a onclick="changeRegion(27)" href="javascript:void(0);">Кабардино-Балкарская Республика</a></li>              \
            <li>(09) <a onclick="changeRegion(29)" href="javascript:void(0);">Карачаево-Черкесская Республика</a></li>               \
            <li>(39) <a onclick="changeRegion(59)" href="javascript:void(0);">Калининградская область</a></li>      \
            <li>(40) <a onclick="changeRegion(60)" href="javascript:void(0);">Калужская область</a></li>                          \
            <li>(41) <a onclick="changeRegion(61)" href="javascript:void(0);">Камчатская область</a></li>                    \
            <li>(42) <a onclick="changeRegion(62)" href="javascript:void(0);">Кемеровская область</a></li>                         \
            <li>(43) <a onclick="changeRegion(63)" href="javascript:void(0);">Кировская область</a></li></ul>               \
            <ul class="region">        \
            <li>(44) <a onclick="changeRegion(64)" href="javascript:void(0);">Костромская область</a></li>                        \
            <li>(45) <a onclick="changeRegion(65)" href="javascript:void(0);">Курганская область</a></li>                       \
            <li>(46) <a onclick="changeRegion(66)" href="javascript:void(0);">Курская область</a></li>                  \
            <li>(23) <a onclick="changeRegion(43)" href="javascript:void(0);">Краснодарский край</a></li>                           \
            <li>(24) <a onclick="changeRegion(44)" href="javascript:void(0);">Красноярский край</a></li>                \
            </ul>');
    });

    $("#selectByL").click(function(event) {
        $(".ABC li a").removeClass('selected');
        $(this).addClass('selected');
        $("#regionContainer").html('<ul class="region">\
            <li>(47) <a onclick="changeRegion(15)" href="javascript:void(0);">Ленинградская область</a></li>                        \
            <li>(48) <a onclick="changeRegion(67)" href="javascript:void(0);">Липецкая область</a></li></ul>');
    });

    $("#selectByM").click(function(event) {
        $(".ABC li a").removeClass('selected');
        $(this).addClass('selected');
        $("#regionContainer").html('<ul class="region">\
            <li>(49) <a onclick="changeRegion(68)" href="javascript:void(0);">Магаданская область</a></li>                        \
            <li>(77) <a onclick="changeRegion(12)" href="javascript:void(0);">Москва</a></li>                       \
            <li>(50) <a onclick="changeRegion(13)" href="javascript:void(0);">Московская область</a></li>           \
            <li>(51) <a onclick="changeRegion(69)" href="javascript:void(0);">Мурманская область</a></li></ul>');
    });    

    $("#selectByN").click(function(event) {
        $(".ABC li a").removeClass('selected');
        $(this).addClass('selected');
        $("#regionContainer").html('<ul class="region">\
            <li>(83) <a onclick="changeRegion(96)" href="javascript:void(0);">Ненецкий автономный округ</a></li>            \
            <li>(52) <a onclick="changeRegion(70)" href="javascript:void(0);">Нижегородская область</a></li>                           \
            <li>(53) <a onclick="changeRegion(71)" href="javascript:void(0);">Новгородская область</a></li>                        \
            <li>(54) <a onclick="changeRegion(72)" href="javascript:void(0);">Новосибирская область</a></li></ul>');
    });

    $("#selectByO").click(function(event) {
        $(".ABC li a").removeClass('selected');
        $(this).addClass('selected');
        $("#regionContainer").html('<ul class="region">\
            <li>(55) <a onclick="changeRegion(73)" href="javascript:void(0);">Омская область</a></li>                        \
            <li>(56) <a onclick="changeRegion(74)" href="javascript:void(0);">Оренбургская область</a></li>                  \
            <li>(57) <a onclick="changeRegion(75)" href="javascript:void(0);">Орловская область</a></li></ul>');
    });    

    $("#selectByP").click(function(event) {
        $(".ABC li a").removeClass('selected');
        $(this).addClass('selected');
        $("#regionContainer").html('<ul class="region">\
            <li>(58) <a onclick="changeRegion(76)" href="javascript:void(0);">Пензенская область</a></li>                \
            <li>(59) <a onclick="changeRegion(77)" href="javascript:void(0);">Пермский край</a></li>                    \
            <li>(25) <a onclick="changeRegion(45)" href="javascript:void(0);">Приморский край</a></li>                       \
            <li>(60) <a onclick="changeRegion(78)" href="javascript:void(0);">Псковская область</a></li></ul>');
    });


    $("#selectByR").click(function(event) {
        $(".ABC li a").removeClass('selected');
        $(this).addClass('selected');
        $("#regionContainer").html('<ul class="region">\
            <li>(01) <a onclick="changeRegion(21)" href="javascript:void(0);">Республика Адыгея</a></li>                          \
            <li>(04) <a onclick="changeRegion(24)" href="javascript:void(0);">Республика Алтай</a></li>                           \
            <li>(02) <a onclick="changeRegion(22)" href="javascript:void(0);">Республика Башкортостан</a></li>                    \
            <li>(03) <a onclick="changeRegion(23)" href="javascript:void(0);">Республика Бурятия</a></li>                         \
            <li>(05) <a onclick="changeRegion(25)" href="javascript:void(0);">Республика Дагестан</a></li>                        \
            <li>(06) <a onclick="changeRegion(26)" href="javascript:void(0);">Республика Ингушетия</a></li>                 \
            <li>(08) <a onclick="changeRegion(28)" href="javascript:void(0);">Республика Калмыкия</a></li></ul>                      \
            <ul class="region">                                                                                                    \
            <li>(10) <a onclick="changeRegion(30)" href="javascript:void(0);">Республика Карелия</a></li>                          \
            <li>(11) <a onclick="changeRegion(31)" href="javascript:void(0);">Республика Коми</a></li>                      \
            <li>(91) <a onclick="changeRegion(216056)" href="javascript:void(0);">Республика Крым</a></li>                    \
            <li>(12) <a onclick="changeRegion(32)" href="javascript:void(0);">Республика Марий Эл</a></li>                         \
            <li>(13) <a onclick="changeRegion(33)" href="javascript:void(0);">Республика Мордовия</a></li>                           \
            <li>(14) <a onclick="changeRegion(34)" href="javascript:void(0);">Республика Саха (Якутия)</a></li>                        \
            <li>(15) <a onclick="changeRegion(35)" href="javascript:void(0);">Республика Северная Осетия</a></li></ul>                       \
            <ul class="region" style="margin-right: 0px;">                                                                             \
            <li>(16) <a onclick="changeRegion(36)" href="javascript:void(0);">Республика Татарстан</a></li>            \
            <li>(17) <a onclick="changeRegion(37)" href="javascript:void(0);">Республика Тыва (Тува)</a></li>               \
            <li>(19) <a onclick="changeRegion(39)" href="javascript:void(0);">Республика Хакасия</a></li>                    \
            <li>(61) <a onclick="changeRegion(79)" href="javascript:void(0);">Ростовская область</a></li>                           \
            <li>(62) <a onclick="changeRegion(80)" href="javascript:void(0);">Рязанская область</a></li></ul>');
    });

    $("#selectByS").click(function(event) {
        $(".ABC li a").removeClass('selected');
        $(this).addClass('selected');
        $("#regionContainer").html('<ul class="region">\
            <li>(26) <a onclick="changeRegion(46)" href="javascript:void(0);">Ставропольский край</a></li>              \
            <li>(63) <a onclick="changeRegion(81)" href="javascript:void(0);">Самарская область</a></li>                       \
            <li>(64) <a onclick="changeRegion(82)" href="javascript:void(0);">Саратовская область</a></li>            \
            <li>(65) <a onclick="changeRegion(83)" href="javascript:void(0);">Сахалинская область</a></li>                  \
            <li>(66) <a onclick="changeRegion(84)" href="javascript:void(0);">Свердловская область</a></li>                \
            <li>(67) <a onclick="changeRegion(85)" href="javascript:void(0);">Смоленская область</a></li>                   \
            <li>(78) <a onclick="changeRegion(14)" href="javascript:void(0);">Санкт-Петербург</a></li>                  \
            <li>(92) <a onclick="changeRegion(4662)" href="javascript:void(0);">Севастополь</a></li></ul>');
    });

    $("#selectByT").click(function(event) {
        $(".ABC li a").removeClass('selected');
        $(this).addClass('selected');
        $("#regionContainer").html('<ul class="region">\
            <li>(68) <a onclick="changeRegion(86)" href="javascript:void(0);">Тамбовская область</a></li>                 \
            <li>(69) <a onclick="changeRegion(87)" href="javascript:void(0);">Тверская область</a></li>                 \
            <li>(70) <a onclick="changeRegion(88)" href="javascript:void(0);">Томская область</a></li>                          \
            <li>(71) <a onclick="changeRegion(89)" href="javascript:void(0);">Тульская область</a></li>                    \
            <li>(72) <a onclick="changeRegion(90)" href="javascript:void(0);">Тюменская область</a></li></ul>');
    });

    $("#selectByU").click(function(event) {
        $(".ABC li a").removeClass('selected');
        $(this).addClass('selected');
        $("#regionContainer").html('<ul class="region">\
            <li>(18) <a onclick="changeRegion(38)" href="javascript:void(0);">Удмуртская Республика</a></li>            \
            <li>(73) <a onclick="changeRegion(91)" href="javascript:void(0);">Ульяновская область</a></li></ul>');
    });

    $("#selectByH").click(function(event) {
        $(".ABC li a").removeClass('selected');
        $(this).addClass('selected');
        $("#regionContainer").html('<ul class="region">\
            <li>(27) <a onclick="changeRegion(47)" href="javascript:void(0);">Хабаровский край</a></li>                         \
            <li>(86) <a onclick="changeRegion(97)" href="javascript:void(0);">Ханты-Мансийский автономный округ</a></li></ul>');
    });

    $("#selectByCH").click(function(event) {
        $(".ABC li a").removeClass('selected');
        $(this).addClass('selected');
        $("#regionContainer").html('<ul class="region">\
            <li>(20) <a onclick="changeRegion(40)" href="javascript:void(0);">Чеченская Республика</a></li>                          \
            <li>(21) <a onclick="changeRegion(41)" href="javascript:void(0);">Чувашская Республика</a></li>             \
            <li>(74) <a onclick="changeRegion(92)" href="javascript:void(0);">Челябинская область</a></li>                          \
            <li>(87) <a onclick="changeRegion(98)" href="javascript:void(0);">Чукотский автономный округ</a></li></ul>');
    });

    $("#selectByYA").click(function(event) {
        $(".ABC li a").removeClass('selected');
        $(this).addClass('selected');
        $("#regionContainer").html('<ul class="region">\
            <li>(76) <a onclick="changeRegion(94)" href="javascript:void(0);">Ярославская область</a></li>                          \
            <li>(89) <a onclick="changeRegion(99)" href="javascript:void(0);">Ямало-Ненецкий автономный округ</a></li></ul>');
    });

});