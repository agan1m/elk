




/*              guid
-----------------------------------------*/
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}
return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
s4() + '-' + s4() + s4() + s4();
}

/*              /guid
-----------------------------------------*/




function validate(oForm) {
    var _validFileExtensions = [".cer"];
    var arrInputs = oForm.getElementsByTagName("input");
    for (var i = 0; i < arrInputs.length; i++) {
        var oInput = arrInputs[i];

        

        if (oInput.type == "file") {
            var sFileName = oInput.value;
            
            if (sFileName.length > 0) {
                var blnValid = false;
                for (var j = 0; j < _validFileExtensions.length; j++) {
                    var sCurExtension = _validFileExtensions[j];
                    if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                        if (oInput.files[0].type == "application/x-x509-ca-cert") {                            
                            blnValid = true;
                            console.log(oInput.files[0].type);
                            console.log("Файл принят");
                            deleteCookie("ActSessionID");
                            deleteCookie("skidka_50");
                            setCookie("ActSessionID",guid());
                            
                            var dataCer = new FormData();
                            $.each($('#form_file')[0].files, function(i, file) {
                                dataCer.append('file-'+i, file);
                            });
                            console.log(dataCer);
                            $.ajax({
                                url: '/sendCer/sendCer.php',
                                type: 'POST',
                                data: {"dataCer": $("#form_file").val()},
                                enctype: 'multipart/form-data',
                                async: false,
                                cache: false
                            })
                            .done(function() {
                                console.log("success");
                            })
                            .fail(function() {
                                console.log("error");
                            })
                            .always(function() {
                                console.log("complete");
                            });

                            window.location.replace("/shop/");
                            
                            break; 
                        }
                        
                    }
                }


                /*var sFileType = oInput.files[0].type;*/
                var sFileSize = oInput.files[0].size;

                if (!blnValid && sFileSize > 20000) {
                    alert("Извините, файл " + sFileName + " не принят, принимаем только расширение: " + _validFileExtensions.join(", ") + ", принимаем файлы объемом не более 20 Кб");
                    return false;
                } else if (!blnValid) {
                    alert("Извините, файл " + sFileName + " не принят, принимаем только расширение: " + _validFileExtensions.join(", "));
                    return false;
                } else if (blnValid && sFileSize > 20000) {
                    console.log(oInput.files[0].size);
                    alert("Извините, файл " + sFileName + " не принят, принимаем файлы объемом не более 20 Кб");
                    return false;
                }
            } else {
                alert("Файл не выбран");
            }

            
        }
    }  


    return true;
}

function joinAction(n) {
    if (n = "action50") {
        setCookie("actionTaxcom","action50");
        //window.location.replace("/shop/");
    }
}

function showServiceField() {
    $("#servicePopUp").slideToggle('fast');
}





/* Отправка ошибки */

$.ctrl = function(key, callback, args) {
    $(document).keydown(function(e) {
        if(!args) args=[]; // IE barks when args is null 
        if(e.keyCode == key && e.ctrlKey) {
            callback.apply(this, args);
            return false;
        }
    });        
};
function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

$(document).ready(function() {
    $("s").hover(function() {
        var tooltip_txt = $(this).attr("alt");
        console.log("hover");
        
        
        $(this).append('<div class="tooltip_box z-depth-2">'+tooltip_txt+'</div>').fadeIn();
        var ih = $(this).find(".tooltip_box").innerHeight();
        var iw = $(this).find(".tooltip_box").innerWidth();
        var iw2 = $(this).innerWidth();
        console.log(iw);
        console.log(iw2);
        var relativeY = $(this).find(".tooltip_box").offset().top - $(this).offset().top;
        $(this).find(".tooltip_box").css('top', '-'+(ih+8)+'px').css('left','-'+((iw/2)-(iw2/2))+'px');
    }, function() {
        $(this).find("div").fadeOut();
        $(this).find(".tooltip_box").remove();
    });

    $.ctrl(13, function() {
        
        var getSelTxt = getSelectionText();
        var getURL = window.location.href;
        
        var formData = {"getURL" : getURL, "getSelTxt": getSelTxt};
        $.fancybox({
            content     : '<div id="mistake" class="mistake"> <div id="mistake_form" class="mistake_form"> <h3>Спасибо за помощь!</h3> <h2>Напишите нам комментарий и мы обязательно исправим ошибку</h2> <div class="notice">Вы выделили</div> <textarea value="" rows="5" cols="60" name="ta_first" id="ta_first" readonly="readonly" ></textarea> <textarea value="" rows="5" cols="60" name="ta_second" id="ta_second" placeholder="Комментарий (300 символов)"></textarea><div id="reCAPTCHA_div" class="g-recaptcha" ></div><input id="mistake_submit" type="button" value="Отправить"> <div id="err_txt"></div> </div> </div>',
            maxWidth    : 530,
            autoHeight  : true,
            fitToView   : false,
            width       : '70%',
            height      : 'auto',
            autoSize    : false,
            closeClick  : false,
            openEffect  : 'none',
            closeEffect : 'none',
            padding     : 43,
            scrolling   : 'visible',
            afterLoad  :   function() {
                $.fancybox.update("#mistake");
                $("#mistake_form textarea").val("");
                $("#mistake_form #err_txt").html("");
            },
        });

        var verifyCallback_reCAPTCHA_div = function(response) {
            console.log(response);
        };
        

        var onloadCallback = function() {

            grecaptcha.render('reCAPTCHA_div', {
              'sitekey' : '6LdRyyMTAAAAAHCP37AuhUBFgacTwb4TVKv4tIJd',
              'callback' : verifyCallback_reCAPTCHA_div,
              'theme' : 'light'
          });
        };

        
        $("#ta_second").focus();
        if (getSelTxt.length <= 300) {
            $("#ta_first").val(getSelTxt);
        } else {
            $("#ta_first").val(getSelTxt);
            $("#ta_first").addClass("err");
            $("#err_txt").html("Мы не сможем исправить ошибку.<br />Выделено более 300 символов.");
        }
        
        $("#mistake_submit").click(function() {
            console.log("mistake_submit");
            var getComment = $("#ta_second").val();
            formData.getComment = getComment;
            
            if (!$("#ta_second").val()) {
                $("#err_txt").html("Мы не сможем исправить ошибку.<br />Введите комментарий.");
            } else if (getSelTxt.length > 300) {
                $("#err_txt").html("Мы не сможем исправить ошибку.<br />Выделено более 300 символов.");
            } else {
                $.ajax({
                    url: '/script/mistakeHandler.php',
                    type: 'POST',
                    dataType: 'html',
                    data: formData,
                    success: function(response) {
                        console.log(response);
                        if (response == "true") {                           
                            $.fancybox({
                                content: '<h2>Спасибо!</h2><p>Ваш комментарий отправлен</p>',
                                padding   : [33,30,33,37],
                                maxWidth  : 400,
                                autoHeight  : true,
                                fitToView : false,
                                width   : '280px',
                                height    : 'auto',
                                autoSize  : false,
                                closeClick  : false,
                                openEffect  : 'none',
                                closeEffect : 'none',
                                afterLoad  : function(){
                                    setTimeout( function() {$.fancybox.close(); },4000);
                                }
                            });
                        }                  
                    }
                });
            }
        });
        
        
    });
});

function hideOutside (container, event) {
    container = $(container);
    if (!container.is(event.target) && container.has(event.target).length === 0)
    {
        container.hide('fast');

    }
}

$(document).mouseup(function (e)
{
    var container = $("#servicePopUp");
    var button = $("#serviceField");
    var srf_ctr = $(".selectRegionField");
    var r_l = $(".region_link");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0 && !button.is(e.target) && button.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.hide('400');
    }
    if (!srf_ctr.is(e.target) // if the target of the click isn't the container...
        && srf_ctr.has(e.target).length === 0 && !r_l.is(e.target) && r_l.has(e.target).length === 0) // ... nor a descendant of the container
    {
        srf_ctr.slideUp('fast');
    }

    //hideOutside("#bannerKKT", e);
});

$(function() {
    $("#serviceField").click(function(event) {
       $("#servicePopUp").toggle('400');
   });
});




  // This is a functions that scrolls to #{blah}link
  function goToByScroll(id){
      // Remove "link" from the ID
      id = id.replace("link", "");
      // Scroll
      $('html,body').animate({
        scrollTop: $("#"+id).offset().top},
        'slow');
      return false;
  }

  var getUrlParameter = function getUrlParameter(sParam) {
      var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

      for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : sParameterName[1];
      }
  }
};

function scrollToModule(target) {
    $('html, body').animate({
        scrollTop: $("."+target).offset().top}, 200);
}


function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;
  
  ////console.log("expires " + expires);

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires*1000);
    expires = options.expires = d;
}
if (expires && expires.toUTCString) { 
    options.expires = expires.toUTCString();
}

value = encodeURIComponent(value);

var updatedCookie = name + "=" + value;

for(var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];    
    if (propValue !== true) { 
      updatedCookie += "=" + propValue;
  }
}

document.cookie = updatedCookie + ";path=/";
}


function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}


function deleteCookie(name) {
  setCookie(name, "", { expires: -1 })
}

function showAction(n) {
    $("#" + n).show("fast");
};

function closeAction(n) {
    $("#" + n).hide("fast");
};

function validate(oForm) {
    var _validFileExtensions = [".cer"];
    var arrInputs = oForm.getElementsByTagName("input");
    for (var i = 0; i < arrInputs.length; i++) {
        var oInput = arrInputs[i];

        

        if (oInput.type == "file") {
            var sFileName = oInput.value;
                        
            if (sFileName.length > 0) {
                var blnValid = false;
                for (var j = 0; j < _validFileExtensions.length; j++) {
                    var sCurExtension = _validFileExtensions[j];
                    if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                        if (oInput.files[0].type == "application/x-x509-ca-cert") {                            
                            blnValid = true;
                            console.log(oInput.files[0].type);
                            console.log("Файл принят");
                            deleteCookie("ActSessionID");
                            deleteCookie("skidka_50");
                            setCookie("ActSessionID",guid());
                            
                            var dataCer = new FormData();
                            $.each($('#form_file')[0].files, function(i, file) {
                                dataCer.append('file-'+i, file);
                            });
                            console.log(dataCer);
                            $.ajax({
                                url: '/sendCer/sendCer.php',
                                type: 'POST',
                                data: {"dataCer": $("#form_file").val()},
                                enctype: 'multipart/form-data',
                                async: false,
                                cache: false
                            })
                            .done(function() {
                                console.log("success");
                            })
                            .fail(function() {
                                console.log("error");
                            })
                            .always(function() {
                                console.log("complete");
                            });

                            window.location.replace("/shop/");
                            
                            break; 
                        }
                        
                    }
                }


                /*var sFileType = oInput.files[0].type;*/
                var sFileSize = oInput.files[0].size;

                if (!blnValid && sFileSize > 20000) {
                    alert("Извините, файл " + sFileName + " не принят, принимаем только расширение: " + _validFileExtensions.join(", ") + ", принимаем файлы объемом не более 20 Кб");
                    return false;
                } else if (!blnValid) {
                    alert("Извините, файл " + sFileName + " не принят, принимаем только расширение: " + _validFileExtensions.join(", "));
                    return false;
                } else if (blnValid && sFileSize > 20000) {
                    console.log(oInput.files[0].size);
                    alert("Извините, файл " + sFileName + " не принят, принимаем файлы объемом не более 20 Кб");
                    return false;
                }
            } else {
                alert("Файл не выбран");
            }

            
        }
    }  


    return true;
}

var TAXCOM = TAXCOM || {};
TAXCOM.namespace = function(ns_string) {
    var parts = ns_string.split('.'),
    parent = TAXCOM,
    i;

    if (parts[0] === "TAXCOM") {
        parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i +=1) {
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
}

TAXCOM.namespace("main");


TAXCOM.main = (function() {
    
    return {
        init: function () {
            TAXCOM.main.lkButton();
            TAXCOM.main.scrollTo();
            TAXCOM.main.scrollToTop();
            TAXCOM.main.downMenu();    
            TAXCOM.main.fixMainMenu();    
            
        },
        fixMainMenu: function() {
            $(window).scroll(function() {
                //$(this).scrollTop() > 150 ? $("body").addClass("scrolled") : $("body").removeClass("scrolled");
            });
        },
        lkButton: function() {
            $('#lkButton').on('click', function(event) {
                event.preventDefault();

                var that = $(this);

                if (that.hasClass("active")) {
                    that.removeClass("active");
                    that.html('Войти');
                    $('.header__lk').fadeOut("fast");
                } else {
                    that.addClass("active");
                    that.html('<i class="fa fa-times"></i>')
                    $('.header__lk').fadeIn("fast");
                }
            });
        },
        scrollTo: function() {
            $('.scroll-to').on('click', function(event) {
                event.preventDefault();
                /* Act on the event */
                var _this = $(this);
                $('html, body').animate({scrollTop: $(_this.attr('href')).offset().top}, 500);                
            });
            
        },
        scrollToTop: function() {
            $(window).scroll(function() {
                $(this).scrollTop() > 100 ? $(".scrollToTop").addClass("button-show") : $(".scrollToTop").removeClass("button-show")
            }),
            $(".scrollToTop").click(function() {
                return $("html, body").animate({
                    scrollTop: 0
                }, 800),
                !1
            });
        },
        downMenu: function() {
            $('.footer__menu--title').on('click', function(event) {
                event.preventDefault();

                var that = $(this);

                if (that.hasClass("active")) {
                    that.removeClass("active");
                    $('.footer__menu--list').show();
                } else {
                    that.addClass("active");
                    $('.footer__menu--list').hide();
                }
            });
        },
        rules50: function() {
            
            
        },
    }
}());

$(document).ready(function() {
    TAXCOM.main.init();


});


