$(function () {

    // выпадающей nav
    $(".hidden-menu-show").mouseover(function(e){
        if ( $('.dd-block').hasClass('visible-block') && $('.hidden-menu-show').hasClass('li_hover') ){
            $('.dd-block').removeClass('visible-block');
            //$('.hidden-menu-show').removeClass("li_hover");
            $('.block'+$(e.currentTarget).attr("block-id")).addClass("visible-block");
            //$(this).closest('.hidden-menu-show').addClass('li_hover')
            return;
        } else{
            //$(this).addClass("li_hover");
            $('.block'+$(e.currentTarget).attr("block-id")).addClass("visible-block");
            return;
        };
    });

    $(".dd-block").mouseleave(function(){
        $('.dd-block').removeClass('visible-block');
        //$('.hidden-menu-show').removeClass("li_hover");
    });

    $('header').mouseenter(function(){
        $('.dd-block').removeClass('visible-block');
        //$('.hidden-menu-show').removeClass("li_hover");

    });
    $('#menuButton').on('click', function(event) {
        event.preventDefault();

        var that = $(this);
        if (that.hasClass("active")) {
            that.removeClass("active");
            $('.mm').hide();
        } else {
            that.addClass("active");
            $('.mm').fadeToggle("fast");
        }
        
    });

});

$(document).ready(function() {

    

    $(".mm-orange, .dm-li1").mouseenter(function(){
        $(".dm-li1").show();
        $('.mm').addClass('mm-orange');
    });
    $(".mm-orange, .dm-li1").mouseleave(function(event) {
        $(".dm-li1").hide();
        $('.mm').removeClass('mm-orange');
    });

    $(".mm-blue, .dm-li2").mouseenter(function(){
        $(".dm-li2").show();
        $('.mm').addClass('mm-blue');
    });
    $(".mm-blue, .dm-li2").mouseleave(function(event) {
        $(".dm-li2").hide();
        $('.mm').removeClass('mm-blue');
    });

    $(".mm-coral, .dm-li3").mouseenter(function(){
        $(".dm-li3").show();
        $('.mm').addClass('mm-coral');
    });
    $(".mm-coral, .dm-li3").mouseleave(function(event) {
        $(".dm-li3").hide();
        $('.mm').removeClass('mm-coral');
    });

    $(".mm-purple").mouseenter(function(){
        $(".dm-li4").show();
        $('.mm').addClass('mm-purple');
    });
    $(".mm-purple").mouseleave(function(event) {
        $(".dm-li4").hide();
        $('.mm').removeClass('mm-purple');
    });
    $(".mm-deep-purple").mouseenter(function(){
        $(".dm-li4").show();
        $('.mm').addClass('mm-deep-purple');
    });
    $(".mm-deep-purple").mouseleave(function(event) {
        $(".dm-li4").hide();
        $('.mm').removeClass('mm-deep-purple');
    });

    $(".mm-green, .dm-li5").mouseenter(function(){
        $(".dm-li5").show();
        $('.mm').addClass('mm-green');
    });
    $(".mm-green, .dm-li5").mouseleave(function(event) {
        $(".dm-li5").hide();
        $('.mm').removeClass('mm-green');
    });
    $(".mm-yellow, .dm-li6").mouseenter(function(){
        $(".dm-li6").show();
        $('.mm').addClass('mm-yellow');
    });
    $(".mm-yellow, .dm-li6").mouseleave(function(event) {
        $(".dm-li6").hide();
        $('.mm').removeClass('mm-yellow');
    });

    $(".mm-li7, .dm-li7").mouseenter(function(){
        $('.mm').addClass('mm-li7');
    });
    $(".mm-li7, .dm-li7").mouseleave(function(event) {
        $('.mm').removeClass('mm-li7');
    });
    $(".mm-li8, .dm-li8").mouseenter(function(){
        $('.mm').addClass('mm-li8');
    });
    $(".mm-li8, .dm-li8").mouseleave(function(event) {
        $('.mm').removeClass('mm-li8');
    });    
    $(".mm-li9, .dm-li9").mouseenter(function(){
        $('.mm').addClass('mm-li9');
    });
    $(".mm-li9, .dm-li9").mouseleave(function(event) {
        $('.mm').removeClass('mm-li9');
    });
    
    $(".mm-li10, .dm-li10").mouseenter(function(){
        $('.mm').addClass('mm-li10');
    });
    $(".mm-li10, .dm-li10").mouseleave(function(event) {
        $('.mm').removeClass('mm-li10');
    });

    $(window).off('click').on('click',function(e){
            if($('.menu-button').is('.active') && !$(e.target).is('.menu-button') && !$(e.target).closest('.mm').length){
              $('.menu-button').toggleClass("active");
              $(".mm").fadeToggle();
            }
      });
    $(".close-mm").on('click', function(event) {
        event.preventDefault();
        /* Act on the event */

        $('.menu-button').toggleClass("active");
        $(".mm").fadeToggle("fast");
    });


    
});
