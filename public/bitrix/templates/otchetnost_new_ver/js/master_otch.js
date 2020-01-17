
var vue = new Vue({
  el: '#masterOtch',

  methods: {
    connect: function(item) {
      
      /*$.fancybox.open({
        src: '#saleWindow',
        type: 'inline',
        opts : {
            beforeShow : function( instance, current ) {
              $('#saleTariffName').html(item.tariff.name);
              $('#saleTariffPrice').html(price + ' <span class="rouble"></span> /год');
              $('#oneClick').attr('href', item.tariff.url);
              $('#checkOrder').on('click', function(event) {
                event.preventDefault();
                $.fancybox.close();
                $.fancybox.open({
                  src:'#connectForm',
                  type: 'inline',
                  opts : {
                    beforeShow : function( instance, current ) {
                      var selectTariff = item.tariff.name + " за " + price + " рублей";
                      $('#form_hidden_823').attr('value', selectTariff);
                    }
                  }
                });
              });
            }
          }
      });*/
      console.log("this.current_region_id: " + this.current_region_id);
      if (this.current_region_id == "12" || this.current_region_id == "13") {
        price = item.tariff.price_77;
      } else {
        price = item.tariff.price_00;
      }
      console.log("fancybox");


      $.fancybox.open("#saleWindow", {
        height: 'inline',
        autoHeight: true,
        scrolling: 'no',
        padding: 25,
        fitToView : false,
        autoSize  : false,
        beforeShow: function(){
          if (getCookie("taxcom_utm_source")) {
            var onlineLink = item.tariff.url + "&utm_source=" + getCookie("taxcom_utm_source") + "&utm_medium=" + getCookie("taxcom_utm_medium") + "&utm_campaign=" + getCookie("taxcom_utm_campaign") + "&utm_content=" + getCookie("taxcom_utm_content") + "&utm_term=" + getCookie("taxcom_utm_term");
          } else {
            var onlineLink = item.tariff.url;
          }
                   
          $('#saleTariffName').html(item.tariff.name);
          $('#saleTariffPrice').html(price + ' <span class="rouble"></span> /год');
          $('#byOnline').attr('href', onlineLink);
          $("#byOnline").hover(function() {
            $('#btnDescription').html($(this).attr("data-description"));
          }, function() {
            $('#btnDescription').html("");
          });
          $("#byPhone").hover(function() {
            $('#btnDescription').html($(this).attr("data-description"));
          }, function() {
            $('#btnDescription').html("");
          });
          $('#byPhone').on('click', function(event) {
            event.preventDefault();
            $.fancybox.close();
            $.fancybox.open('#connectForm', {
              height: 'inline',
              autoHeight: true,
              scrolling: 'no',
              padding: 25,
              fitToView : false,
              autoSize  : false,
                beforeShow : function() {
                  var selectTariff = item.tariff.name + " за " + price + " рублей";
                  $('#form_hidden_795').attr('value', selectTariff);
                }              
            });
          });
        }
      });
    },
    getCookie: function(name) {
    	console.log("getCookie ->");
      var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
      return matches ? decodeURIComponent(matches[1]) : 'undefined';
    },
    onChange: function() {
      console.log("-> onChange");
      this.showTable = true;
      this.preloading = true;
      $(".master-otch").addClass("open");
      setTimeout(function() {this.preloading = false}.bind(this), 500);
      
      if ($(window).width() < 960) {
         setTimeout(function() {$('html, body').animate({scrollTop: $('.tariff-plate').offset().top}, 200)}.bind(this), 1000);
      }
      else {
         setTimeout(function() {$('html, body').animate({scrollTop: $('.tariff-table').offset().top}, 200)}.bind(this), 1000);
      }
      this.collectDATA();
    },
    test: function() {
      this.showTable = true;
      $(".master-otch").addClass("open");
      this.tariff = [
        //Первый шаг
        {
          tariff: this.tariffsData[7],
          recommended: true
        },
        //Ваш старт
        {
          tariff: this.tariffsData[6],
          recommended: false
        },
        //Ваш выбор
        {
          tariff: this.tariffsData[1],
          recommended: false
        },        
      ];
    },
   collectDATA: function() {

 	  console.log("collectDATA");
    var settings = [],
    digit = '',
    collection = '',
    countDirection = '';


    //$('html, body').animate({scrollTop: $('.tariff-table').offset().top}, 200);

    countDirection = this.direction.filter(Boolean).length;
    //console.log(countDirection);

    //countDirection > 1 ? this.count = "от" : this.count = "";
    this.count = "от"
    
    settings = [!!+this.tax_mode, !!+this.workplace];

    for (var i = 0; i < 2; i++) {
     digit += settings[i] ? '1' : '0'
   }
       console.log(digit);
       digit = parseInt(digit, 2);
       console.log(digit);


if (digit == 0 && countDirection == 1) {
  collection = 1; //Первый шаг  Ваш старт Ваш Выбор
} else if (digit == 0 && countDirection == 2) {
  collection = 3; //Ваш старт Ваш комфорт Ваш Эксперт
} else if (digit == 0 && countDirection == 3) {
  collection = 3; //Ваш старт Ваш комфорт Ваш Эксперт
} else if (digit == 0 && countDirection == 4) {
  collection = 6; //Ваш комфорт Ваш старт Ваш Эксперт
} else if (digit == 0 && countDirection == 5) {
  collection = 7; //Ваш комфорт Ваша выгода Ваш Интерес
} else if (digit == 2 && countDirection == 1) {
  collection = 2; //Первый шаг  Ваш старт спецрежим Ваш Выбор
} else if (digit == 2 && countDirection == 2) {
  collection = 5; //Ваш старт спецрежим Ваш комфорт спецрежим Ваш Интерес
} else if (digit == 2 && countDirection == 3) {
  collection = 5; //Ваш старт спецрежим Ваш комфорт спецрежим Ваш Интерес
} else if (digit == 2 && countDirection == 4) {
  collection = 8; //Ваш комфорт спецрежим Ваша выгода спецрежим Ваш Интерес
} else if (digit == 2 && countDirection == 5) {
  collection = 8; //Ваш комфорт спецрежим Ваша выгода спецрежим Ваш Интерес
} else if (digit == 1 && countDirection == 1) {
  collection = 4; //Ваш Выбор Ваш Эксперт Ваш комфорт
} else if (digit == 1 && countDirection == 2) {
  collection = 4; //Ваш Выбор Ваш Эксперт Ваш комфорт
} else if (digit == 1 && countDirection == 3) {
  collection = 9; //Ваш Эксперт Ваш Интерес Ваш комфорт
} else if (digit == 1 && countDirection == 4) {
  collection = 9; //Ваш Эксперт Ваш Интерес Ваш комфорт
} else if (digit == 1 && countDirection == 5) {
  collection = 9; //Ваш Эксперт Ваш Интерес Ваш комфорт
} else if (digit == 3 && countDirection == 1) {
  collection = 4; //Ваш Выбор Ваш Эксперт Ваш комфорт
} else if (digit == 3 && countDirection == 2) {
  collection = 4; //Ваш Выбор Ваш Эксперт Ваш комфорт
} else if (digit == 3 && countDirection == 3) {
  collection = 9; //Ваш Эксперт Ваш Интерес Ваш комфорт
} else if (digit == 3 && countDirection == 4) {
  collection = 9; //Ваш Эксперт Ваш Интерес Ваш комфорт
} else if (digit == 3 && countDirection == 5) {
  collection = 9; //Ваш Эксперт Ваш Интерес Ваш комфорт
}

if (collection === 1) {
     this.tariff = [
        //Первый шаг
        {
          tariff: this.tariffsData[7],
          recommended: true
        },
        //Ваш старт
        {
          tariff: this.tariffsData[6],
          recommended: false
        },
        //Ваш выбор
        {
          tariff: this.tariffsData[1],
          recommended: false
        },        
      ];

} else if (collection === 2) {
     this.tariff = [
        //Первый шаг
        {
          tariff: this.tariffsData[7],
          recommended: true
        },
        //Ваш старт Спецрежим
        {
          tariff: this.tariffsData[3],
          recommended: false
        },
        //Ваш выбор
        {
          tariff: this.tariffsData[1],
          recommended: false
        },        
      ];

} else if (collection === 3) {
     this.tariff = [
        //Ваш старт
        {
          tariff: this.tariffsData[6],
          recommended: true
        },
        //Ваш комфорт
        {
          tariff: this.tariffsData[4],
          recommended: false
        },
        //Ваш эксперт
        {
          tariff: this.tariffsData[9],
          recommended: false
        },        
      ];
} else if (collection === 4) {
     this.tariff = [
        //Ваш выбор
        {
          tariff: this.tariffsData[1],
          recommended: true
        },
        //Ваш эксперт
        {
          tariff: this.tariffsData[9],
          recommended: false
        }, 
        //Ваш комфорт
        {
          tariff: this.tariffsData[4],
          recommended: false
        },               
      ];
} else if (collection === 5) {
     this.tariff = [
        //Ваш старт Спецрежим
        {
          tariff: this.tariffsData[3],
          recommended: true
        },
        //Ваш комфорт Спецрежим
        {
          tariff: this.tariffsData[0],
          recommended: false
        },
        //Ваш интерес
        {
          tariff: this.tariffsData[8],
          recommended: false
        },              
      ];
} else if (collection === 6) {
     this.tariff = [
        //Ваш комфорт
        {
          tariff: this.tariffsData[4],
          recommended: true
        }, 
        //Ваш старт
        {
          tariff: this.tariffsData[6],
          recommended: false
        },
        //Ваш эксперт
        {
          tariff: this.tariffsData[9],
          recommended: false
        },              
      ];
} else if (collection === 7) {
     this.tariff = [
        //Ваш комфорт
        {
          tariff: this.tariffsData[4],
          recommended: true
        }, 
        //Ваша выгода
        {
          tariff: this.tariffsData[5],
          recommended: false
        },
        //Ваш интерес
        {
          tariff: this.tariffsData[8],
          recommended: false
        },              
      ];
} else if (collection === 8) {
     this.tariff = [
        //Ваш комфорт Спецрежим
        {
          tariff: this.tariffsData[0],
          recommended: true
        }, 
        //Ваша выгода Спецрежим
        {
          tariff: this.tariffsData[2],
          recommended: false
        },
        //Ваш интерес
        {
          tariff: this.tariffsData[8],
          recommended: false
        },              
      ];
} else if (collection === 9) {
     this.tariff = [
        //Ваш эксперт
        {
          tariff: this.tariffsData[9],
          recommended: true
        },
        //Ваш интерес
        {
          tariff: this.tariffsData[8],
          recommended: false
        },
        //Ваш комфорт
        {
          tariff: this.tariffsData[4],
          recommended: false
        },                      
      ];
}




             this.$forceUpdate();

           }
         },
         data:{
          person: 0,
          tax_mode: 0,
          direction: [true,false,false,false,false],
          workplace: 0,
          showTable: false,
          preloading: false,
          tariff: [],
          tariffsData:[],
          region_id: this.getCookie("REGION_ID"),
          region_id_new_user: this.getCookie("REGION_ID_NEW_USER"),
          current_region_id: "",
          count: "",
        },        
        mounted: function() {
         var _this = this;
         var dataURL = "/bitrix/templates/otchetnost_new_ver/js/master_otch_0103.json";
         $.getJSON(dataURL, function(data){ _this.tariffsData = data; _this.test();});
         if (this.region_id_new_user) {
         	this.current_region_id = this.region_id_new_user;
         } else {
         	this.current_region_id = this.region_id;
         }
         
        },
      });