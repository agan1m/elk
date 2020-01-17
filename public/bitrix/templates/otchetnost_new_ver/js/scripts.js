function scrollToModule(target) {
	$('html, body').animate({
		scrollTop: $("."+target).offset().top}, 200);
}

function connectForm(arg) {
	var form = "<div class='connectForm'><ul>																									\
					<li class='li1'><span>*</span><input onkeyup=checkInput(this,'text'); id='clientName' name='clientName' type='text' placeholder='ФИО' value=''></li>								\
					<li class='li2'><span>*</span><input onkeyup=checkInput(this,'text'); id='orgName' name='orgName' type='text' placeholder='Название организации' value=''></li>						\
					<li class='li3'><input onkeyup=checkInput(this,'inn'); id='inn' name='inn' type='text' placeholder='ИНН' value=''></li>												\
					<li class='li4'><span>*</span><input onkeyup=checkInput(this,'phone'); id='phone' name='phone' type='text' placeholder='Телефон' value=''></li>										\
					<li class='li5'><input onkeyup=checkInput(this,'mail'); id='mail' name='mail' type='text' placeholder='E-Mail' value=''></li>	\
				</ul>																														\
				<a id='sendBtn' onclick='sendForm(this)' class='btn grn' href='javascript:void(0);'>Подключиться</a>						\
				<a class='closeForm' onclick='closeForm(this)' href='javascript:void(0);'>Закрыть форму</a></div>";
	$(arg).before(form);
	$(arg).parent().find("div.connectForm").slideDown();
	$(arg).parent().find("a[id=connectFormBtn]").hide();
	$(arg).parent().find(".sendDone").remove();
}

function charFilter(f) {
	var res = "";
	for( i = 0; i < f.length; i++) {
		if(f.charAt(i).match("[0-9]"))
			res = res + f.charAt(i);
	}
	return res;
}

function trim_(s) {
	return s.replace(/^\s+|\s+$/g, "");
}

function correctWithFormat(str, mask) {
	var pos = 0;
	var tmp = "";
	str = charFilter(str);
	if(str == "")
		return "";
	for( i = 0; i <= mask.length - 1; i++) {
		if(mask.charAt(i) == "#") {
			if(pos <= str.length - 1) {
				tmp = tmp + str.charAt(pos);
				pos++;
			} else {
				break;
			}
		} else
			tmp = tmp + mask.charAt(i);
	}
	console.log(trim_(tmp));
	return trim_(tmp);
}

function checkInput(arg,typeField) {
	var testText = $(arg).val();
	//console.log("arg: " + $(arg).attr('id'));
	//console.log("typeField: " + typeField);
	switch (typeField) {
		case  "text":
		var pattern = new RegExp(/^[А-Яа-я,Ёё,A-Za-z-,0-9,"]{1,45}$/);
		
		if (pattern.test(testText) == false) {
			$(arg).addClass("error");
			$(arg).next().attr('id','indicator').remove();
			//$(arg).after("<div id='indicator' class='false'></div>");
			$(arg).parent().find("input[type=text]").after("<div id='indicator' class='false'><span style='margin-top: 0px;'>Используйте буквы русского или латинского алфавита</span></div>");
		} else {
			$(arg).removeClass('error');
			$(arg).next().attr('id','indicator').remove();
			$(arg).after("<div id='indicator' class='true'></div>");
		}
		if (testText == "") {
			$(arg).removeClass('error');
			$(arg).next().attr('id','indicator').remove();
		}
		break;
		case "inn":
		var pattern = new RegExp(/^[0-9]{1,12}$/);
		if (pattern.test(testText) == false) {
			$(arg).addClass("error");
			$(arg).parent().find("div[id=indicator]").remove();
			//$(arg).after("<div id='indicator' class='false'></div>");
			$(arg).parent().find("input[type=text]").after("<div id='indicator' class='false'><span>Используйте только цифры</span></div>");
		} else {
			$(arg).removeClass('error');
			$(arg).next().attr('id','indicator').remove();
			$(arg).after("<div id='indicator' class='true'></div>");
		}
		if (testText == "") {
			$(arg).removeClass('error');
			$(arg).next().attr('id','indicator').remove();
		}
		break;
		case "phone":
		//$("#"+$(arg).attr('id')).val() = correctWithFormat(testText, "### ### ## ##");
		//document.getElementById($(arg).attr('id')).value = correctWithFormat(testText, "### ### ## ###");
		var pattern = new RegExp(/^[\s()+-]*([0-9][\s()+-]*){6,20}$/);		
		if (pattern.test(testText) == false) {
			$(arg).addClass("error");
			$(arg).next().attr('id','indicator').remove();
			$(arg).after("<div id='indicator' class='false'></div>");
		} else {
			$(arg).removeClass('error');
			$(arg).next().attr('id','indicator').remove();
			$(arg).after("<div id='indicator' class='true'></div>");
		}
		if (testText == "") {
			$(arg).removeClass('error');
			$(arg).next().attr('id','indicator').remove();
		}
		break;
		case "mail":
		var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,4}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,3}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);		
		if (pattern.test(testText) == false) {
			$(arg).addClass("error");
			$(arg).next().attr('id','indicator').remove();
			$(arg).after("<div id='indicator' class='false'></div>");
		} else {
			$(arg).removeClass('error');
			$(arg).next().attr('id','indicator').remove();
			$(arg).after("<div id='indicator' class='true'></div>");
		}
		if (testText == "") {
			$(arg).removeClass('error');
			$(arg).next().attr('id','indicator').remove();
		}
		break;
	}
}

function closeForm(arg) {
	//console.log($(arg).parent().find("a[id=connectFormBtn]"));
	$(arg).parent().parent().find("a[id=connectFormBtn]").show();
	$(arg).parent().slideUp(function() {
		$(this).remove();
	});
	
	return false;
}

function sendForm(arg) {
	var clientName = $(arg).parent().find("input[name=clientName]").val();
	var orgName = $(arg).parent().find("input[name=orgName]").val();
	var inn = $(arg).parent().find("input[name=inn]").val();
	var phone = $(arg).parent().find("input[name=phone]").val();
	var mail = $(arg).parent().find("input[name=mail]").val();

	if (clientName == "") {
		$(arg).parent().find("input[name=clientName]").addClass('error');
		$(arg).parent().find("input[name=clientName]").next().attr('id','indicator').remove();
		$(arg).parent().find("input[name=clientName]").after("<div id='indicator' class='false'><span>Заполните обязательное поле</span></div>");
	}
	if (orgName == "") {
		$(arg).parent().find("input[name=orgName]").addClass('error');
		$(arg).parent().find("input[name=orgName]").next().attr('id','indicator').remove();
		$(arg).parent().find("input[name=orgName]").after("<div id='indicator' class='false'><span>Заполните обязательное поле</span></div>");
	}
	if (phone == "") {
		$(arg).parent().find("input[name=phone]").addClass('error');
		$(arg).parent().find("input[name=phone]").next().attr('id','indicator').remove();
		$(arg).parent().find("input[name=phone]").after("<div id='indicator' class='false'><span>Заполните обязательное поле</span></div>");
	}

	if (clientName != "" && orgName != "" && phone != "") {
		$.post( "javascripts/send_mail.php", { clientName:clientName, orgName:orgName, inn:inn, phone:phone, mail:mail } ).done(function( msg ) {
			console.log("msg: " + msg);
		});
		$(arg).parent().parent().find("a[id=connectFormBtn]").show();
		$(arg).parent().slideUp(function() {
			$(this).remove();
		});

		$(arg).parent().before("<div class='sendDone'><h1>Спасибо!</h1><p>Ваша заявка отправлена. Наш менеджер свяжется<br />с Вами в ближайшее время.</p></div>");
	}
}


function changeTabTo(target) {
	console.log(target);
	switch (target) {
		case "li1":
			$(".area1").show();
			$(".area2").hide();
			$(".area3").hide();
			$(".area4").hide();
			$(".module2 li").removeClass("active")
			$(".module2 ." + target).addClass("active");
			scrollToModule("module2");
			break;
		case "li2":
			$(".area1").hide();
			$(".area2").show();
			$(".area3").hide();
			$(".area4").hide();
			$(".module2 li").removeClass("active")
			$(".module2 ." + target).addClass("active");
			scrollToModule("module2");
			break;
		case "li3":
			$(".area1").hide();
			$(".area2").hide();
			$(".area3").show();
			$(".area4").hide();
			$(".module2 li").removeClass("active")
			$(".module2 ." + target).addClass("active");
			scrollToModule("module2");
			break;
		case "li4":
			$(".area1").hide();
			$(".area2").hide();
			$(".area3").hide();
			$(".area4").show();
			$(".module2 li").removeClass("active")
			$(".module2 ." + target).addClass("active");
			scrollToModule("module2");
			break;
	}
}

$(document).ready(function() {
	/*$("input[type='checkbox']").iCheck({
		function() {
			checkboxClass: 'icheckbox_flat-blue',
			radioClass: 'iradio_flat-blue'
		}
	});*/


	$(".mm-li1, .dm-li1").mouseenter(function(){
	    $(".dm-li1").show();
	});
	$(".mm-li1, .dm-li1").mouseleave(function(event) {
	    $(".dm-li1").hide();
	});

	$(".mm-li3, .dm-li3").mouseenter(function(){
	    $(".dm-li3").show();
	});
	$(".mm-li3, .dm-li3").mouseleave(function(event) {
	    $(".dm-li3").hide();
	});
	
	$(".fbx2_ytb").fancybox({
		'padding'		: 0,
		'autoScale'		: false,
		'transitionIn'	: 'none',
		'transitionOut'	: 'none',
		'width'			: 680,
		'height'		: 495,
		'href'			: this.href,
		'type'			: 'swf',
		'swf'			: {
			'wmode'		: 'transparent',
			'allowfullscreen'	: 'true'
		},
		'helpers' : {
			'media' : {}
		}
	});
});
$(function() {
	$('.module2_t .all_t a').click(function(e){
		e.preventDefault();
		$(this).toggleClass('active');
		$(".module4").toggle();
	});
});

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

TAXCOM.namespace("otchetnost.alternative");


TAXCOM.otchetnost.alternative = (function() {
	
	return {
		init: function () {						
			TAXCOM.otchetnost.alternative.chooseNalog();
			TAXCOM.otchetnost.alternative.connect();
			TAXCOM.otchetnost.alternative.changePriceFromRegion();
		},
		connect: function() {
			$('.btn-connect').on('click', function(event) {
				event.preventDefault();
				/* Act on the event */
				var _this = $(this),
					total = _this.parent().parent().find('#total');

				$.fancybox.open("#saleWindow", {
					height: 'inline',
					autoHeight: true,
					scrolling: 'no',
					padding: 25,
					fitToView : true,
					autoSize  : false,
					beforeShow: function(){
						var onlineLink = total.attr('data-url');

						$('#saleTariffName').html(total.attr('data-name'));
						$('#saleTariffPrice').html(total.attr('data-price') + ' <span class="rouble"></span> /год');
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
								fitToView : true,
								autoSize  : false,
								beforeShow : function() {
									var selectTariff = total.attr('data-name') + " за " + total.attr('data-price') + " рублей";
									$('#form_hidden_795').attr('value', selectTariff);
								}              
							});
						});
					}
				});
			});
		},
		utmFromCookie: function() {

			var utm_source = getCookie("taxcom_utm_source") ? "&utm_source=" + getCookie("taxcom_utm_source") : "";
			var utm_medium = getCookie("taxcom_utm_medium") ? "&utm_medium=" + getCookie("taxcom_utm_medium") : "";
			var utm_campaign = getCookie("taxcom_utm_campaign") ? "&utm_campaign=" + getCookie("taxcom_utm_campaign") : "";
			var utm_content = getCookie("taxcom_utm_content") ? "&utm_content=" + getCookie("taxcom_utm_content") : "";
			var utm_term = getCookie("taxcom_utm_term") ? "&utm_term=" + getCookie("taxcom_utm_term") : "";
			var clienttype = getCookie("taxcom_clienttype") ? "&clienttype=" + getCookie("taxcom_clienttype") : "";
			var completeLink = utm_source + utm_medium + utm_campaign + utm_content + utm_term + clienttype;
			return completeLink;			
		},
		chooseNalog: function() {
			$('#choose_nalog input').on('click', function(event) {
				
				var _this = $(this);
				var currentRegion = getCookie("REGION_ID");
				_this.parent().parent().find('li').removeClass('active');
				_this.parent().addClass('active');
				if (getCookie("REGION_ID_NEW_USER")) {
					var currentRegion = getCookie("REGION_ID_NEW_USER");
				}
				
				console.log("chooseNalog");
				var price1 = $("#col1").find(".tariff-price-sum"),
					price2 = $("#col2").find(".tariff-price-sum"),
					price3 = $("#col3").find(".tariff-price-sum"),
					price4 = $("#col4").find(".tariff-price-sum"),
					price1_osno = $("#col1").find("#radio_obsh1"),
					price1_usn = $("#col1").find("#radio_spec1"),
					price2_osno = $("#col2").find("#radio_obsh2"),
					price2_usn = $("#col2").find("#radio_spec2"),
					price3_osno = $("#col3").find("#radio_obsh3"),
					price3_usn = $("#col3").find("#radio_spec3"),
					price4_osno = $("#col4").find("#radio_obsh4"),
					price4_usn = $("#col4").find("#radio_spec4"),
					total1 = $("#col1").find("#total"),
					total2 = $("#col2").find("#total"),
					total3 = $("#col3").find("#total"),
					total4 = $("#col4").find("#total"),
					sale2 = $("#col2").find(".sale"),
					sale3 = $("#col3").find(".sale");

					TAXCOM.otchetnost.alternative.oldPrice($("#col2").find(".old"),"6 000",false);
					TAXCOM.otchetnost.alternative.oldPrice($("#col3").find(".old"),"10 500",false);
				if (_this.val() == 0) {
					//console.log("ОСНО Общий или смешанный");
					if (currentRegion == "12" || currentRegion == "13") {
						//console.log("Moscow");
						var p1 = "1 600",
							p2 = "5 400",
							p3 = "5 250",
							p4 = "29 370";
						price1.html(p1);
						price2.html(p2);
						price3.html(p3);
						price4.html(p4);
						sale2.show();
						sale3.show();
						TAXCOM.otchetnost.alternative.oldPrice($("#col2").find(".old"),"6 000",true);
						TAXCOM.otchetnost.alternative.oldPrice($("#col3").find(".old"),"10 500",true);
						/*price1_osno.attr('data-price',p1);
						price2_osno.attr('data-price',p2);
						price3_osno.attr('data-price',p3);
						price4_osno.attr('data-price',p4);*/
						total1.attr({
							"data-nalog": 'ОСНО',
							"data-price": p1,
							"data-url": "https://order.taxcom.ru/EDO?RegType=EDO_Udobniy" + TAXCOM.otchetnost.alternative.utmFromCookie()
						});
						total2.attr({
							"data-nalog": 'ОСНО',
							"data-price": p2,
							"data-url": "https://order.taxcom.ru/EDO?RegType=EDO_Comfortniy" + TAXCOM.otchetnost.alternative.utmFromCookie()
						});
						total3.attr({
							"data-nalog": 'ОСНО',
							"data-price": p3,
							"data-url": "https://order.taxcom.ru/EDO?RegType=EDO_Solidniy" + TAXCOM.otchetnost.alternative.utmFromCookie()
						});
						total4.attr({
							"data-nalog": 'ОСНО',
							"data-price": p4,
							"data-url": "https://order.taxcom.ru/edo?RegType=EDO_VashInteres" + TAXCOM.otchetnost.alternative.utmFromCookie()
						});
					} else {
						//console.log("other");
						var p1 = "1 600",
							p2 = "2 700",
							p3 = "2 950",
							p4 = "9 930";
						price1.html(p1);
						price2.html(p2);
						price3.html(p3);
						price4.html(p4);
						price1_osno.attr('data-price',p1);
						price2_osno.attr('data-price',p2);
						price3_osno.attr('data-price',p3);
						price4_osno.attr('data-price',p4);
						TAXCOM.otchetnost.alternative.oldPrice($("#col2").find(".old"),"3 000",true);
						TAXCOM.otchetnost.alternative.oldPrice($("#col3").find(".old"),"5 900",true);
						total1.attr({
							"data-nalog": 'ОСНО',
							"data-price": p1,
							"data-url": "https://order.taxcom.ru/EDO?RegType=EDO_Udobniy" + TAXCOM.otchetnost.alternative.utmFromCookie()
						});
						total2.attr({
							"data-nalog": 'ОСНО',
							"data-price": p2,
							"data-url": "https://order.taxcom.ru/EDO?RegType=EDO_Comfortniy" + TAXCOM.otchetnost.alternative.utmFromCookie()
						});
						total3.attr({
							"data-nalog": 'ОСНО',
							"data-price": p3,
							"data-url": "https://order.taxcom.ru/EDO?RegType=EDO_Solidniy" + TAXCOM.otchetnost.alternative.utmFromCookie()
						});
						total4.attr({
							"data-nalog": 'ОСНО',
							"data-price": p4,
							"data-url": "https://order.taxcom.ru/edo?RegType=EDO_VashInteres" + TAXCOM.otchetnost.alternative.utmFromCookie()
						});
					}
				} else if (_this.val() == 1) {
					//console.log("УСН Специальный");
					if (currentRegion == "12" || currentRegion == "13") {
						//console.log("Moscow");
						var p1 = "1 600",
							p2 = "4 200",
							p3 = "7 200",
							p4 = "29 370";
						price1.html(p1);
						price2.html(p2);
						price3.html(p3);
						price4.html(p4);
						sale2.hide();
						sale3.hide();
						price1_usn.attr('data-price',p1);
						price2_usn.attr('data-price',p2);
						price3_usn.attr('data-price',p3);
						price4_usn.attr('data-price',p4);
						total1.attr({
							"data-nalog": 'УСН',
							"data-price": p1,
							"data-url": "https://order.taxcom.ru/EDO?RegType=EDO_Udobniy" + TAXCOM.otchetnost.alternative.utmFromCookie()
						});
						total2.attr({
							"data-nalog": 'УСН',
							"data-price": p2,
							"data-url": "https://order.taxcom.ru/EDO?RegType=EDO_ComfortniySpec" + TAXCOM.otchetnost.alternative.utmFromCookie()
						});
						total3.attr({
							"data-nalog": 'УСН',
							"data-price": p3,
							"data-url": "https://order.taxcom.ru/EDO?RegType=EDO_SolidniySpec" + TAXCOM.otchetnost.alternative.utmFromCookie()
						});
						total4.attr({
							"data-nalog": 'УСН',
							"data-price": p4,
							"data-url": "https://order.taxcom.ru/edo?RegType=EDO_VashInteres" + TAXCOM.otchetnost.alternative.utmFromCookie()
						});
					} else {
						//console.log("other");
						var p1 = "1 600",
							p2 = "2 500",
							p3 = "4 200",
							p4 = "9 930";
						price1.html(p1);
						price2.html(p2);
						price3.html(p3);
						price4.html(p4);
						sale2.hide();
						sale3.hide();
						price1_usn.attr('data-price',p1);
						price2_usn.attr('data-price',p2);
						price3_usn.attr('data-price',p3);
						price4_usn.attr('data-price',p4);
						total1.attr({
							"data-nalog": 'УСН',
							"data-price": p1,
							"data-url": "https://order.taxcom.ru/EDO?RegType=EDO_Udobniy" + TAXCOM.otchetnost.alternative.utmFromCookie()
						});
						total2.attr({
							"data-nalog": 'УСН',
							"data-price": p2,
							"data-url": "https://order.taxcom.ru/EDO?RegType=EDO_ComfortniySpec" + TAXCOM.otchetnost.alternative.utmFromCookie()
						});
						total3.attr({
							"data-nalog": 'УСН',
							"data-price": p3,
							"data-url": "https://order.taxcom.ru/EDO?RegType=EDO_SolidniySpec" + TAXCOM.otchetnost.alternative.utmFromCookie()
						});
						total4.attr({
							"data-nalog": 'УСН',
							"data-price": p4,
							"data-url": "https://order.taxcom.ru/edo?RegType=EDO_VashInteres" + TAXCOM.otchetnost.alternative.utmFromCookie()
						});
					}
				} 
				/*var _this = $(this),
					_parent = $(this).parent().parent().parent().parent(),
					name = _this.attr('data-name'),
					price = _this.attr('data-price'),
					nalog = _this.attr('data-nalog');


				_parent.find('.tariff-price-sum').html(price);
				_parent.find('#total').attr({
					'data-name': name,
					'data-nalog': nalog,
					'data-price': price
				});*/
				
			});
			/*$('.btn-connect').on('click', function(event) {
				event.preventDefault();
				console.log("#choose_nalog .btn-connect");
				
				$('#form_textarea_905').val("Тариф " + total.attr('data-name') + ", режим " + total.attr('data-nalog') + ", за " + total.attr('data-price') + ' р/год');

				//$('html, body').animate({scrollTop: $(_this.attr('href')).offset().top}, 500);

			});*/

		},
		changePriceFromRegion: function() {
			var currentRegion = getCookie("REGION_ID");
			if (getCookie("REGION_ID_NEW_USER")) {
				var currentRegion = getCookie("REGION_ID_NEW_USER");
			}
			var price1 = $("#col1").find(".tariff-price-sum"),
				price2 = $("#col2").find(".tariff-price-sum"),
				price3 = $("#col3").find(".tariff-price-sum"),
				price4 = $("#col4").find(".tariff-price-sum"),
				price1_osno = $("#col1").find("#radio_obsh1"),
				price1_usn = $("#col1").find("#radio_spec1"),
				price2_osno = $("#col2").find("#radio_obsh2"),
				price2_usn = $("#col2").find("#radio_spec2"),
				price3_osno = $("#col3").find("#radio_obsh3"),
				price3_usn = $("#col3").find("#radio_spec3"),
				price4_osno = $("#col4").find("#radio_obsh4"),
				price4_usn = $("#col4").find("#radio_spec4"),
				total1 = $("#col1").find("#total"),
				total2 = $("#col2").find("#total"),
				total3 = $("#col3").find("#total"),
				total4 = $("#col4").find("#total");


				


			if (currentRegion == "12" || currentRegion == "13") {
				//console.log("Moscow");
				price1.html("1 600");
				price2.html("5 400");
				price3.html("5 250");
				price4.html("29 370");
				//price2.prepend('<span class="old">6 000 <span class="rouble"></span></span>');
				//price3.prepend('<span class="old">10 500 <span class="rouble"></span></span>');
				TAXCOM.otchetnost.alternative.oldPrice($("#col2").find(".old"),"6 000",true);
				TAXCOM.otchetnost.alternative.oldPrice($("#col3").find(".old"),"10 500",true);
				price1_osno.attr('data-price',"1 600");
				price1_usn.attr('data-price',"1 600");
				price2_osno.attr('data-price',"2 700");
				price2_usn.attr('data-price',"2 500");
				price3_osno.attr('data-price',"2 950");
				price3_usn.attr('data-price',"4 200");
				price4_osno.attr('data-price',"2 950");
				price4_usn.attr('data-price',"4 200");
				total1.attr({
					"data-nalog": 'ОСНО',
					"data-price": '1 600',
					"data-url": "https://order.taxcom.ru/EDO?RegType=EDO_Udobniy" + TAXCOM.otchetnost.alternative.utmFromCookie()
				});
				total2.attr({
					"data-nalog": 'ОСНО',
					"data-price": '5 400',
					"data-url": "https://order.taxcom.ru/EDO?RegType=EDO_Comfortniy" + TAXCOM.otchetnost.alternative.utmFromCookie()
				});
				total3.attr({
					"data-nalog": 'ОСНО',
					"data-price": '5 250',
					"data-url": "https://order.taxcom.ru/EDO?RegType=EDO_Solidniy" + TAXCOM.otchetnost.alternative.utmFromCookie()
				});
				total4.attr({
					"data-nalog": 'ОСНО',
					"data-price": '29 370',
					"data-url": "https://order.taxcom.ru/edo?RegType=EDO_VashInteres" + TAXCOM.otchetnost.alternative.utmFromCookie()
				});
			} else {
				//console.log("other");
				price1.html("1 600");
				price2.html("2 700");
				price3.html("2 950");
				price4.html("9 930");
				//price2.prepend('<span class="old">3 000 <span class="rouble"></span></span>');
				//price3.prepend('<span class="old">5 900 <span class="rouble"></span></span>');
				TAXCOM.otchetnost.alternative.oldPrice($("#col2").find(".old"),"3 000",true);
				TAXCOM.otchetnost.alternative.oldPrice($("#col3").find(".old"),"5 900",true);
				price1_osno.attr('data-price',"1 600");
				price1_usn.attr('data-price',"1 600");
				price2_osno.attr('data-price',"2 700");
				price2_usn.attr('data-price',"2 500");
				price3_osno.attr('data-price',"2 950");
				price3_usn.attr('data-price',"4 200");
				price4_osno.attr('data-price',"9 930");
				price4_usn.attr('data-price',"9 930");
				total1.attr({
					"data-nalog": 'ОСНО',
					"data-price": '1 600',
					"data-url": "https://order.taxcom.ru/EDO?RegType=EDO_Udobniy" + TAXCOM.otchetnost.alternative.utmFromCookie()
				});
				total2.attr({
					"data-nalog": 'ОСНО',
					"data-price": '2 700',
					"data-url": "https://order.taxcom.ru/EDO?RegType=EDO_Comfortniy" + TAXCOM.otchetnost.alternative.utmFromCookie()
				});
				total3.attr({
					"data-nalog": 'ОСНО',
					"data-price": '2 950',
					"data-url": "https://order.taxcom.ru/EDO?RegType=EDO_Solidniy" + TAXCOM.otchetnost.alternative.utmFromCookie()
				});
				total4.attr({
					"data-nalog": 'ОСНО',
					"data-price": '9 930',
					"data-url": "https://order.taxcom.ru/edo?RegType=EDO_VashInteres" + TAXCOM.otchetnost.alternative.utmFromCookie()
				});
			}


		},
		oldPrice: function(id, oldPrice, show) {
			//console.log("oldPrice");
			if (show == true) {
				$(id).show().css('display', 'inline-block');
			} else {
				$(id).hide();
			}
			$(id).html(oldPrice + ' <span class="rouble"></span>');
		},
		bannerClick: function(name, price, url) {

			var _this = $(this),
				name = name,
				url = url+TAXCOM.otchetnost.alternative.utmFromCookie(),
				price = price;


			$.fancybox.open("#saleWindow", {
				height: 'inline',
				autoHeight: true,
				scrolling: 'no',
				padding: 25,
				fitToView : true,
				autoSize  : false,
				beforeShow: function(){

					$('#saleTariffName').html(name);
					$('#saleTariffPrice').html(price + ' <span class="rouble"></span> /год');
					$('#byOnline').attr('href', url);
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
							fitToView : true,
							autoSize  : false,
							beforeShow : function() {
								var selectTariff = name + " за " + price + " рублей";
								$('#form_hidden_795').attr('value', selectTariff);
							}              
						});
					});
				}
			});
		}
	}
}());

$(document).ready(function() {
	TAXCOM.otchetnost.alternative.init();
});