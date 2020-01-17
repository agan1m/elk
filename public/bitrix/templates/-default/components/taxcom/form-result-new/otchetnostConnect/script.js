$(document).ready(function(){

    

    //Вопрос "Другая"
    $("#form_text_300").hide();
    $("input[value='299']").click(function(event) {
        $("#form_text_300").show();
        $.fancybox.update();
    });
    $("input[value='241'], input[value='240']").click(function(event) {
        $("#form_text_300").hide();
        $.fancybox.update();
    });
    $("input[name='form_text_793']").mask("+7 (999) 999-99-99", {placeholder: " " });
    $("input[name='form_text_797']").mask("+7 (999) 999-99-99", {placeholder: " " });
    $("input[name='form_text_802']").mask("+7 (999) 999-99-99", {placeholder: " " });
    
    $(".fbx2").fancybox({            
            autoHeight  : true,
            fitToView   : true,
            width       : '70%',
            height      : 'auto',
            autoSize    : true,
            closeClick  : false,
            openEffect  : 'none',
            closeEffect : 'none',
            padding     : 43,
            scrolling   : 'visible',
            afterLoad  :   function() {
            $("#SEMINAR_FORM input[type='text']").val("");
            $("#SEMINAR_FORM label.error").hide();
        },
        });

    jQuery.extend(jQuery.validator.messages, {
        required: "",
        remote: "Please fix this field.",
        email: "Пожалуйста, введите правильный e-mail",
        url: "Please enter a valid URL.",
        date: "Please enter a valid date.",
        dateISO: "Please enter a valid date (ISO).",
        number: "Please enter a valid number.",
        digits: "Please enter only digits.",
        creditcard: "Please enter a valid credit card number.",
        equalTo: "Please enter the same value again.",
        accept: "Please enter a value with a valid extension.",
        maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
        minlength: jQuery.validator.format("Please enter at least {0} characters."),
        rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
        range: jQuery.validator.format("Please enter a value between {0} and {1}."),
        max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
        min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
    });

    $("#SEMINAR_FORM").validate({
    rules:{
        form_text_874:{
            required: true,
        },
        form_text_875:{
            required: true,
        },
        form_text_214:{
            required: true,
        },
        form_text_215:{
            required: true,
        },
        form_text_217:{
            required: true,
        },
        form_text_219:{
            digits: true,
            required: true,
        }        
    },

});
    $("#CALLBACK_TESTDRIVE").validate({
    rules:{
        form_text_874:{
            required: true,
        },
        form_text_875:{
            required: true,
        },
      
    },

});
    $("#CALLBACK_MORE").validate({
    rules:{
        form_text_884:{
            required: true,
        },
        form_text_885:{
            required: true,
        },
      
    },

});

    /*$("#submitDemo").click(function(event) {
        console.log("click");
        setTimeout($(this).prop('disabled', true), 1500);
    });*/

});
