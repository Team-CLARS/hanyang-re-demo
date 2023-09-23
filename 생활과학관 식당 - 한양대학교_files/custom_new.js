$(function () { // 160928
	function get_scrollbar_width(){var $outer=$('<div>').css({'visibility':'hidden','width':100,'overflow':'scroll'}).appendTo('body');var scrollbar=$('<div>').css({'width':'100%'}).appendTo($outer).outerWidth();$outer.remove();return 100-scrollbar;};

	var $tab_wrap = $('.tab-box-wrap[class *= "tab-type"]');
	var $tab;
	var $item;

	var minimum = 2;
	var maximum = 5;

	var isAdd = false;

	function tabs() { // 160928(2)
		$tab_wrap.each(function () {
			$tab = $(this).find('.nav-tabs');
			$item = $(this).find('.nav-tabs > li');

			if(!isAdd) {
				$item.each(function () {
					var _text = $(this).find('a').text();

					$(this).find('a').html('<span class="inner">'+_text+'</span>');
				});
			}

			$tab_wrap.find('.nav-tabs').css({'background-color' : 'transparent'});

			if(!$(this).children().hasClass('tab-type-inner')) {
				$tab.wrap('<div class="tab-type-inner"></div>');
			}
		});

		isAdd = true;
	}

	$(window).resize(function () {
		tabs();
	});

	tabs();
});


$(window).load(function(){
	$('.search-cover').appendTo('#header');
	var img1 =$('.news-main .n-list li').eq(0);
	var img2 =$('.news-main .n-list li').eq(1);
	var img3 =$('.news-main .n-list li').eq(2);
	var img4 =$('.news-main .n-list li').eq(3);

	if(img1.height()>img2.height()){
		img1.height(img2.height())	
		img3.height(img2.height())	
		img4.height(img2.height())	
	}else if(img1.height()<img2.height()){
		img1.height(img2.height())	
		img3.height(img2.height())	
		img4.height(img2.height())	
	}
	if(img3.height()>img4.height()){
		img3.height(img2.height())	
		img4.height(img2.height())	
	}else if(img3.height()<img4.height()){
		img3.height(img2.height())	
		img4.height(img2.height())	
	}
});

$(function(){
	// Common Header Script
	$('button.search-wrap').click(function(){
		// Button Design Script
		if ($(this).hasClass('active')) {
			$(this).addClass('not-active');
			$(this).removeClass('active');
		}else if ($(this).hasClass('not-active')) {
			$(this).addClass('active');
			$(this).removeClass('not-active');
		}
		var layoutLevel = $('#header').css('z-index');
		if(layoutLevel == '49') $('#header').css('z-index','103');
		else if(layoutLevel == '103') $('#header').css('z-index','51');

		$('.search-form-wrap, .search-cover').toggle();
		$('.close_search-form').css('display','block');
	});

	$('.search-cover').click(function(){
		$('button.search-wrap').addClass('not-active');
		$('button.search-wrap').removeClass('active');
		$('.search-form-wrap, .close_search-form, .search-cover').hide();
		$('#header').css('z-index','49');
	});

	$('.close_search-form').click(function () {
		$('.search-form-wrap, .search-cover').hide();
		$(this).hide();
	});

	// GNB Script
	$('.invisible-mobile .site-navigation .navbar li.bs-li>a').on('mouseover focusin',function(){
		var header = $(this).parents('#header');
		var li = $(this).parent();
		header.addClass('on').css('z-index','50');
	})
	$('#content').on('mouseover focusin',function(){
		$('#header').removeClass('on').css('z-index','49');
	})
	$('.invisible-mobile .site-navigation .navbar li.bs-li a').on('mouseout focusout',function(){
		$(this).parents('.bs-li').removeClass('active');
	})
	$('.invisible-mobile .site-navigation .navbar li.bs-li a').on('mouseover focusin',function(){
		var li = $(this).parents('.bs-li');
		li.addClass('active').siblings().removeClass('active');
	})

	// 1�� ��ü GNB Script (���� ���� �� �����ص� ����)
	// $('.invisible-mobile .site-navigation .navbar li a').click(function(){
	// 	var depth_Name = '.' + $(this).attr('name');
	// 	$('#gnb-sub-wrap .gnb-sub').css('display','none');
	// 	$(depth_Name).hide();

	// 	if (depth_Name != '.undefined') {
	// 		// ����޴��� ������ ���� ����޴�/header shadow ���
	// 		// $('#header').addClass('no-shadow');
	// 		$(depth_Name).toggle(function(){
	// 			if ($('#gnb-sub-wrap').is(':visible')){
	// 				// $('#header').addClass('no-shadow');
	// 				$('#header').removeClass('not-active');
	// 			}else{
	// 				$('#gnb-sub-wrap').toggle();
	// 				$('#header').addClass('not-active');
	// 				// $('#header').removeClass('no-shadow');
	// 			}
	// 		});
	// 	};
	// });

	//���� gnb 
	var news_gm_dep1 = $('.news_gm > li > a');

	$(news_gm_dep1).on('mouseenter focusin', function (e) {
		$(e.target).next('.cate_list').show();
		$(e.target).parents('li').siblings().children('.cate_list').hide();
	});

	$('.news_gm > li, .news_gm > li > .cate_list').on('mouseleave', function () {
		$('.news_gm > li > .cate_list').hide();
	});

	$('.news-hd-wrap .cate_search .cate_srch_bx .inp_srch, .news-hd .n-logo a').on('focusin', function (e) {
		$('.news_gm > li > .cate_list').hide();
	});

	//Gate Page
	$('.gate-list li a').append('<div class="bg" />')
	$('.gate-list li a').on('mouseover focusin',function(){
		$(this).find('.bg').stop().animate({'opacity':"0.7"},300)
		if($(window).width() > 768){
			$(this).find('img').stop().animate({
				'width':"300px",
				'height':"234px",
				'margin-left':"-20px",
				'margin-top':"-30px"
			},300)
		}

	})
	$('.gate-list li a').on('mouseout focusout',function(){
		$(this).find('.bg').stop().animate({'opacity':"0.3"},300)
		if($(window).width() > 768){
			$(this).find('img').stop().animate({
				'width':"100%",
				'height':"200px",
				'margin-left':"0",
				'margin-top':"0"
			},300)

		}
	})
	if($('.gate-list li a span br').length > 0){
		$('.gate-list li a span br').parent('span').css('margin-top','-30px')
	}

	//Gate Page Check
	if($('.gate-list').length <1){
		$('.visual_wrap .visual').addClass('sub');
		if($('.template05').length <1){
			$('.contents').addClass('mt');
		}
	}
	if($('.title-top .sub-text').length <1){
		$('.title-top').addClass('sub');
	}



	//  Line Style Table
		$('.tb-line table th, .tb-line table td').each(function(){
		var cell = $(this);
		if(cell.attr('rowspan') > 0) {
			cell.addClass('r_line');
			if($('tr td:last-child, tr th:last-child').hasClass('r_line')){
				$('tr td:last-child, tr th:last-child').removeClass('r_line')
			}
		}
	})
	// Common Location Menu
	function mbNavTree() {
		$('.common .nav-tree dd').click(function(){
			var openLayer = $(this).find('ul');
			if (openLayer.is(':visible')){
				$('#main-content.columns-1').css('z-index','12');
				$('.common .nav-tree ul:not(.open-layer)').hide();
				openLayer.hide();
				$(this).removeClass('open-layer');
			}else{
				$('.common .nav-tree ul:not(.open-layer)').hide();
				$('.common .nav-tree dd').removeClass('open-layer');
				openLayer.slideDown();
				$(this).addClass('open-layer');
				$('#main-content.columns-1').css('z-index','10');
			}
		});
	}
	function pcNavTree() {
		$('.common .nav-tree dd').on({
			mouseleave : function(){
				var openLayer = $(this).find('ul');
				$('#main-content.columns-1').css('z-index','12');
				openLayer.hide();
				$(this).parent().find('dd').removeClass('open-layer');
			}, mouseenter : function(){
				var openLayer = $(this).find('ul');
				$('.common .nav-tree ul:not(.open-layer)').hide();
				openLayer.slideToggle();
				$(this).addClass('open-layer');
				$('#main-content.columns-1').css('z-index','10');
			}
		});
	}
		// No Depth
		$('.nav-tree dl dd').each(function(){
			locationDepth = $(this).find('ul').hasClass('bs-ul');
			if (!locationDepth) {
				$(this).addClass('no-depth');
			}
		});
		// Depth length check
		// var length = $('.nav-tree dl dd').length;
		// var winW = $(window).width();
		// if(winW < 768){
		// 	if(length<3){
		// 		$('.nav-tree dl dd').css('width','50%');
		// 	}else if(length==4){
		// 		$('.nav-tree dl dd').css('width','25%');
		// 	}else if(length>4){
		// 		$('.nav-tree dl dd').css('width','20%');
		// 	}
		// }else{
		// 	$('.nav-tree dl dd').css('width','initial');
		// }

/*
	// Common Footer Panel Menu
	$("#footer .panel-menu-btn a").click(function(){
		if ($(this).parent().hasClass('closed')) {
			$('.panel-menu-list').slideDown();
			$('.panel-menu-list-bg.invisible-mobile:not(:animated)').slideDown();
			$('.panel-menu-btn').removeClass('closed');
			$('.panel-menu-btn').addClass('opened');
		} else if ($(this).parent().hasClass('opened')) {
			$('.panel-menu-list:not(:animated)').slideUp();
			$('.panel-menu-list-bg.invisible-mobile:not(:animated)').slideUp();
			$('.panel-menu-btn').removeClass('opened');
			$('.panel-menu-btn').addClass('closed');
		}
	});
*/
	// Common Footer Panel Menu
	$(document).ready(function () {
		var ww = $(window).width();
		if( ww > 768 ){
			//����̽� width�� 768�ʰ��� �Բ� ����
			$("#footer .panel-menu-btn a").click(function(){
				if ($(this).parent().hasClass('closed')) {
					$('.panel-menu-list').slideDown();
					$('.panel-menu-list-bg.invisible-mobile:not(:animated)').slideDown();
					$('.panel-menu-btn').removeClass('closed');
					$('.panel-menu-btn').addClass('opened');
				} else if ($(this).parent().hasClass('opened')) {
					$('.panel-menu-list:not(:animated)').slideUp();
					$('.panel-menu-list-bg.invisible-mobile:not(:animated)').slideUp();
					$('.panel-menu-btn').removeClass('opened');
					$('.panel-menu-btn').addClass('closed');
				}
			});
			
			pcNavTree();
		}else{
			//����̽� width�� 768���Ͻ� ���а� ���п��� �и��ؼ� ��ħ
			$('#footer .panel-menu .panel-menu-list-wrap').each(function () {
				$(this).children('.panel-menu-btn').children('a').click(function (e) {
					var pan_list = $(e.target).parents('.panel-menu-btn').next();

					if($(this).parent().hasClass('closed')){
						$(pan_list).slideDown();
						$(e.target).parents('.panel-menu-btn').removeClass('closed').addClass('opened');
						$(e.target).parents('.panel-menu-list-wrap').siblings('.panel-menu-list-wrap').children('.panel-menu-list').slideUp();
						$(e.target).parents('.panel-menu-list-wrap').siblings('.panel-menu-list-wrap').children('.panel-menu-btn').removeClass('opened').addClass('closed');
						
					}else if ($(this).parent().hasClass('opened')) {
						$(pan_list).slideUp();
						$(e.target).parents('.panel-menu-btn').removeClass('opened').addClass('closed');
					}
				});
			});
			mbNavTree();
		}
	});

	// Mobile Gnb Toggle
	$('.nav-toggle').click(function(){

		// iziModal ���� �������� ���
		// div.contents �ȿ� �����ϴ� iziModal�� ��������
		// ����� gnb�� ������ �����Ǵ� �̽��� �߻���
		// ����� gnb�� open�� �� z-index�� �ֻ����� �÷���
		$('#header').css('z-index','51');

		$('#gnb .invisible-desktop .site-navigation').css('display','block');
		var dth1Count, dth2Count, dth2Each;
		var dth2Arr = [];

		dth1Count = $('#gnb .invisible-desktop ul.dropdown > li').length * 70;

		Array.max = function(array) {
			return Math.max.apply(Math, array);
		};
		$('#navigation-mobile ul.dropdown li ul').each(function(){
			dth2Each = $(this).find('li').length;
			if (dth2Each != 0) {
				dth2Arr.push(dth2Each);
			}
		});
		dth2Count = Array.max(dth2Arr) + 1; // D2 �ִ� �޴��� �� ����

		if (body.hasClass('common')) {
			dth2Count =+ dth2Count * 35;
		}else {
			dth2Count =+ dth2Count * 45;
		}

		if (dth1Count > dth2Count) {
			var fullSubMenu = dth1Count +'px';
			// alert(dth1Count);
		}else if (dth1Count < dth2Count) {
			var fullSubMenu = dth2Count +'px';
			// alert(dth2Count);
		};
		$('#gnb .invisible-desktop ul.dropdown ul').css('height',fullSubMenu);
	});
	$('#gnb .site-navigation .closer').click(function(){
		$('#gnb .invisible-desktop .site-navigation').css('display','none');
		$('#header').css('z-index','49');
	});

	// Main Script
	//���κ��־�(��������) ������
	$('.spl_banner').bxSlider({
		auto: true,
		autoControls: true,
		autoControlsCombine: true,
		autoDelay: 500,
		mode: 'fade',
		//pagerCustom: '.spl_pager',
		pause: 9000,
		nextSelector: '.spl_next',
		prevSelector: '.spl_prev'
	});
	/* $('.main-visual').bxSlider({
		auto: true,
		autoDelay: 1000,
		mode: 'fade',
		pagerCustom: '#mainVisualPager',
		pause: 9000,
		nextSelector: '.main-visual-next',
		prevSelector: '.main-visual-prev'
	}); */
	$('.main-slider-01').bxSlider({
		auto: true,
		autoControls: true,
		autoControlsCombine: true,
		autoDelay: 500,
		pause: 4000,
		nextSelector: '.main-slider-next',
		prevSelector: '.main-slider-prev',
		slideWidth: 350,
		minSlides: 1,
		maxSlides: 3,
		slideMargin: 25
	});
	$('.main-slider-02').bxSlider({
		auto: false,
		autoControls: true,
		autoControlsCombine: true,
		autoDelay: 500,
		pause: 4000,
		nextSelector: '.main-slider-next2',
		prevSelector: '.main-slider-prev2',
		slideWidth: 275,
		minSlides: 1,
		maxSlides: 4,
		slideMargin: 0
	});
	$('.main-slider-01-wrap .main-slider-03').bxSlider({
		auto: false,
		autoControls: true,
		autoControlsCombine: true,
		autoDelay: 500,
		pause: 4000,
		nextSelector: '.main-slider-01-wrap .main-slider-next3',
		prevSelector: '.main-slider-01-wrap .main-slider-prev3',
		slideWidth: 256,
		minSlides: 1,
		maxSlides: 4,
		slideMargin: 25
	});
	$('.main-slider-03-wrap .main-slider-03').bxSlider({
		auto: false,
		autoControls: true,
		autoControlsCombine: true,
		autoDelay: 500,
		pause: 4000,
		nextSelector: '.main-slider-03-wrap .main-slider-next3',
		prevSelector: '.main-slider-03-wrap .main-slider-prev3',
		slideWidth: 256,
		minSlides: 1,
		maxSlides: 4,
		slideMargin: 25
	});
	$('.main-slider-02-wrap .main-slider-03').bxSlider({
		auto: false,
		autoControls: true,
		autoControlsCombine: true,
		autoDelay: 500,
		pause: 4000,
		nextSelector: '.main-slider-02-wrap .main-slider-next3',
		prevSelector: '.main-slider-02-wrap .main-slider-prev3',
		slideWidth: 256,
		minSlides: 1,
		maxSlides: 4,
		slideMargin: 25
	});
	$('.main-slider-04').bxSlider({
		//auto: true,
		//autoControls: true,
		//autoControlsCombine: true,
		slideWidth: 356,
		minSlides: 3,
		maxSlides: 3,
		moveSlides: 1,
		slideMargin: 10,
		nextSelector: '.mb-slider-next',
		prevSelector: '.mb-slider-prev',
		pager: true
	});
	$('.news-slider-01').bxSlider({
		auto: true,
		autoControls: true,
		autoControlsCombine: true,
		autoDelay: 500,
		pause: 4000,
		nextSelector: '.new-slider-next',
		prevSelector: '.new-slider-prev',
		minSlides: 1,
		maxSlides: 4,
		slideMargin: 0
	});

	// Template Script
	$('.type5-visual').bxSlider({
		auto: true,
		autoControls: true,
		autoControlsCombine: true,
		controls: false,
		autoDelay: 1000,
		mode: 'fade',
		pause: 5000,
	});
	$('.popup-zone').bxSlider({
		auto: true,
		// autoControls: true,
		// autoControlsCombine: true,
		controls: false,
		autoDelay: 1000,
		mode: 'fade',
		pause: 5000,
	});
            
    /*2017-01-04*/
    $('.news_photo .news_photo_slide').bxSlider({
       auto: true,
        autoControls: true,
        autoControlsCombine: true,
        autoDelay: 500,
        pause: 4000,
        nextSelector: '.news_photo .main-slider-next',
        prevSelector: '.news_photo .main-slider-prev',
        slideWidth: 350,
        minSlides: 1,
        maxSlides: 3,
        slideMargin: 25
    });

    $('.news_movie .news_movie_slide').bxSlider({
       auto: true,
        autoControls: true,
        autoControlsCombine: true,
        autoDelay: 500,
        pause: 4000,
        nextSelector: '.news_movie .main-slider-next',
        prevSelector: '.news_movie .main-slider-prev',
        slideWidth: 350,
        minSlides: 1,
        maxSlides: 3,
        slideMargin: 25
    });
     /* //2017-01-04*/

	// calendar Script
	$('.d-month td').click(function(){
		var $that = $(this);
		var phone = $that.find('span').css('display');
		if(phone=='block'){
			$('.d-month ul').hide();
			$('.d-month td').removeClass('select');
			$that.find('ul').toggle('fast',function(){
				$that.toggleClass('select');
			});
		}
	});

	var body = $('html, body');
	$('#goTop').click(function(e){
		e.preventDefault();
		body.animate({scrollTop:0}, '500', 'swing');
	});

	$('#baseTab a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	})
	$('#baseTab2 a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	})
	$('#baseTab3 a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	})
	$(".collapse").collapse();

	// (Faq) bootstrap tab + accordion bug ��ü ���ڵ��
	$('.accordion dt').on('click', function () {
		var current_dt = $(this);

		if (!$(this).next('dd').hasClass('active')){

			if (current_dt.siblings('dd.active').length) {
			current_dt
				.siblings('dd.active')
				.slideUp(function() {
				current_dt
				.next('dd')
				.slideDown('fast')
				.addClass('active');
				})
				.removeClass('active')
				.find('dd.active')
				.hide()
				.removeClass('active');

			} else {
			current_dt.next('dd').slideDown('fast').addClass('active');
			}
		} else {
			current_dt.next('dd').hide().removeClass('active');
		}
	});

	// Accordion Menu 2016-06-20 /* !! */
	
	$(".board-faq a").click(function(){
		//$(".toggle").removeClass("on");
		$(".board_reply").hide();
		$(this).toggleClass("on");
		if($(this).hasClass("on")) {
			$(this).parent().parent().siblings().children().children("a").removeClass("on");
			$(this).parent().siblings().children(".toggle").addClass("on");
			$(this).parent().parent().next(".board_reply").show();
		} else {
			$(this).parent().siblings().children(".toggle").removeClass("on");
			$(this).parent().parent().next(".board_reply").hide();
		}
	});

	// tree Menu /* !! */
	$(".tree-accordion.normal .tree-heading a").click(function(){
		$(this).toggleClass("on");
		$(this).parent().next(".tree-body").toggle();
	});
	$(".tree-accordion.organize .tree-heading a").click(function(){
		$(this).toggleClass("on");
		$(this).parent().parent().parent().next(".tree-body").toggle();
	});

	// Popup 2016-06-20 /* !! */
	$("#modal-content").iziModal({
		title: "���� �˻�",
		iconClass: 'icon-stack',
		overlayColor: 'rgba(0, 0, 0, 0.5)',
		width: 1100
	});
	$("#modal-srh-staff").iziModal({
		title: "������ �˻�",
		iconClass: 'icon-stack',
		overlayColor: 'rgba(0, 0, 0, 0.5)',
		width: 1100
	});
	$("#menu-plan").iziModal({
		title: "�Ĵ�ǥ ���",
		iconClass: 'icon-stack',
		overlayColor: 'rgba(0, 0, 0, 0.5)',
		width: 1100
	});
	$("#rgs-article").iziModal({
		title: "���ñ�� ����ϱ�",
		iconClass: 'icon-stack',
		overlayColor: 'rgba(0, 0, 0, 0.5)',
		width: 1100
	});
	$("#show-basket").iziModal({
		title: "���ñ�� �ٱ���",
		iconClass: 'icon-stack',
		overlayColor: 'rgba(0, 0, 0, 0.5)',
		width: 1100
	});
	$("#home-regist").iziModal({
		title: "Ȩ������ ���(URL)",
		iconClass: 'icon-stack',
		overlayColor: 'rgba(0, 0, 0, 0.5)',
		width: 1100
	});
	$("#rss-subscribe").iziModal({
		title: "RSS �����ϱ�",
		iconClass: 'icon-stack',
		overlayColor: 'rgba(0, 0, 0, 0.5)',
		width: 550
	});
	$("#rss-subscribe").iziModal({
		title: "RSS �����ϱ�",
		iconClass: 'icon-stack',
		overlayColor: 'rgba(0, 0, 0, 0.5)',
		width: 550
	});
	$("#p-chart1").iziModal({
		title: "����",
		iconClass: 'icon-stack',
		overlayColor: 'rgba(0, 0, 0, 0.5)',
		width: 1100
	});
	$("#p-chart2").iziModal({
		title: "���п�",
		iconClass: 'icon-stack',
		overlayColor: 'rgba(0, 0, 0, 0.5)',
		width: 1100
	});
	$("#p-chart3").iziModal({
		title: "����",
		iconClass: 'icon-stack',
		overlayColor: 'rgba(0, 0, 0, 0.5)',
		width: 1100
	});
	$("#p-chart4").iziModal({
		title: "�μӱ��",
		iconClass: 'icon-stack',
		overlayColor: 'rgba(0, 0, 0, 0.5)',
		width: 1100
	});
	$("#p-chart5").iziModal({
		title: "�μ����",
		iconClass: 'icon-stack',
		overlayColor: 'rgba(0, 0, 0, 0.5)',
		width: 1100
	});
	$("#p-chart6").iziModal({
		title: "��Ÿ���",
		iconClass: 'icon-stack',
		overlayColor: 'rgba(0, 0, 0, 0.5)',
		width: 1100
	});
	$("#p-chart7").iziModal({
		title: "�������´�",
		iconClass: 'icon-stack',
		overlayColor: 'rgba(0, 0, 0, 0.5)',
		width: 1100
	});
	$("#catalog2005").iziModal({
		title: "2005 ���п��",
		iconClass: 'icon-stack',
		overlayColor: 'rgba(0, 0, 0, 0.5)',
		width: 1100
	});
	$("#catalog2004").iziModal({
		title: "2004 ���п��",
		iconClass: 'icon-stack',
		overlayColor: 'rgba(0, 0, 0, 0.5)',
		width: 1100
	});
	$("#urlcopy").iziModal({
		title: "URL ����",
		iconClass: 'icon-stack',
		overlayColor: 'rgba(0, 0, 0, 0.5)',
		width: 478
	});
	$(".search-btn").click(function (e) {
		event.preventDefault();
		$('#modal-content').iziModal('open');
		$('#modal-srh-staff').iziModal('open');
		$('#menu-plan').iziModal('open');
		$('#rgs-article').iziModal('open');
		$('#home-regist').iziModal('open');
		$('#rss-subscribe').iziModal('open');
	});
	$(".modal-footer button").click(function (e) {
		event.preventDefault();
		$('#modal-content').iziModal('close');
		$('#modal-srh-staff').iziModal('close');
		$('#menu-plan').iziModal('close');
		$('#rgs-article').iziModal('close');
		$('#show-basket').iziModal('close');
		$('#home-regist').iziModal('close');
		$('#rss-subscribe').iziModal('close');
		$('#p-chart1').iziModal('close');
		$('#p-chart2').iziModal('close');
		$('#p-chart3').iziModal('close');
		$('#p-chart4').iziModal('close');
		$('#p-chart5').iziModal('close');
		$('#p-chart6').iziModal('close');
		$('#p-chart7').iziModal('close');
		$('#catalog2005').iziModal('close');
		$('#catalog2004').iziModal('close');
	});
    
    
    /*2016-12-27 �����߰� �˾�*/
     $("#modal-add-staff").iziModal({
            title: "�����˻�",
            iconClass: 'icon-stack',
            overlayColor: 'rgba(0, 0, 0, 0.5)',
            width: 864
    });

    $(".modal_add_staff").click(function (e) {
            event.preventDefault();          
            $('#modal-add-staff').iziModal('open');
    });

    $(".modal-footer button").click(function (e) {
            event.preventDefault();
            $('#modal-add-staff').iziModal('close');
            $('.iziModal-overlay').css({
            'background-color':'none'
        })
    });
    
    
    // 2016-12-28 �����߰� �˾�
    $("#modal-add-staff2").iziModal({
        title: "�����˻�",
        iconClass: 'icon-stack',
        overlayColor: 'rgba(0, 0, 0, 0.5)',
        width: 864
    });

    $(".modal_add_staff").click(function (e) {
        event.preventDefault();          
        $('#modal-add-staff2').iziModal('open');
    });

    $(".modal-footer button").click(function (e) {
        event.preventDefault();
        $('#modal-add-staff2').iziModal('close');
        $('.iziModal-overlay').css({
            'background-color':'none'
        })
    });
    
    /*2017-01-10 �Ѿ��� ���� ���� �߰� �˾�*/
     $("#modal-add-today").iziModal({
            title: "�Ѿ��� ���� ����",
            iconClass: 'icon-stack',
            overlayColor: 'rgba(0, 0, 0, 0.5)',
            width: 864
    });

    $(".modal_add_today").click(function (e) {
            event.preventDefault();          
            $('#modal-add-today').iziModal('open');
    });

    $(".modal-footer button").click(function (e) {
            event.preventDefault();
            $('#modal-add-today').iziModal('close');
            $('.iziModal-overlay').css({
            'background-color':'none'
        })
    });

     /* 2017-01-03 ��� ���� ��ü���� �˾� */
      $("#modal-commant").iziModal({
            title: "��� ���� ��ü����",
            iconClass: 'icon-stack',
            overlayColor: 'rgba(0, 0, 0, 0.5)',
            width: 1100
	   });
        
        $(".search-btn").click(function (e) {
              event.preventDefault();
              $('#modal-commant').iziModal('open');
	   });
     /*  // 2016-12-28 �����߰� �˾� */

    
/*
	$("#splash_list").iziModal({
		title: "���� �������� ����",
		iconClass: 'icon-stack',
		overlayColor: 'rgba(0, 0, 0, 0.5)',
		width: 1100
	});
	$("#splash_view").iziModal({
		title: "���� �������� ����",
		iconClass: 'icon-stack',
		overlayColor: 'rgba(0, 0, 0, 0.5)',
		width: 1100
	});
	$(".past_splash").click(function (e) {
		event.preventDefault();
		$('#splash_list').iziModal('open');
	});
	$("td.spl > a").click(function (e) {
		event.preventDefault();
		$('#splash_list').iziModal('close');
		$('#splash_view').iziModal('open');
	});
	$(".btn_spl_list").click(function (e) {
		$('#splash_view').iziModal('close');
		$('#splash_list').iziModal('open');
	});
*/
	//�˾� : ������ �޴� ũ�Ժ���
	$("#layer_foodmenu").iziModal({
		//title: "������ �޴� ũ�Ժ���",
		iconClass: 'icon-stack',
		overlayColor: 'rgba(0, 0, 0, 0.7)',
		width: 1024
	});

	$('#layer_foodmenu .btn_close').click(function () {
		$('#layer_foodmenu').iziModal('close');
	});

	var food_img = $('.foodView-view .bbs .thumbnail-list-wrap .span3 a');

	$('.foodView-view .bbs .thumbnail-list-wrap .span3 a > img').error(function() {
		$( this ).attr( "src", "/html-repositories/images/custom/food/no-img.jpg" );
	});

	$(food_img).click(function (e) {
		$('#layer_foodmenu').iziModal('open');

		var img_src = $(e.target).parents('li').children('a').children('img').attr('src');
		$('.img_foodmenu').attr( "src", img_src );
	});
	
	//�˾� : ������ Ȩ������ ���� �ȳ�
	$("#msg_renewal").iziModal({
		//title: "������ Ȩ������ ���� �ȳ�",
		iconClass: 'icon-stack',
		overlayColor: 'rgba(0, 0, 0, 0.5)',
		width: 600
	});
	//$('#msg_renewal').iziModal('open');
	$('#msg_renewal .btn_close').click(function () {
		$('#msg_renewal').iziModal('close');
	});

	$("_foodView_WAR_foodportlet_cancel_menuCart").click(function (e) {
		$('#menu-plan').iziModal('close');
	});
	$(".basket-btn").click(function (e) {
		event.preventDefault();
		$('#rgs-article').iziModal('close');
		$('#show-basket').iziModal('open');
	});
	$(".b-chart.c1 a").click(function (e) {
		event.preventDefault();
		$('.b-chart').iziModal('close');
		$('#p-chart1').iziModal('open');
	});
	$(".b-chart.c2 a").click(function (e) {
		event.preventDefault();
		$('.b-chart').iziModal('close');
		$('#p-chart2').iziModal('open');
	});
	$(".b-chart.c3 a").click(function (e) {
		event.preventDefault();
		$('.b-chart').iziModal('close');
		$('#p-chart3').iziModal('open');
	});
	$(".b-chart.c4 a").click(function (e) {
		event.preventDefault();
		$('.b-chart').iziModal('close');
		$('#p-chart4').iziModal('open');
	});
	$(".b-chart.c5 a").click(function (e) {
		event.preventDefault();
		$('.b-chart').iziModal('close');
		$('#p-chart5').iziModal('open');
	});
	$(".b-chart.c6 a").click(function (e) {
		event.preventDefault();
		$('.b-chart').iziModal('close');
		$('#p-chart6').iziModal('open');
	});
	$(".b-chart.c7 a").click(function (e) {
		event.preventDefault();
		$('.b-chart').iziModal('close');
		$('#p-chart7').iziModal('open');
	});
	$(".catalog .year2005 a").click(function (e) {
		event.preventDefault();
		$('#catalog2005').iziModal('open');
	});
	$(".catalog .year2004 a").click(function (e) {
		event.preventDefault();
		$('#catalog2004').iziModal('open');
	});
	$(".p-urlcopy").click(function (e) {
		event.preventDefault();
		$('#urlcopy').iziModal('open');
	});
    
    
    
    /*2016-12-16*/
    $("#modal-diet").iziModal({
        title: "�Ĵ�",
        iconClass: 'icon-stack',
        overlayColor: 'rgba(0, 0, 0, 0.5)',
        width: 864
    });

    $(".foodView-view .thumbnail").click(function (e) {
        event.preventDefault();
        var popImgSrc = $(this).find('img').attr('src');
        $('.pop_img').find('img').attr('src',popImgSrc);
        $('#modal-diet').iziModal('open');
    });

    $(".modal-footer button,.iziModal-button-close").click(function (e) {
        event.preventDefault();
        $('#modal-diet').iziModal('close');
        $('.iziModal-overlay').remove();
    });

    /*���� �̴��� ������*/
    $('.main_researcher .portlet-body').bxSlider({
        mode:'fade',
        auto: true,
        autoControls: true,
        autoControlsCombine: true,
        autoDelay: 500,
        pause: 4000,
        nextSelector: '.researcher-slider-next',
        prevSelector: '.researcher-slider-prev'
    });

	var wsrh_bt = $(".iziModal-content .search_box button").css("width");
	var msrh_bt = $(".iziModal-content .common-input-text").css("margin-right");
	$('.iziModal-content .group_search .common-input-text').css("width", "calc(100% - " + wsrh_bt + " - " + msrh_bt + ")");

	// board Button Script
	$("#checkAll").click(function(){
		var tureFlase = $("#checkAll").attr('name');
		var notTab = $(this).hasClass('tab-check');

		if (notTab) {
			// ���� ���� üũ�ڽ��� ��
			var searchTable = $(this).parent().parent().parent().next();
			if(tureFlase == 'true') { //check all already
				searchTable.find('input[type=checkbox]').prop("checked",false);
				$(this).attr('name','false');
			} else { //
				searchTable.find('input[type=checkbox]').prop("checked",true);
				$(this).attr('name','true');
			};

		}else{
			// ���� ���� üũ�ڽ��� ��
			if(tureFlase == 'true') { //check all already
				$(".bbs-board input[type=checkbox], .qa-board input[type=checkbox]").prop("checked",false)
				$(this).attr('name','false');
			} else { //
				$(".bbs-board input[type=checkbox], .qa-board input[type=checkbox]").prop("checked",true);
				$(this).attr('name','true');
			};

		};
	})
	/* $(".bbs-button-wrap button, .comment-button-box button, .btn-prompt button").click(function(){
		var action = $(this).attr('name');
		var msg;
		// alert(action);
		if (action != undefined) {
			if (action == 'list-button-delete') {
				msg = '�ش� �Խñ��� �����Ͻðڽ��ϱ�?';
			}else if (action == 'list-button-hidden') {
				msg = '�ش� �Խñ���  ����ڽ��ϱ�?';
			}else if (action == 'list-button-undo') {
				msg = '�ش� �Խñ���  �ǻ츮�ðڽ��ϱ�?';
			}else if (action == 'comment-button-delete') {
				msg = '�ش� ����� �����Ͻðڽ��ϱ�?';
			}else if (action == 'comment-button-hidden') {
				msg = '�ش� �����  ����ڽ��ϱ�?';
			}else if (action == 'comment-button-undo') {
				msg = '�ش� �����  �ǻ츮�ðڽ��ϱ�?';
			}else if (action == 'order-button-delete') {
				msg = '�ش� ����/���� �����Ͻðڽ��ϱ�?';
			}else if (action == 'staff-button-delete') {
				msg = '�ش� �������� �����Ͻðڽ��ϱ�?';
			}else if (action == 'rep-button-identify') {
				msg = '�̹� ������� Ȩ���������Դϴ�. ��� �� �� �����ϴ�!!';
			};
			confirm(msg);
		};
	}); */
	$(".table-cms-result .col_btn .intro button").click(function(){
		$(".pop-intro").hide();
		$(this).parent().parent().children(".pop-intro").show();
	});
	$(".table-cms-result .pop-footer .pop_close").click(function(){
		$(this).parent().parent().hide();
	});


	// ellipsis wrapper
	// $('.box-wrap ul li a').dotdotdot({watch:'window'});
	// $('.box-wrap ul li a p').dotdotdot({watch:'window'});
	$('.tab-box-wrap[class *= "tab-type"] .nav-tabs li a span').dotdotdot({watch:'window'}); // 160928(2)
	
	//$('.tab-box-wrap[class *= "tab2-type"] .nav-tabs li a span').dotdotdot({watch:'window'}); //161004
	$('.portlet-boundary:not(.viewNotice-portlet) .tab-box-wrap[class *= "tab2-type"] .nav-tabs li a span').dotdotdot({watch:'window'});
	
	$('.box-type01 ul li a, .box-type01 ul li a p').dotdotdot({watch:'window'});
	$('.box-bodo a dt, .box-bodo a dd').dotdotdot({watch:'window'});
	$('#content.gallery .m-list>div li dt, #content.gallery .m-list>div li dd').dotdotdot({watch:'window'});
	$('.magazine .thumbnail h3, .magazine .thumbnail p').dotdotdot({watch:'window'});
	$('.month-people-wrap .txt-box-wrap h2, .month-people-wrap .txt-box-wrap h3').dotdotdot({watch:'window'});
	$('.splash_banner .visual_txt h3, .splash_banner .visual_txt h2').dotdotdot({watch:'window'});
	$('.ovf_text li').dotdotdot({watch:'window'});
	$('.ovf_text li > a').css('display','block');
	$('.box-main-schedule .box li .event-desc').dotdotdot({watch:'window'});

	// $('.board-list td a').dotdotdot();

	//���� �Խñ� ���
	$('.news .board-list.bbs-board td div > div .t-cont').dotdotdot({watch:'window'}); 

	// $('#_foodView_WAR_foodportlet_menuCart').click(function(){
	// 	$('#menu-plan').css('margin-top','-200px');
	// });

	$('.hub .auto-hover .span3').hover(function(){
		var obj = $(this).find('img')[0];
		var imgName = obj.src.slice(obj.src.lastIndexOf('/') + 1, obj.src.length);
		imgName = imgName.replace('.', '_ov.');
		obj.src = '/html-repositories/images/custom/hub/' + imgName;
	},function(){
		var obj = $(this).find('img')[0];
		var imgName = obj.src.slice(obj.src.lastIndexOf('/') + 1, obj.src.length);
			imgName = imgName.replace('_ov', '');
		obj.src = '/html-repositories/images/custom/hub/' + imgName;
	});

});//function



// function imgExchangeHub(objSpan){
// 	obj = objSpan.getElementsByTagName('img')[0];
// 	imgName = obj.src.slice(obj.src.lastIndexOf('/') + 1, obj.src.length);
// 	imgPath = '../../images/custom/hub/';
// 	if(imgName.indexOf('_ov') > 0){
// 		imgName = imgName.replace('_ov', '');
// 	}else{
// 		imgName = imgName.replace('.', '_ov.');
// 	}
// 	obj.src = imgPath + imgName;
// }

/* ���޴�-��ũ�ѱ�� 
$(window).scroll(function(){
	var quick_menu = $('#quickmenu');
	var quick_top = 742;
	var scrollTop = $('body').scrollTop();

	if(scrollTop > quick_top/1.5){
		quick_menu.stop().animate( { "top": $(document).scrollTop() + 200}, 400 );
	}else{
		quick_menu.stop().animate( { "top": quick_top}, 400 );
	}
});
*/

/* ���޴�-ȭ���߾� ������ */
$(document).ready(function (){
	var wh = $(window).height(),
		qb = $('#quickmenu').height();
		
	$('#quickmenu').css('top', ( ( wh * 0.5 ) - ( qb * 0.5 ) ) + 'px');

});
/*
$(window).resize(function(){
	var img1 =$('.news-main .n-list li').eq(0);
	var img2 =$('.news-main .n-list li').eq(1);
	var img3 =$('.news-main .n-list li').eq(2);
	var img4 =$('.news-main .n-list li').eq(3);

	if(img1.height()>img2.height()){
		img1.height(img2.height())	
		img3.height(img2.height())	
		img4.height(img2.height())	
	}else if(img1.height()<img2.height()){
		img1.height(img2.height())	
		img3.height(img2.height())	
		img4.height(img2.height())	
	}
	if(img3.height()>img4.height()){
		img3.height(img2.height())	
		img4.height(img2.height())	
	}else if(img3.height()<img4.height()){
		img3.height(img2.height())	
		img4.height(img2.height())	
	}
});
*/

if($('#file').length >0){
	$('#file').select();
	document.execCommand('Delete');
	document.selection.clear();
}

// Promotion Video Script
$(function(){
	var iframe = $('#player1')[0],
	player = $f(iframe);

	player.addEvent('ready', function() {
	// froogaloop2.min.js [ready error] ����
	});

	// Call the API when a button is pressed
	$('button').bind('click', function() {
		$('.cover-button').hide();
		player.api($(this).text().toLowerCase());
	});
});

//footer �йи�����Ʈ �̵�
//����̽� width�� 768�ʰ�
if( $(window).width() > 768 ){
	$('.site-button').attr('onclick','go_url()');
	
	$('.site-linker select').click(function (e) {
		$(e.target).attr('selected',true);
	});

	function go_url(){ 
		var url = $('.site-linker select option:selected').val();
		
		if (url != '') {
			window.open(url, "_blank", "");
		}
		return false;
	}
	
	$('.site-button2').attr('onclick','go_url2()');
	
	$('.site-linker2 select').click(function (e) {
		$(e.target).attr('selected',true);
	});

	function go_url2(){ 
		var url = $('.site-linker2 select option:selected').val();

		if (url != '') {
			window.open(url, "_blank", "");
		}
		
		return false;
	}
}

//����̽� width�� 768����
$(document).ready(function () {
	if( $(window).width() <= 768 ){
		var murl;

		$('.site-button').removeAttr('onclick');

		$('.site-linker select').change(function () {
			$('.site-linker select option:selected').each(function () {
				murl = $(this).val();
			});
		});

		murl = $('.site-linker select').val();

		$('.site-button').click(function () {
			if (murl != '') window.open(murl, "_blank", ""); 
		});
		
		var murl2;

		$('.site-button2').removeAttr('onclick');

		$('.site-linker2 select').change(function () {
			$('.site-linker2 select option:selected').each(function () {
				murl2 = $(this).val();
			});
		});

		murl2 = $('.site-linker2 select').val();

		$('.site-button2').click(function () {
			if (murl2 != '') window.open(murl2, "_blank", ""); 
		});
	}
});

//����Ʈ ������ �̹��� ����ó��
$(document).ready(function () {
	$('.gate-list li a img').error(function() {
		$( this ).attr( "src", "/html-repositories/images/custom/common/no_gatethumb.png" );
	});
});

//�Խ��� �������� ���������� �̹��� ����
function thumbImgResize(){
	var window_w = $(window).width();
	var thumbox = $('.bbs-board .title-thumb');
	var thumbox_w = Math.round( $(thumbox).width() );
	var thumbox_h = Math.round( ( 2 / 3 ) * thumbox_w );
	var m_thumbox_w = Math.round( window_w - 28 );
	var m_thumbox_h = Math.round( ( 1 / 2 ) * m_thumbox_w );

	if( window_w > 768 ){
		//����̽� width�� 768�ʰ�
		$('.bbs-board .title-thumb').css({
			overflow: 'hidden',
			height: thumbox_h + 'px'
		});
	}else{
		//����̽� width�� 768����
		$('.bbs-board .title-thumb img').each(function () {
			if( $(this).height() <= m_thumbox_h ){
				$(this).parents('.title-thumb').css({
					height: 'auto'
				});
			}else{
				$(this).parents('.title-thumb').css({
					overflow: 'hidden',
					height: m_thumbox_h + 'px'
				});
			}
		});
	}
}

$(window).resize(thumbImgResize);
$(document).ready(function(){
	//resize
	thumbImgResize();
});

//�Խ��� '�����'��ư �����
/*
$(document).ready(function () {
	$('.bbs-board .hidden-button button').each(function () {
		var bttn_txt = $(this).text();

		if( bttn_txt == '�����' ){
			$('.bbs-board .hidden-button button').hide();
		}
	});
}); */