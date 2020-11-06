

$(document).ready(function() {
		var w=$(window).outerWidth();
		var h=$(window).outerHeight();
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf("MSIE ");
		var isMobile = {Android: function() {return navigator.userAgent.match(/Android/i);},BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},Windows: function() {return navigator.userAgent.match(/IEMobile/i);},any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}};
	function isIE() {
		ua = navigator.userAgent;
		var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
		return is_ie; 
	}
	if(isIE()){
		$('body').addClass('ie');
	}
	if(isMobile.any()){
		$('body').addClass('touch');
	}
//FORMS
function forms(){
	//SELECT
	if($('select').length>0){
		function selectscrolloptions(){
				var scs=100;
				var mss=50;
			if(isMobile.any()){
				scs=10;
				mss=1;
			}
			var opt={
				cursorcolor:"#9B4E7C",
				cursorwidth: "12px",
				background: "",
				autohidemode:false,
				bouncescroll:false,
				cursorborderradius: "10px",
				scrollspeed:scs,
				mousescrollstep:mss,
				directionlockdeadzone:0,
				cursorborder: "0px solid #fff",
			};
			return opt;
		}

		function select(){
			$.each($('select'), function(index, val) {
					var ind=index;
				$(this).hide();
				if($(this).parent('.select-block').length==0){
					$(this).wrap("<div class='select-block "+$(this).attr('class')+"-select-block'></div>");
				}else{
					$(this).parent('.select-block').find('.select').remove();
				}
					let cl='';
					var milti='';
					var check='';
					var sblock=$(this).parent('.select-block');
					var soptions="<div class='select-options'><div class='select-options-scroll'><div class='select-options-list'>";
				if($(this).attr('multiple')=='multiple'){
					milti='multiple';
					check='check';
				}
				$.each($(this).find('option'), function(index, val) {
					if($(this).attr('class')!='' && $(this).attr('class')!=null){
						let cl=$(this).attr('class');
					}
					if($(this).attr('value')!=''){
						if($(this).attr('data-icon')!='' && $(this).attr('data-icon')!=null){
							soptions=soptions+"<div data-value='"+$(this).attr('value')+"' class='select-options__value_"+ind+" select-options__value value_"+$(this).val()+" "+cl+" "+check+"'><div><img src="+$(this).attr('data-icon')+" alt=\"\"></div><div>"+$(this).html()+"</div></div>";
						}else{
							soptions=soptions+"<div data-value='"+$(this).attr('value')+"' class='select-options__value_"+ind+" select-options__value value_"+$(this).val()+" "+cl+" "+check+"'>"+$(this).html()+"</div>";
						}
					}else if($(this).parent().attr('data-label')=='on'){
						if(sblock.find('.select__label').length==0){
							sblock.prepend('<div class="select__label">'+$(this).html()+'</div>');
						}
					}
				});
					soptions=soptions+"</div></div></div>";
				if($(this).attr('data-type')=='search'){
						sblock.append("<div data-type='search' class='select_"+ind+" select"+" "+$(this).attr('class')+"__select "+milti+"'>"+
												"<div class='select-title'>"+
													"<div class='select-title__arrow ion-ios-arrow-down'></div>"+
													"<input data-value='"+$(this).find('option[selected="selected"]').html()+"' class='select-title__value value_"+$(this).find('option[selected="selected"]').val()+"' />"+
												"</div>"+
												soptions+
											"</div>");
						$('.select_'+ind).find('input.select-title__value').jcOnPageFilter({
							parentSectionClass:'select-options_'+ind,
							parentLookupClass:'select-options__value_'+ind,
							childBlockClass:'select-options__value_'+ind
						});
				}else if($(this).attr('data-icon')=='true'){
					sblock.append("<div class='select_"+ind+" select"+" "+$(this).attr('class')+"__select icon "+milti+"'>"+
											"<div class='select-title'>"+
												"<div class='select-title__arrow ion-ios-arrow-down'></div>"+
												"<div class='select-title__value value_"+$(this).find('option[selected="selected"]').val()+"'><div><img src="+$(this).find('option[selected="selected"]').attr('data-icon')+" alt=\"\"></div><div>"+$(this).find('option[selected="selected"]').html()+"</div></div>"+
											"</div>"+
											soptions+
										"</div>");
				}else{
					sblock.append("<div class='select_"+ind+" select"+" "+$(this).attr('class')+"__select "+milti+"'>"+
											"<div class='select-title'>"+
												"<div class='select-title__arrow ion-ios-arrow-down'></div>"+
												"<div class='select-title__value value_"+$(this).find('option[selected="selected"]').val()+"'>"+$(this).find('option[selected="selected"]').html()+"</div>"+
											"</div>"+
											soptions+
										"</div>");
				}
				if($(this).find('option[selected="selected"]').val()!=''){
					sblock.find('.select').addClass('focus');
				}

				if(sblock.find('.select-options__value').length==1){
					sblock.find('.select').addClass('one');
				}

				if($(this).attr('data-req')=='on'){
					$(this).addClass('req');
				}
				$(".select_"+ind+" .select-options-scroll").niceScroll('.select-options-list',selectscrolloptions());
			});
		}
			select();

		$('body').on('keyup','input.select-title__value',function() {
			$('.select').not($(this).parents('.select')).removeClass('active').find('.select-options').slideUp(50);
			$(this).parents('.select').addClass('active');
			$(this).parents('.select').find('.select-options').slideDown(50,function() {
				$(this).find(".select-options-scroll").getNiceScroll().resize();
			});
			$(this).parents('.select-block').find('select').val('');
		});
		$('body').on('click','.select',function(){
			if(!$(this).hasClass('disabled') && !$(this).hasClass('one')){
				$('.select').not(this).removeClass('active').find('.select-options').slideUp(50);
				$(this).toggleClass('active');
				$(this).find('.select-options').slideToggle(50,function() {
					$(this).find(".select-options-scroll").getNiceScroll().resize();
				});

				//	var input=$(this).parent().find('select');
				//removeError(input);

				if($(this).attr('data-type')=='search'){
					if(!$(this).hasClass('active')){
						searchselectreset();
					}
					$(this).find('.select-options__value').show();
				}


				var cl=$.trim($(this).find('.select-title__value').attr('class').replace('select-title__value',''));
					$(this).find('.select-options__value').show().removeClass('hide').removeClass('last');
				if(cl!=''){
					$(this).find('.select-options__value.'+cl).hide().addClass('hide');
				}
				if($(this).find('.select-options__value').last().hasClass('hide')){
					$(this).find('.select-options__value').last().prev().addClass('last');
				}
			}
		});
		$('body').on('click','.select-options__value',function() {
			if($(this).parents('.select').hasClass('multiple')){
				if($(this).hasClass('active')){
					if($(this).parents('.select').find('.select-title__value span').length>0){
						$(this).parents('.select').find('.select-title__value').append('<span data-value="'+$(this).data('value')+'">, '+$(this).html()+'</span>');
					}else{
						$(this).parents('.select').find('.select-title__value').data('label',$(this).parents('.select').find('.select-title__value').html());
						$(this).parents('.select').find('.select-title__value').html('<span data-value="'+$(this).data('value')+'">'+$(this).html()+'</span>');
					}
					$(this).parents('.select-block').find('select').find('option').eq($(this).index()+1).prop('selected', true);
					$(this).parents('.select').addClass('focus');
				}else{
					$(this).parents('.select').find('.select-title__value').find('span[data-value="'+$(this).data('value')+'"]').remove();
					if($(this).parents('.select').find('.select-title__value span').length==0){
						$(this).parents('.select').find('.select-title__value').html($(this).parents('.select').find('.select-title__value').data('label'));
						$(this).parents('.select').removeClass('focus');
					}
					$(this).parents('.select-block').find('select').find('option').eq($(this).index()+1).prop('selected', false);
				}
				return false;
			}


			if($(this).parents('.select').attr('data-type')=='search'){
				$(this).parents('.select').find('.select-title__value').val($(this).html());
				$(this).parents('.select').find('.select-title__value').attr('data-value',$(this).html());
			}else{
				$(this).parents('.select').find('.select-title__value').attr('class','select-title__value value_'+$(this).data('value'));
				$(this).parents('.select').find('.select-title__value').html($(this).html());

			}

				$(this).parents('.select-block').find('select').find('option').removeAttr("selected");
			if($.trim($(this).data('value'))!=''){
				$(this).parents('.select-block').find('select').val($(this).data('value'));
				$(this).parents('.select-block').find('select').find('option[value="'+$(this).data('value')+'"]').attr('selected','selected');
			}else{
				$(this).parents('.select-block').find('select').val($(this).html());
				$(this).parents('.select-block').find('select').find('option[value="'+$(this).html()+'"]').attr('selected','selected');
			}


			if($(this).parents('.select-block').find('select').val()!=''){
				$(this).parents('.select-block').find('.select').addClass('focus');
			}else{
				$(this).parents('.select-block').find('.select').removeClass('focus');

				$(this).parents('.select-block').find('.select').removeClass('err');
				$(this).parents('.select-block').parent().removeClass('err');
				$(this).parents('.select-block').removeClass('err').find('.form__error').remove();
			}
			if(!$(this).parents('.select').data('tags')!=""){
				if($(this).parents('.form-tags').find('.form-tags__item[data-value="'+$(this).data('value')+'"]').length==0){
					$(this).parents('.form-tags').find('.form-tags-items').append('<a data-value="'+$(this).data('value')+'" href="" class="form-tags__item">'+$(this).html()+'<span class="fa fa-times"></span></a>');
				}
			}
			$(this).parents('.select-block').find('select').change();

			if($(this).parents('.select-block').find('select').data('update')=='on'){
				select();
			}
		});
		$(document).on('click touchstart',function(e) {
			if (!$(e.target).is(".select *") && !$(e.target).is(".select")) {
				$('.select').removeClass('active');
				$('.select-options').slideUp(50,function() {});
				searchselectreset();
			};
		});
		$(document).on('keydown',function(e) {
			if(e.which==27){
				$('.select').removeClass('active');
				$('.select-options').slideUp(50,function() {});
				searchselectreset();
			}
		});
	}
	//FIELDS
	$('input,textarea').focus(function(){
		if($(this).val() == $(this).attr('data-value')){
				$(this).addClass('focus');
				$(this).parent().addClass('focus');
			if($(this).attr('data-type')=='pass'){
				$(this).attr('type','password');
			};
			$(this).val('');
		};
		removeError($(this));
	});
	$('input[data-value], textarea[data-value]').each(function() {
		if (this.value == '' || this.value == $(this).attr('data-value')) {
			if($(this).hasClass('l') && $(this).parent().find('.form__label').length==0){
				$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');
			}else{
				this.value = $(this).attr('data-value');
			}
		}
		if(this.value!=$(this).attr('data-value') && this.value!=''){
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			if($(this).hasClass('l') && $(this).parent().find('.form__label').length==0){
				$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');
			}
		}

		$(this).click(function() {
			if (this.value == $(this).attr('data-value')) {
				if($(this).attr('data-type')=='pass'){
					$(this).attr('type','password');
				};
				this.value = '';
			};
		});
		$(this).blur(function() {
			if (this.value == '') {
				if(!$(this).hasClass('l')){
					this.value = $(this).attr('data-value');
				}
					$(this).removeClass('focus');
					$(this).parent().removeClass('focus');
				if($(this).attr('data-type')=='pass'){
					$(this).attr('type','text');
				};
			};
			if($(this).hasClass('vn')){
				formValidate($(this));
			}
		});
	});
	$('.form-input__viewpass').click(function(event) {
		if($(this).hasClass('active')){
			$(this).parent().find('input').attr('type','password');
		}else{
			$(this).parent().find('input').attr('type','text');
		}
		$(this).toggleClass('active');
	});

	//$('textarea').autogrow({vertical: true, horizontal: false});
	

	//MASKS//
	//'+7(999) 999 9999'
	//'+38(999) 999 9999'
	//'+375(99)999-99-99'
	//'a{3,1000}' только буквы минимум 3
	//'9{3,1000}' только цифры минимум 3
	$.each($('input.phone'), function(index, val) {
		$(this).attr('type','tel');
		$(this).focus(function(){
			$(this).inputmask('+7(999) 999 9999',{clearIncomplete: true,clearMaskOnLostFocus: true,
				"onincomplete": function(){maskclear($(this));}
			});
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			$(this).parent().removeClass('err');
			$(this).removeClass('err');
		});
	});
	$('input.phone').focusout(function(event) {
		maskclear($(this));
	});
	$.each($('input.num'), function(index, val) {
		$(this).focus(function(){
			$(this).inputmask('9{1,1000}',{clearIncomplete: true,placeholder:"",clearMaskOnLostFocus: true,"onincomplete": function(){maskclear($(this));}});
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			$(this).parent().removeClass('err');
			$(this).removeClass('err');
		});
	});
	$('input.num').focusout(function(event) {
		maskclear($(this));
	});
	/*
	$.each($('input.date'), function(index, val) {
		$(this).focus(function(){
			$(this).inputmask('dd.mm.yyyy',{
				clearIncomplete: true,
				placeholder:"_",
				//yearrange:{'minyear':n-40,'maxyear':n},
				clearMaskOnLostFocus: true,
				"onincomplete": function(){maskclear($(this));},
				"oncomplete": function(){
					$(this).datepicker("setDate",$(this).val());
				}
			});
			$(this).addClass('focus');
			$(this).parents('.form-column').addClass('focus');
			$(this).parent().addClass('focus');
			$(this).parent().removeClass('err');
			$(this).removeClass('err');
		});
		$(this).focusout(function(event) {
			maskclear($(this));
		});
		$(this).datepicker({
			dateFormat : "dd.mm.yy",
			//yearRange: "1915:2015",
			//defaultDate: '-18Y', 
			//inDate: '-85Y', 
			//maxDate: "0Y",
			beforeShow :function(event){
				$('.ui-datepicker').show();
			},
			onSelect:function(event){
				if($(this).val()!=$(this).attr('data-value') && $(this).val()!=''){
					$(this).addClass('focus');
					$(this).parent().addClass('focus');
					if($(this).hasClass('l') && $(this).parent().find('.form__label').length==0){
						$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');
					}
				}
			}
		});
	});
	*/

	//CHECK
	$.each($('.check'), function(index, val) {
		if($(this).find('input').prop('checked')==true){
			$(this).addClass('active');
		}
	});
	$('body').off('click','.check',function(event){});
	$('body').on('click','.check',function(event){
		if(!$(this).hasClass('disable')){
				var target = $(event.target);
			if (!target.is("a")){
					$(this).toggleClass('active');
				if($(this).hasClass('active')){
					$(this).find('input').prop('checked', true);
				}else{
					$(this).find('input').prop('checked', false);
				}
			}
		}
	});

	//OPTION
	$.each($('.option.active'), function(index, val) {
		$(this).find('input').prop('checked', true);
	});
	$('.option').click(function(event) {
		if(!$(this).hasClass('disable')){
				var target = $(event.target);
			if (!target.is("a")){
				if($(this).hasClass('active') && $(this).hasClass('order') ){
					$(this).toggleClass('orderactive');
				}
					$(this).parents('.options').find('.option').removeClass('active');
					$(this).toggleClass('active');
					$(this).children('input').prop('checked', true);
			}
		}
	});
	//RATING
	$('.rating.edit .star').hover(function() {
			var block=$(this).parents('.rating');
		block.find('.rating__activeline').css({width:'0%'});
			var ind=$(this).index()+1;
			var linew=ind/block.find('.star').length*100;
		setrating(block,linew);
	},function() {
			var block=$(this).parents('.rating');
		block.find('.star').removeClass('active');
			var ind=block.find('input').val();
			var linew=ind/block.find('.star').length*100;
		setrating(block,linew);
	});
	$('.rating.edit .star').click(function(event) {
			var block=$(this).parents('.rating');
			var re=$(this).index()+1;
			block.find('input').val(re);
			var linew=re/block.find('.star').length*100;
		setrating(block,linew);
	});
	$.each($('.rating'), function(index, val) {
			var ind=$(this).find('input').val();
			var linew=ind/$(this).parent().find('.star').length*100;
		setrating($(this),linew);
	});
	function setrating(th,val) {
		th.find('.rating__activeline').css({width:val+'%'});
	}
	//QUANTITY
	$('.quantity__btn').click(function(event) {
			var n=parseInt($(this).parent().find('.quantity__input').val());
		if($(this).hasClass('dwn')){
			n=n-1;
			if(n<1){n=1;}
		}else{
			n=n+1;
		}
			$(this).parent().find('.quantity__input').val(n);
		return false;
	});
	//RANGE
	if($("#range" ).length>0){
		$("#range" ).slider({
			range: true,
			min: 0,
			max: 5000,
			values: [0, 5000],
			slide: function( event, ui ){
				$('#rangefrom').val(ui.values[0]);
				$('#rangeto').val(ui.values[1]);
				$(this).find('.ui-slider-handle').eq(0).html('<span>'+ui.values[0]+'</span>');
				$(this).find('.ui-slider-handle').eq(1).html('<span>'+ui.values[1]+'</span>');
			},
			change: function( event, ui ){
				if(ui.values[0]!=$( "#range" ).slider( "option","min") || ui.values[1]!=$( "#range" ).slider( "option","max")){
					$('#range').addClass('act');
				}else{
					$('#range').removeClass('act');
				}
			}
		});
		$('#rangefrom').val($( "#range" ).slider( "values", 0 ));
		$('#rangeto').val($( "#range" ).slider( "values", 1 ));

		$("#range" ).find('.ui-slider-handle').eq(0).html('<span>'+$( "#range" ).slider( "option","min")+'</span>');
		$("#range" ).find('.ui-slider-handle').eq(1).html('<span>'+$( "#range" ).slider( "option","max")+'</span>');
		
		$( "#rangefrom" ).bind("change", function(){
			if($(this).val()*1>$( "#range" ).slider( "option","max")*1){
				$(this).val($( "#range" ).slider( "option","max"));
			}
			if($(this).val()*1<$( "#range" ).slider( "option","min")*1){
				$(this).val($( "#range" ).slider( "option","min"));
			}
			$("#range" ).slider( "values",0,$(this).val());
		});
		$( "#rangeto" ).bind("change", function(){
			if($(this).val()*1>$( "#range" ).slider( "option","max")*1){
				$(this).val($( "#range" ).slider( "option","max"));
			}
			if($(this).val()*1<$( "#range" ).slider( "option","min")*1){
				$(this).val($( "#range" ).slider( "option","min"));
			}
			$("#range" ).slider( "values",1,$(this).val());
		});
		$("#range" ).find('.ui-slider-handle').eq(0).addClass('left');
		$("#range" ).find('.ui-slider-handle').eq(1).addClass('right');
	}
	//ADDFILES
	$('.form-addfile__input').change(function(e){
		if($(this).val()!=''){
					var ts=$(this);
				ts.parents('.form-addfile').find('ul.form-addfile-list').html('');
			$.each(e.target.files, function(index, val) {
				if(ts.parents('.form-addfile').find('ul.form-addfile-list>li:contains("'+e.target.files[index].name+'")').length==0){
					ts.parents('.form-addfile').find('ul.form-addfile-list').append('<li>'+e.target.files[index].name+'</li>');
				}
			});
		}
	});
}
forms();

function digi(str){
	var r=str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
	return r;
}

//VALIDATE FORMS
$('form button[type=submit]').click(function(){
		var er=0;
		var form=$(this).parents('form');
		var ms=form.data('ms');
	$.each(form.find('.req'), function(index, val) {
		er+=formValidate($(this));
	});
	if(er==0){
		removeFormError(form);
		/*
			var messagehtml='';
		if(form.hasClass('editprofile')){
			var messagehtml='';
		}
		formLoad();
		*/

		//ОПТРАВКА ФОРМЫ
		/*
		function showResponse(html){
			if(!form.hasClass('nomessage')){
				showMessage(messagehtml);
			}
			if(!form.hasClass('noclear')){
				clearForm(form);
			}
		}
		var options={
			success:showResponse
		};
			form.ajaxForm(options);
		

		setTimeout(function(){
			if(!form.hasClass('nomessage')){
				//showMessage(messagehtml);
				showMessageByClass(ms);
			}
			if(!form.hasClass('noclear')){
				clearForm(form);
			}
		},0);

		return false;
		*/
		if(ms!=null && ms!=''){
			showMessageByClass(ms);
			return false;
		}
	}else{
		return false;
	}
});
function formValidate(input){
		var er=0;
		var form=input.parents('form');
	if(input.attr('name')=='email' || input.hasClass('email')){
		if(input.val()!=input.attr('data-value')){
			var em=input.val().replace(" ","");
			input.val(em);
		}
		if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.val())) || input.val()==input.attr('data-value')){
				er++;
			addError(input);
		}else{
			removeError(input);
		}
	}else{
		if(input.val()=='' || input.val()==input.attr('data-value')){
			er++;
			addError(input);
		}else{
			removeError(input);
		}
	}
	if(input.attr('type')=='checkbox'){
		if(input.prop('checked') == true){
			input.removeClass('err').parent().removeClass('err');
		}else{
			er++;
			input.addClass('err').parent().addClass('err');
		}
	}
	if(input.hasClass('name')){
		if(!(/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val()))){
				er++;
			addError(input);
		}
	}
	if(input.hasClass('pass-2')){
		if(form.find('.pass-1').val()!=form.find('.pass-2').val()){
			addError(input);
		}else{
			removeError(input);
		}
	}
		return er;
}
function formLoad(){
	$('.popup').hide();
	$('.popup-message-body').hide();
	$('.popup-message .popup-body').append('<div class="popup-loading"><div class="popup-loading__title">Идет загрузка...</div><div class="popup-loading__icon"></div></div>');
	$('.popup-message').addClass('active').fadeIn(300);
}
function showMessageByClass(ms){
	$('.popup').hide();
	popupOpen('message.'+ms,'');
}
function showMessage(html){
	$('.popup-loading').remove();
	$('.popup-message-body').show().html(html);
}
function clearForm(form){
	$.each(form.find('.input'), function(index, val) {
			$(this).removeClass('focus').val($(this).data('value'));
			$(this).parent().removeClass('focus');
		if($(this).hasClass('phone')){
			maskclear($(this));
		}
	});
}
function addError(input){
		input.addClass('err');
		input.parent().addClass('err');
		input.parent().find('.form__error').remove();
	if(input.hasClass('email')){
			var error='';
		if(input.val()=='' || input.val()==input.attr('data-value')){
			error=input.data('error');
		}else{
			error=input.data('error');
		}
		if(error!=null){
			input.parent().append('<div class="form__error">'+error+'</div>');
		}
	}else{
		if(input.data('error')!=null && input.parent().find('.form__error').length==0){
			input.parent().append('<div class="form__error">'+input.data('error')+'</div>');
		}
	}
	if(input.parents('.select-block').length>0){
		input.parents('.select-block').parent().addClass('err');
		input.parents('.select-block').find('.select').addClass('err');
	}
}
function addErrorByName(form,input__name,error_text){
		var input=form.find('[name="'+input__name+'"]');
	input.attr('data-error',error_text);
	addError(input);
}
function addFormError(form, error_text){
	form.find('.form__generalerror').show().html(error_text);
}
function removeFormError(form){
	form.find('.form__generalerror').hide().html('');
}
function removeError(input){
	input.removeClass('err');
	input.parent().removeClass('err');
	input.parent().find('.form__error').remove();

	if(input.parents('.select-block').length>0){
		input.parents('.select-block').parent().removeClass('err');
		input.parents('.select-block').find('.select').removeClass('err').removeClass('active');
		//input.parents('.select-block').find('.select-options').hide();
	}
}
function removeFormErrors(form){
	form.find('.err').removeClass('err');
	form.find('.form__error').remove();
}
function maskclear(n){
	if(n.val()==""){
		n.inputmask('remove');
		if(!n.hasClass('l')){
			n.val(n.attr('data-value'));
		}
		n.removeClass('focus');
		n.parent().removeClass('focus');
	}
}
function searchselectreset() {
	$.each($('.select[data-type="search"]'), function(index, val){
			var block=$(this).parent();
			var select=$(this).parent().find('select');
		if($(this).find('.select-options__value:visible').length==1){
			$(this).addClass('focus');
			$(this).parents('.select-block').find('select').val($('.select-options__value:visible').data('value'));
			$(this).find('.select-title__value').val($('.select-options__value:visible').html());
			$(this).find('.select-title__value').attr('data-value',$('.select-options__value:visible').html());
		}else if(select.val()==''){
			$(this).removeClass('focus');
			block.find('input.select-title__value').val(select.find('option[selected="selected"]').html());
			block.find('input.select-title__value').attr('data-value',select.find('option[selected="selected"]').html());
		}
	});
}
/**
 * jQuery || Zepto Parallax Plugin
 * @author Matthew Wagerfield - @wagerfield
 * @description Creates a parallax effect between an array of layers,
 *              driving the motion from the gyroscope output of a smartdevice.
 *              If no gyroscope is available, the cursor position is used.
 */
;
(function ($, window, document, undefined) {

    // Strict Mode
    'use strict';

    // Constants
    var NAME = 'parallax';
    var MAGIC_NUMBER = 30;
    var DEFAULTS = {
        relativeInput: false,
        clipRelativeInput: false,
        calibrationThreshold: 100,
        calibrationDelay: 500,
        supportDelay: 500,
        calibrateX: false,
        calibrateY: true,
        invertX: true,
        invertY: true,
        limitX: false,
        limitY: false,
        scalarX: 10.0,
        scalarY: 10.0,
        frictionX: 0.1,
        frictionY: 0.1,
        originX: 0.5,
        originY: 0.5,
        type: ['translate']
    };

    function Plugin(element, options) {

        // DOM Context
        this.element = element;

        // Selections
        this.$context = $(element).data('api', this);
        this.$layers = this.$context.find('.layer');

        // Data Extraction
        var data = {
            calibrateX: this.$context.data('calibrate-x') || null,
            calibrateY: this.$context.data('calibrate-y') || null,
            invertX: this.$context.data('invert-x') || null,
            invertY: this.$context.data('invert-y') || null,
            limitX: parseFloat(this.$context.data('limit-x')) || null,
            limitY: parseFloat(this.$context.data('limit-y')) || null,
            scalarX: parseFloat(this.$context.data('scalar-x')) || null,
            scalarY: parseFloat(this.$context.data('scalar-y')) || null,
            frictionX: parseFloat(this.$context.data('friction-x')) || null,
            frictionY: parseFloat(this.$context.data('friction-y')) || null,
            originX: parseFloat(this.$context.data('origin-x')) || null,
            originY: parseFloat(this.$context.data('origin-y')) || null
        };

        // Delete Null Data Values
        for (var key in data) {
            if (data[key] === null) delete data[key];
        }

        // Compose Settings Object
        $.extend(this, DEFAULTS, options, data);

        // States
        this.calibrationTimer = null;
        this.calibrationFlag = true;
        this.enabled = false;
        this.depths = [];
        this.raf = null;

        // Element Bounds
        this.bounds = null;
        this.ex = 0;
        this.ey = 0;
        this.ew = 0;
        this.eh = 0;

        // Element Center
        this.ecx = 0;
        this.ecy = 0;

        // Element Range
        this.erx = 0;
        this.ery = 0;

        // Calibration
        this.cx = 0;
        this.cy = 0;

        // Input
        this.ix = 0;
        this.iy = 0;

        // Motion
        this.mx = 0;
        this.my = 0;

        // Velocity
        this.vx = 0;
        this.vy = 0;

        // Callbacks
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onDeviceOrientation = this.onDeviceOrientation.bind(this);
        this.onOrientationTimer = this.onOrientationTimer.bind(this);
        this.onCalibrationTimer = this.onCalibrationTimer.bind(this);
        this.onAnimationFrame = this.onAnimationFrame.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);

        // Initialise
        this.initialise();
    }

    Plugin.prototype.transformSupport = function (value) {
        var element = document.createElement('div');
        var propertySupport = false;
        var propertyValue = null;
        var featureSupport = false;
        var cssProperty = null;
        var jsProperty = null;
        for (var i = 0, l = this.vendors.length; i < l; i++) {
            if (this.vendors[i] !== null) {
                cssProperty = this.vendors[i][0] + 'transform';
                jsProperty = this.vendors[i][1] + 'Transform';
            } else {
                cssProperty = 'transform';
                jsProperty = 'transform';
            }
            if (element.style[jsProperty] !== undefined) {
                propertySupport = true;
                break;
            }
        }
        switch (value) {
            case '2D':
                featureSupport = propertySupport;
                break;
            case '3D':
                if (propertySupport) {
                    var body = document.body || document.createElement('body');
                    var documentElement = document.documentElement;
                    var documentOverflow = documentElement.style.overflow;
                    if (!document.body) {
                        documentElement.style.overflow = 'hidden';
                        documentElement.appendChild(body);
                        body.style.overflow = 'hidden';
                        body.style.background = '';
                    }
                    body.appendChild(element);
                    element.style[jsProperty] = 'translate3d(1px,1px,1px)';
                    propertyValue = window.getComputedStyle(element).getPropertyValue(cssProperty);
                    featureSupport = propertyValue !== undefined && propertyValue.length > 0 && propertyValue !== "none";
                    documentElement.style.overflow = documentOverflow;
                    body.removeChild(element);
                }
                break;
        }
        return featureSupport;
    };

    Plugin.prototype.ww = null;
    Plugin.prototype.wh = null;
    Plugin.prototype.wcx = null;
    Plugin.prototype.wcy = null;
    Plugin.prototype.wrx = null;
    Plugin.prototype.wry = null;
    Plugin.prototype.portrait = null;
    Plugin.prototype.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i);
    Plugin.prototype.vendors = [null, ['-webkit-', 'webkit'], ['-moz-', 'Moz'], ['-o-', 'O'], ['-ms-', 'ms']];
    Plugin.prototype.motionSupport = !!window.DeviceMotionEvent;
    Plugin.prototype.orientationSupport = !!window.DeviceOrientationEvent;
    Plugin.prototype.orientationStatus = 0;
    Plugin.prototype.transform2DSupport = Plugin.prototype.transformSupport('2D');
    Plugin.prototype.transform3DSupport = Plugin.prototype.transformSupport('3D');
    Plugin.prototype.propertyCache = {};

    Plugin.prototype.initialise = function () {

        // Configure Styles
        /*
         if (this.$context.css('position') === 'static') {
         this.$context.css({
         position: 'relative'
         });
         }
         */

        // Hardware Accelerate Context
        this.accelerate(this.$context);

        // Setup
        this.updateLayers();
        this.updateDimensions();
        this.enable();
        this.queueCalibration(this.calibrationDelay);
    };

    Plugin.prototype.updateLayers = function () {

        // Cache Layer Elements
        this.$layers = this.$context.find('.layer');
        this.depths = [];

        /*
         // Configure Layer Styles
         this.$layers.css({
         position: 'absolute',
         display: 'block',
         left: 0,
         top: 0
         });
         this.$layers.first().css({
         position: 'relative'
         });
         */

        // Hardware Accelerate Layers
        this.accelerate(this.$layers);

        // Cache Depths
        this.$layers.each($.proxy(function (index, element) {
            this.depths.push($(element).data('depth') || 0);
        }, this));
    };

    Plugin.prototype.updateDimensions = function () {
        this.ww = window.innerWidth;
        this.wh = window.innerHeight;
        this.wcx = this.ww * this.originX;
        this.wcy = this.wh * this.originY;
        this.wrx = Math.max(this.wcx, this.ww - this.wcx);
        this.wry = Math.max(this.wcy, this.wh - this.wcy);
    };

    Plugin.prototype.updateBounds = function () {
        this.bounds = this.element.getBoundingClientRect();
        this.ex = this.bounds.left;
        this.ey = this.bounds.top;
        this.ew = this.bounds.width;
        this.eh = this.bounds.height;
        this.ecx = this.ew * this.originX;
        this.ecy = this.eh * this.originY;
        this.erx = Math.max(this.ecx, this.ew - this.ecx);
        this.ery = Math.max(this.ecy, this.eh - this.ecy);
    };

    Plugin.prototype.queueCalibration = function (delay) {
        clearTimeout(this.calibrationTimer);
        this.calibrationTimer = setTimeout(this.onCalibrationTimer, delay);
    };

    Plugin.prototype.enable = function () {
        if (!this.enabled) {
            this.enabled = true;
            if (this.orientationSupport) {
                this.portrait = null;
                window.addEventListener('deviceorientation', this.onDeviceOrientation);
                setTimeout(this.onOrientationTimer, this.supportDelay);
            } else {
                this.cx = 0;
                this.cy = 0;
                this.portrait = false;
                window.addEventListener('mousemove', this.onMouseMove);
            }
            window.addEventListener('resize', this.onWindowResize);
            this.raf = requestAnimationFrame(this.onAnimationFrame);
        }
    };

    Plugin.prototype.disable = function () {
        if (this.enabled) {
            this.enabled = false;
            if (this.orientationSupport) {
                window.removeEventListener('deviceorientation', this.onDeviceOrientation);
            } else {
                window.removeEventListener('mousemove', this.onMouseMove);
            }
            window.removeEventListener('resize', this.onWindowResize);
            cancelAnimationFrame(this.raf);
        }
    };

    Plugin.prototype.calibrate = function (x, y) {
        this.calibrateX = x === undefined ? this.calibrateX : x;
        this.calibrateY = y === undefined ? this.calibrateY : y;
    };

    Plugin.prototype.invert = function (x, y) {
        this.invertX = x === undefined ? this.invertX : x;
        this.invertY = y === undefined ? this.invertY : y;
    };

    Plugin.prototype.friction = function (x, y) {
        this.frictionX = x === undefined ? this.frictionX : x;
        this.frictionY = y === undefined ? this.frictionY : y;
    };

    Plugin.prototype.scalar = function (x, y) {
        this.scalarX = x === undefined ? this.scalarX : x;
        this.scalarY = y === undefined ? this.scalarY : y;
    };

    Plugin.prototype.limit = function (x, y) {
        this.limitX = x === undefined ? this.limitX : x;
        this.limitY = y === undefined ? this.limitY : y;
    };

    Plugin.prototype.origin = function (x, y) {
        this.originX = x === undefined ? this.originX : x;
        this.originY = y === undefined ? this.originY : y;
    };

    Plugin.prototype.clamp = function (value, min, max) {
        value = Math.max(value, min);
        value = Math.min(value, max);
        return value;
    };

    Plugin.prototype.css = function (element, property, value) {
        var jsProperty = this.propertyCache[property];
        if (!jsProperty) {
            for (var i = 0, l = this.vendors.length; i < l; i++) {
                if (this.vendors[i] !== null) {
                    jsProperty = $.camelCase(this.vendors[i][1] + '-' + property);
                } else {
                    jsProperty = property;
                }
                if (element.style[jsProperty] !== undefined) {
                    this.propertyCache[property] = jsProperty;
                    break;
                }
            }
        }
        element.style[jsProperty] = value;
    };

    Plugin.prototype.accelerate = function ($element) {
        for (var i = 0, l = $element.length; i < l; i++) {
            var element = $element[i];
            this.css(element, 'transform', 'translate3d(0,0,0)');
            this.css(element, 'transform-style', 'preserve-3d');
            this.css(element, 'backface-visibility', 'hidden');
        }
    };

    Plugin.prototype.setPosition = function (element, x, y) {
        var self = this;
        // calibrations
        var translateCalibration = $(element).data('translate-calibration') || 1;
        var rotateCalibration = $(element).data('rotate-calibration') || 1;
        var scaleCalibration = $(element).data('scale-calibration') || 1;
        var grayscaleCalibration = $(element).data('grayscale-calibration') || 1;
        var blurCalibration = $(element).data('blur-calibration') || 1;
        var brightnessCalibration = $(element).data('brightness-calibration') || 1;
        var contrastCalibration = $(element).data('contrast-calibration') || 1;
        var hueRotateCalibration = $(element).data('hue-rotate-calibration') || 1;
        var opacityCalibration = $(element).data('opacity-calibration') || 1;
        var saturateCalibration = $(element).data('saturate-calibration') || 1;
        var sepiaCalibration = $(element).data('sepia-calibration') || 1;
        var skewXCalibration = $(element).data('skewX-calibration') || 1;
        var skewYCalibration = $(element).data('skewX-calibration') || 1;
        var perspective = $(element).data('perspective') || 0;

        var rotate = (x + y) * rotateCalibration / 2 + 'deg';
        var scale = 1 + (x + y) * scaleCalibration / 2;
        var skewX = (x + y) * skewXCalibration / 2 + 'deg';
        var skewY = (x + y) * skewYCalibration / 2 + 'deg';
        var grayscale = (100 - (x + y) * grayscaleCalibration / 2) + '%';
        var blur = Math.max((x + y) * blurCalibration / 2, 0) + 'px';
        var brightness = (100 - (x + y) * brightnessCalibration / 2) + '%';
        var contrast = (100 - (x + y) * contrastCalibration / 2) + '%';
        var hueRotate = (x + y) * hueRotateCalibration / 2 + 'deg';
        var opacity = 1 - (x + y) * opacityCalibration / 200;
        var saturate = (100 - (x + y) * saturateCalibration / 2) + '%';
        var sepia = (100 - (x + y) * sepiaCalibration / 2) + '%';

        x = x * translateCalibration + 'px';
        y = y * translateCalibration + 'px';

        var transformCSS = '';
        var filterCSS = '';

        var parallaxTypeData = $(element).data('parallax-type') || '';

        if (parallaxTypeData.length > 0) {
            var parallaxType = parallaxTypeData.split(',');
        } else {
            parallaxType = this.type;
        }

        parallaxType.forEach(function (item) {
            item = item.trim();
            if (item == 'translate') {
                if (self.transform3DSupport) {
                    transformCSS = transformCSS + 'translate3d(' + x + ',' + y + ',0) ';
                } else if (self.transform2DSupport) {
                    transformCSS = transformCSS + 'translate(' + x + ',' + y + ') ';
                } else {
                    element.style.left = x;
                    element.style.top = y;
                }
            }

            if (item == 'rotate') {
                if (self.transform3DSupport) {
                    transformCSS = transformCSS + 'rotate3d(0, 0, 1, ' + rotate + ') ';
                } else {
                    transformCSS = transformCSS + 'rotate(' + rotate + ') ';
                }
            }

            if (item == 'rotateX') {
                transformCSS = transformCSS + 'rotateX(' + rotate + ') ';
            }

            if (item == 'rotateY') {
                transformCSS = transformCSS + 'rotateY(' + rotate + ') ';
            }

            if (item == 'scale') {
                if (self.transform3DSupport) {
                    transformCSS = transformCSS + 'scale3d(' + scale + ', ' + scale + ', 1) ';
                } else {
                    transformCSS = transformCSS + 'scale(' + scale + ') ';
                }
            }

            if (item == 'skewX') {
                transformCSS = transformCSS + 'skewX(' + skewX + ') ';
            }

            if (item == 'skewY') {
                transformCSS = transformCSS + 'skewX(' + skewX + ') ';
            }

            if (item == 'grayscale') {
                filterCSS = filterCSS + 'grayscale(' + grayscale + ') ';
            }

            if (item == 'blur') {
                filterCSS = filterCSS + 'blur(' + blur + ') ';
            }

            if (item == 'brightness') {
                filterCSS = filterCSS + 'brightness(' + brightness + ') ';
            }

            if (item == 'contrast') {
                filterCSS = filterCSS + 'contrast(' + brightness + ') ';
            }

            if (item == 'hue-rotate') {
                filterCSS = filterCSS + 'hue-rotate(' + hueRotate + ') ';
            }

            if (item == 'saturate') {
                filterCSS = filterCSS + 'saturate(' + saturate + ') ';
            }

            if (item == 'sepia') {
                filterCSS = filterCSS + 'sepia(' + sepia + ') ';
            }

            if (item == 'opacity') {
                element.style.opacity = opacity;
            }

            if (item == 'perspective') {
                transformCSS = transformCSS + 'perspective(' + perspective + ') ';
            }
        });

        // аПбаИаМаЕаНбаЕаМ ббаАаНббаОбаМаАбаИаИ
        this.css(element, '-webkit-transform', transformCSS);
        this.css(element, 'transform', transformCSS);
        this.css(element, '-moz-filter', filterCSS);
        this.css(element, '-webkit-filter', filterCSS);
        this.css(element, 'filter', filterCSS);
    };

    Plugin.prototype.onOrientationTimer = function (event) {
        if (this.orientationSupport && this.orientationStatus === 0) {
            this.disable();
            this.orientationSupport = false;
            this.enable();
        }
    };

    Plugin.prototype.onCalibrationTimer = function (event) {
        this.calibrationFlag = true;
    };

    Plugin.prototype.onWindowResize = function (event) {
        this.updateDimensions();
    };

    Plugin.prototype.onAnimationFrame = function () {
        this.updateBounds();
        var dx = this.ix - this.cx;
        var dy = this.iy - this.cy;
        if ((Math.abs(dx) > this.calibrationThreshold) || (Math.abs(dy) > this.calibrationThreshold)) {
            this.queueCalibration(0);
        }
        if (this.portrait) {
            this.mx = this.calibrateX ? dy : this.iy;
            this.my = this.calibrateY ? dx : this.ix;
        } else {
            this.mx = this.calibrateX ? dx : this.ix;
            this.my = this.calibrateY ? dy : this.iy;
        }
        this.mx *= this.ew * (this.scalarX / 100);
        this.my *= this.eh * (this.scalarY / 100);
        if (!isNaN(parseFloat(this.limitX))) {
            this.mx = this.clamp(this.mx, -this.limitX, this.limitX);
        }
        if (!isNaN(parseFloat(this.limitY))) {
            this.my = this.clamp(this.my, -this.limitY, this.limitY);
        }
        this.vx += (this.mx - this.vx) * this.frictionX;
        this.vy += (this.my - this.vy) * this.frictionY;
        for (var i = 0, l = this.$layers.length; i < l; i++) {
            var depth = this.depths[i];
            var layer = this.$layers[i];
            var xOffset = this.vx * depth * (this.invertX ? -1 : 1);
            var yOffset = this.vy * depth * (this.invertY ? -1 : 1);
            this.setPosition(layer, xOffset, yOffset);
        }
        this.raf = requestAnimationFrame(this.onAnimationFrame);
    };

    Plugin.prototype.onDeviceOrientation = function (event) {

        // Validate environment and event properties.
        if (!this.desktop && event.beta !== null && event.gamma !== null) {

            // Set orientation status.
            this.orientationStatus = 1;

            // Extract Rotation
            var x = (event.beta || 0) / MAGIC_NUMBER; //  -90 :: 90
            var y = (event.gamma || 0) / MAGIC_NUMBER; // -180 :: 180

            // Detect Orientation Change
            var portrait = window.innerHeight > window.innerWidth;
            if (this.portrait !== portrait) {
                this.portrait = portrait;
                this.calibrationFlag = true;
            }

            // Set Calibration
            if (this.calibrationFlag) {
                this.calibrationFlag = false;
                this.cx = x;
                this.cy = y;
            }

            // Set Input
            this.ix = x;
            this.iy = y;
        }
    };

    Plugin.prototype.onMouseMove = function (event) {

        // Cache mouse coordinates.
        var clientX = event.clientX;
        var clientY = event.clientY;

        // Calculate Mouse Input
        if (!this.orientationSupport && this.relativeInput) {

            // Clip mouse coordinates inside element bounds.
            if (this.clipRelativeInput) {
                clientX = Math.max(clientX, this.ex);
                clientX = Math.min(clientX, this.ex + this.ew);
                clientY = Math.max(clientY, this.ey);
                clientY = Math.min(clientY, this.ey + this.eh);
            }

            // Calculate input relative to the element.
            this.ix = (clientX - this.ex - this.ecx) / this.erx;
            this.iy = (clientY - this.ey - this.ecy) / this.ery;

        } else {

            // Calculate input relative to the window.
            this.ix = (clientX - this.wcx) / this.wrx;
            this.iy = (clientY - this.wcy) / this.wry;
        }
    };

    var API = {
        enable: Plugin.prototype.enable,
        disable: Plugin.prototype.disable,
        updateLayers: Plugin.prototype.updateLayers,
        calibrate: Plugin.prototype.calibrate,
        friction: Plugin.prototype.friction,
        invert: Plugin.prototype.invert,
        scalar: Plugin.prototype.scalar,
        limit: Plugin.prototype.limit,
        origin: Plugin.prototype.origin
    };

    $.fn[NAME] = function (value) {
        var args = arguments;
        return this.each(function () {
            var $this = $(this);
            var plugin = $this.data(NAME);
            if (!plugin) {
                plugin = new Plugin(this, value);
                $this.data(NAME, plugin);
            }
            if (API[value]) {
                plugin[value].apply(plugin, Array.prototype.slice.call(args, 1));
            }
        });
    };

})(window.jQuery || window.Zepto, window, document);

var isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};
if (isMobile.any()) {}

if (location.hash) {
	var hsh = location.hash.replace('#', '');
	if ($('.popup-' + hsh).length > 0) {
		popupOpen(hsh);
	} else if ($('div.' + hsh).length > 0) {
		$('body,html').animate({
			scrollTop: $('div.' + hsh).offset().top,
		}, 500, function () {});
	}
}
$('.wrapper').addClass('loaded');





var act = "click";
if (isMobile.iOS()) {
	var act = "touchstart";
}

let iconMenu = document.querySelector(".icon-menu");
let body = document.querySelector("body");
let menuBody = document.querySelector(".menu__body");
if (iconMenu) {
	iconMenu.addEventListener("click", function () {
		iconMenu.classList.toggle("active");
		body.classList.toggle("lock");
		menuBody.classList.toggle("active");
	});
}

//ZOOM
if ($('.gallery').length > 0) {
	baguetteBox.run('.gallery', {
		// Custom options
	});
}
/*
CLOUD-ZOOM
<a rel="position:'right',adjustX:25,adjustY:0,Width: 432" href="img/product/zoom.jpg" class="cloud-zoom product-main-mainimage__item">
	<img class="cloudzoom-gallery" src="img/product/zoom.jpg" alt="" />
</a>
*/


//POPUP
$('.pl').click(function (event) {
	var pl = $(this).attr('href').replace('#', '');
	var v = $(this).data('vid');
	popupOpen(pl, v);
	return false;
});

function popupOpen(pl, v) {
	$('.popup').removeClass('active').hide();
	if (!$('.menu__body').hasClass('active')) {
		//$('body').data('scroll',$(window).scrollTop());
	}
	if (!isMobile.any()) {
		$('body').css({
			paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth()
		}).addClass('lock');
		$('.pdb').css({
			paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth()
		});
	} else {
		setTimeout(function () {
			$('body').addClass('lock');
		}, 300);
	}
	history.pushState('', '', '#' + pl);
	if (v != '' && v != null) {
		$('.popup-' + pl + ' .popup-video__value').html('<iframe src="https://www.youtube.com/embed/' + v + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>');
	}
	$('.popup-' + pl).fadeIn(300).delay(300).addClass('active');

	if ($('.popup-' + pl).find('.slick-slider').length > 0) {
		$('.popup-' + pl).find('.slick-slider').slick('setPosition');
	}
}

function openPopupById(popup_id) {
	$('#' + popup_id).fadeIn(300).delay(300).addClass('active');
}

function popupClose() {
	$('.popup').removeClass('active').fadeOut(300);
	if (!$('.menu__body').hasClass('active')) {
		if (!isMobile.any()) {
			setTimeout(function () {
				$('body').css({
					paddingRight: 0
				});
				$('.pdb').css({
					paddingRight: 0
				});
			}, 200);
			setTimeout(function () {
				$('body').removeClass('lock');
				//$('body,html').scrollTop(parseInt($('body').data('scroll')));
			}, 200);
		} else {
			$('body').removeClass('lock');
			//$('body,html').scrollTop(parseInt($('body').data('scroll')));
		}
	}
	$('.popup-video__value').html('');

	history.pushState('', '', window.location.href.split('#')[0]);
}
$('.popup-close,.popup__close').click(function (event) {
	popupClose();
	return false;
});
$('.popup').click(function (e) {
	if (!$(e.target).is(".popup>.popup-table>.cell *") || $(e.target).is(".popup-close") || $(e.target).is(".popup__close")) {
		popupClose();
		return false;
	}
});
$(document).on('keydown', function (e) {
	if (e.which == 27) {
		popupClose();
	}
});

$('.goto').click(function () {
	var el = $(this).attr('href').replace('#', '');
	var offset = 0;
	$('body,html').animate({
		scrollTop: $('.' + el).offset().top + offset
	}, 500, function () {});

	if ($('.menu__body').hasClass('active')) {
		$('.menu__body,.icon-menu').removeClass('active');
		$('body').removeClass('lock');
	}
	return false;
});


function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll(".ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();

// function ibg(){
// 	$.each($('.ibg'), function(index, val) {
// 	if($(this).find('img').length>0){
// 	$(this).css('background-image','url("'+$(this).find('img').attr('src')+'")');
// 	}
// 	});
// 	}

// 	ibg();

//Клик вне области
$(document).on('click touchstart', function (e) {
	if (!$(e.target).is(".select *")) {
		$('.select').removeClass('active');
	};
});

//UP
$(window).scroll(function () {
	var w = $(window).width();
	if ($(window).scrollTop() > 50) {
		$('#up').fadeIn(300);
	} else {
		$('#up').fadeOut(300);
	}
});
$('#up').click(function (event) {
	$('body,html').animate({
		scrollTop: 0
	}, 300);
});

$('body').on('click', '.tab__navitem', function (event) {
	var eq = $(this).index();
	if ($(this).hasClass('parent')) {
		var eq = $(this).parent().index();
	}
	if (!$(this).hasClass('active')) {
		$(this).closest('.tabs').find('.tab__navitem').removeClass('active');
		$(this).addClass('active');
		$(this).closest('.tabs').find('.tab__item').removeClass('active').eq(eq).addClass('active');
		if ($(this).closest('.tabs').find('.slick-slider').length > 0) {
			$(this).closest('.tabs').find('.slick-slider').slick('setPosition');
		}
	}
});
$.each($('.spoller.active'), function (index, val) {
	$(this).next().show();
});
$('body').on('click', '.spoller', function (event) {
	if ($(this).hasClass('mob') && !isMobile.any()) {
		return false;
	}

	if ($(this).parents('.one').length > 0) {
		$(this).parents('.one').find('.spoller').not($(this)).removeClass('active').next().slideUp(300);
		$(this).parents('.one').find('.spoller').not($(this)).parent().removeClass('active');
	}

	if ($(this).hasClass('closeall') && !$(this).hasClass('active')) {
		$.each($(this).closest('.spollers').find('.spoller'), function (index, val) {
			$(this).removeClass('active');
			$(this).next().slideUp(300);
		});
	}
	if (!$(this).hasClass('active')) {
		$(this).toggleClass('active').next().slideToggle(300, function (index, val) {
			if ($(this).parent().find('.slick-slider').length > 0) {
				$(this).parent().find('.slick-slider').slick('setPosition');
			}
		});

	}

	return false;
});

function scrolloptions() {
	var scs = 100;
	var mss = 50;
	var bns = false;
	if (isMobile.any()) {
		scs = 10;
		mss = 1;
		bns = true;
	}
	var opt = {
		cursorcolor: "#fff",
		cursorwidth: "4px",
		background: "",
		autohidemode: true,
		cursoropacitymax: 0.4,
		bouncescroll: bns,
		cursorborderradius: "0px",
		scrollspeed: scs,
		mousescrollstep: mss,
		directionlockdeadzone: 0,
		cursorborder: "0px solid #fff",
	};
	return opt;
}

function scroll() {
	$('.scroll-body').niceScroll('.scroll-list', scrolloptions());
}
if (navigator.appVersion.indexOf("Mac") != -1) {} else {
	if ($('.scroll-body').length > 0) {
		scroll();
	}
}

/*
function scrollwhouse(){
		var scs=100;
		var mss=50;
		var bns=false;
	if(isMobile.any()){
		scs=10;
		mss=1;
		bns=true;
	}
	var opt={
		cursorcolor:"#afafaf",
		cursorwidth: "5px",
		background: "",
		autohidemode:false,
		railalign: 'left',
		cursoropacitymax: 1,
		bouncescroll:bns,
		cursorborderradius: "0px",
		scrollspeed:scs,
		mousescrollstep:mss,
		directionlockdeadzone:0,
		cursorborder: "0px solid #fff",
	};
	return opt;
}
$('.whouse-content-body').niceScroll('.whouse-content-scroll',scrollwhouse());
$('.whouse-content-body').scroll(function(event) {
		var s=$(this).scrollTop();
		var r=Math.abs($(this).outerHeight()-$('.whouse-content-scroll').outerHeight());
		var p=s/r*100;
	$('.whouse-content__shadow').css({opacity:1-1/100*p});
});
*/


if ($('.t,.tip').length > 0) {
	tip();
}

function tip() {
	$('.t,.tip').webuiPopover({
		placement: 'top',
		trigger: 'hover',
		backdrop: false,
		//selector:true,
		animation: 'fade',
		dismissible: true,
		padding: false,
		//hideEmpty: true
		onShow: function ($element) {},
		onHide: function ($element) {},
	}).on('show.webui.popover hide.webui.popover', function (e) {
		$(this).toggleClass('active');
	});
}


// Custom code





function init() {
	var scr = $(this).scrollTop();
	$('body').addClass('load');

	sectors(scr);
	mainblock(scr);

	setTimeout(function () {
		// $('.mainblock').addClass('active');
		// $('.mainblock-parallax-items').parallax('');
		$('.parallax-items>div').addClass('layer');
		$('.parallax-items').parallax();
		$('.mainblock').addClass('active');
	}, 500);
}

init();
// $(window).on('load', function () {
// 	init();
// });
//BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
    for (let index = 0; index < sliders.length; index++) {
        let slider = sliders[index];
        if (!slider.classList.contains('swiper-bild')) {
            let slider_items = slider.children;
            if (slider_items) {
                for (let index = 0; index < slider_items.length; index++) {
                    let el = slider_items[index];
                    el.classList.add('swiper-slide');
                }
            }
            let slider_content = slider.innerHTML;
            let slider_wrapper = document.createElement('div');
            slider_wrapper.classList.add('swiper-wrapper');
            slider_wrapper.innerHTML = slider_content;
            slider.innerHTML = '';
            slider.appendChild(slider_wrapper);
            slider.classList.add('swiper-bild');
        }
        if (slider.classList.contains('_gallery')) { //slider.data('lightGallery').destroy(true);
        }
    }

    sliders_bild_callback();
}

function sliders_bild_callback(params) {}





let blog__slider = new Swiper('.education-slider', {
    /*
    effect: 'fade',
    autoplay: {
    	  delay: 3000,
    	  disableOnInteraction: false,
    },
    */
    observer: true,
    observeParents: true,
    slidesPerView: 4,
    spaceBetween: 0,
    // autoHeight: true,
    speed: 800,
    //touchRatio: 0,
    //simulateTouch: false,
    loop: true,
    //preloadImages: false,
    lazy: true,
    // Dotts
    //pagination: {
    //	el: '.slider-quality__pagging',
    //	clickable: true,
    //},
    // Arrows
    navigation: {
        nextEl: '.control-slider-__arrow_next',
        prevEl: '.control-slider-lots__arrow_prev'
    },
    pagination: {
    	el: '.education__pagging',
    	clickable: true,
    },
    breakpoints: {
        320: {
            slidesPerView: 1
        },
        550: {
            slidesPerView: 2,
            // spaceBetween: 15
        },
        991: {
            slidesPerView: 3
        },
        1183: {
            slidesPerView: 4,
            
        },

    },
    // on: {
    //     lazyImageReady: function lazyImageReady() {
    //         ibg();
    //     }
    // } // And if we need scrollbar
    //scrollbar: {
    //	el: '.swiper-scrollbar',
    //},

});
let whatdo__slider = new Swiper('.example-slider', {
    /*
    effect: 'fade',
    autoplay: {
    	  delay: 3000,
    	  disableOnInteraction: false,
    },
    */
    observer: true,
    observeParents: true,
    slidesPerView: 4,
   
    spaceBetween: 0,
    // autoHeight: true,
    speed: 800,
    
    //touchRatio: 0,
    //simulateTouch: false,
    loop: true,
    //preloadImages: false,
    //lazy: true,
    // Dotts
    pagination: {
    	el: '.whatdo__pagging',
    	clickable: true,
    },
    // Arrows
    navigation: {
        nextEl: '.control-slider-examples__arrow_next',
        prevEl: '.control-slider-examples__arrow_prev'
    },
    
    breakpoints: {
        320: {
            slidesPerView: 1,
            
        },
        550: {
            slidesPerView: 2
            // spaceBetween: 15
            
        },
        770: {
            slidesPerView: 3
        },
        1183: {
            slidesPerView: 4
            
        },

    },
   
    // on: {
    //     lazyImageReady: function lazyImageReady() {
    //         ibg();
    //     }
    // } 
    // And if we need scrollbar
    //scrollbar: {
    //	el: '.swiper-scrollbar',
    //},

});




	sectors($(this).scrollTop());
	$(window).scroll(function (event) {
		var scr = $(this).scrollTop();
		sectors(scr);

		if ($('.__fix-block').length > 0) {
			fix_block(scr);
		}

		sectors(scr);
		mainblock(scr);

	});

	function mainblock(scr) {
		var w = $(window).outerWidth();
		var h = $(window).outerHeight();
		var mainp = scr / $('.mainblock').outerHeight() * 10;
		if (scr < $('.mainblock').outerHeight()) {
			var y = 0 - h / 100 * mainp;
			$('.mainblock-parallax-items').css('transform', 'translate3d(0px, ' + y + 'px, 0px)');
			if ($('.mainblock-parallax-items').hasClass('disable')) {
				$('.mainblock-parallax-items').parallax('enable').removeClass('disable');
			}
		} else {
			if (!$('.mainblock-parallax-items').hasClass('disable')) {
				$('.mainblock-parallax-items').parallax('disable').addClass('disable');
			}
		}
	}


	function sectors(scr) {
		var w = $(window).outerWidth();
		var h = $(window).outerHeight();
		var headerheight = 80;
		if (w < 768) {
			headerheight = 50;
		}
		if (scr > 0) {
			$('header').addClass('scroll');
		} else {
			$('header').removeClass('scroll');
		}
		if (scr > h) {
			$('#up').fadeIn(300);
		} else {
			$('#up').fadeOut(300);
		}
		$.each($('.sector'), function (index, val) {
			var th = $(this).outerHeight();
			var tot = $(this).offset().top;
			var prx = $(this).find('.parallax');
			if (scr >= tot && scr <= tot + th - h) {
				$('.sector.scroll').removeClass('scroll');
				$(this).addClass('scroll');
			}
			if ($(this).hasClass('scroll')) {
				if (scr >= tot && scr <= tot + th - h) {
					if ($(this).hasClass('normalscroll')) {
						$('body').addClass('scroll');
					} else {
						$('body').removeClass('scroll');
					}
				} else {
					if ($(this).hasClass('normalscroll')) {
						$('body').removeClass('scroll');
					}
				}
			}
			if (scr > tot - h / 1.5 && scr < tot + th) {
				if ($('.dotts').length > 0) {
					dotts(index, 0);
				}
				$(this).addClass('active');
			} else {
				$(this).removeClass('active');
			}
			if (scr > tot - h / 1.5 && scr < tot + th) {
				$(this).addClass('active');
				if (prx) {
					if (!prx.hasClass('enable')) {
						prx.parallax('enable').addClass('enable');
					}
				}
			} else {
				$(this).removeClass('active');
				if (prx.hasClass('enable')) {
					prx.parallax('disable').removeClass('enable');
				}
			}

			if (scr > tot - h && scr < tot + th) {
				$(this).addClass('view');
				if ($(this).hasClass('padding')) {
					var ps = 100 - (tot - scr) / h * 100;
					var p = headerheight / 100 * ps;
					if (prx) {
						prx.find('.parallax-items').css('transform', 'translate3d(0px, ' + p + 'px, 0px)');;
					}
					if (p >= headerheight) {
						p = headerheight;
					}
					$(this).css({
						paddingTop: p
					});
				}
			} else {
				$(this).removeClass('view');
			}
		});
		/*
		$.each($('.lz').not('.load'), function(index, val) {
				var th=$(this).outerHeight();
				var tot=$(this).offset().top;
				var img=$(this).data('image');
				var video=$(this).data('video');
				if(navigator.appVersion.indexOf("Mac")!=-1){
					var video=$(this).data('videomov');
				}
			if(scr>tot-h && scr<tot+th){
				if(img!='' && img!=null){
					$(this).html('<img src="'+img+'" alt="" />');
				}
				if(video!='' && video!=null){
					$(this).html('<video loop autoplay playsinline muted src="'+video+'"></video>');
				}
				$(this).addClass('load');
				$(this).parents('.slick-slider').slick('setPosition');
			}
		});
		ibg();
		*/
	}

	function fix_block(ind, init) {
		let w = $(window).outerWidth();
		let h = $(window).outerHeight();
		let h_head = $('header').outerHeight();
		$.each($('.__fix-block'), function (index, val) {
			let block = $(this);
			let item = block.find('.__fix-item');
			if (item.outerHeight() < h - (h_head + 30)) {
				if (scr > block.offset().top - (h_head + 15)) {
					item.css({
						position: 'fixed',
						bottom: 'auto',
						top: 15 + h_head,
						width: block.outerWidth(),
						left: block.offset().left
					});
				} else {
					gotoRelative(item);
				}
				if (scr > (block.outerHeight() + block.offset().top) - (item.outerHeight() + (h_head + 15))) {
					block.css({
						position: 'relative'
					});
					item.css({
						position: 'absolute',
						top: 'auto',
						bottom: 0,
						left: 0
					});
				}
			} else {
				gotoRelative(item);
			}
		});

		function gotoRelative(item) {
			item.css({
				position: 'relative',
				top: 0,
				bottom: 'auto',
				left: 0
			});
		}
	}

	function dotts(ind, init) {
		if (init == true) {
			$.each($('.sector'), function (index, val) {
				$('.dotts-list').append('<li></li>');
			});
		}
		$('.dotts-list li').removeClass('active').eq(ind).addClass('active');
	}
	$('body').on('click', '.dotts-list li', function (event) {
		var n = $(this).index() + 1;
		var offset = 0;
		$('body,html').animate({
			scrollTop: $('.sector-' + n).offset().top + offset
		}, 800, function () {});
	});
//Adaptive functions
	let move_array=[];
if($('*[data-move]')){
	$.each($('*[data-move]'), function(index, val) {
		if($(this).data('move')!='' && $(this).data('move')!=null){
			$(this).attr('data-move-index',index);
			move_array[index]={
				'parent':$(this).parent(),
				"index":$(this).index()
			};
		}
	});
}
function dynamic_adaptive(){
		let w=$(window).outerWidth();
	$.each($('*[data-move]'), function(index, val) {
		if($(this).data('move')!='' && $(this).data('move')!=null){
				let dat_array=$(this).data('move').split(',');
				let dat_parent=$('.'+dat_array[0]);
				let dat_index=dat_array[1];
				let dat_bp=dat_array[2];
			if(w<dat_bp){
				if(!$(this).hasClass('js-move_done_'+dat_bp)){
					if(dat_index>0){
						$(this).insertAfter(dat_parent.find('*').eq(dat_index-1));
					}else{
						$(this).prependTo(dat_parent);
					}
					$(this).addClass('js-move_done_'+dat_bp);
				}
			}else{
				if($(this).hasClass('js-move_done_'+dat_bp)){
					dynamic_adaptive_back($(this));
					$(this).removeClass('js-move_done_'+dat_bp);
				}
			}
		}
	});
}
function dynamic_adaptive_back(el){
		let index_original=el.data('move-index');
		let move_place=move_array[index_original];
		let parent_place=move_place['parent'];
		let index_place=move_place['index'];
	if(index_place>0){
		el.insertAfter(parent_place.find('*').eq(index_place-1));
	}else{
		el.prependTo(parent_place);
	}
}
$(window).resize(function(event) {
	dynamic_adaptive();
});
	dynamic_adaptive();

//console.log(move_array);

/*
function dynamic_adaptive_back_all(){
	$.each($('*[data-move]'), function(index, val) {
			let index_original=$(this).data('move-index');
			let move_place=move_array[index_original];
			let parent_place=move_place['parent'];
			let index_place=move_place['index'];
		if(index_place>0){
			$(this).insertAfter(parent_place.find('*').eq(index_place-1));
		}else{
			$(this).prependTo(parent_place);
		}
	});
}
*/
});