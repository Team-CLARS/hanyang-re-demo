var obj = obj || {};
; (function (obj, $, window, document, undefined) {
	'use strict';
	var $window = $(window),
		$document = $(document),
		$html = $document.find('html'),
		$body = $document.find('body'),
		$wrap = $body.find('#wrap')
			.append('<div class="dimmed"></div>'),
		$header = $wrap.find('#header'),
		$headerBg = $header.append('<div class="gnb-bg"></div>'),
		$headerInner = $header.find('.inner'),
		$logo = $header.find('h1'),
		$gnb = $header.find('#gnb'),
		$content = $body.find('#content'),
		$footer = $body.find('#footer'),
		windowWidth = $window.width(),
		windowHeight = $window.height(),
		windowScrollTop = $window.scrollTop(),
		windowScrollLeft = $window.scrollLeft(),
		currentClass = 'current',
		mobileWidth = 769,
		aniSpeed = 200,
        originHeight = $window.height();

	function deviceCheck() {
		var filter = "win16|win32|win64|mac|macintel";
		if (navigator.platform) {
			if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
				$html.addClass('mob')
			} else {
				$html.addClass('pc')
			}
		}
	}
	deviceCheck();

	function mobileCheck() {
		var width_size = window.innerWidth;
		if (width_size < mobileWidth) {
			$html.addClass('mob');
			$html.removeClass('pc');
		} else {
			$html.addClass('pc');
			$html.removeClass('mob');
		}
	}
	//mobileCheck();

	function footerFamily() {
		var $footerFamily = $wrap.find('.footer-family'),
			$familyBtn = $footerFamily.find('button');
		$familyBtn.off().on('click', function () {
			var $this = $(this),
				url = $this.parents('.footer-family').find('option:selected').val();
			if (url) {
				window.open(url, '_blank');
			}
			// window.open(url, '_blank');
		});
	}
	footerFamily();

	function mainSlide() {
		var $mainVisual = $wrap.find('.main-visual'),
			$mainSlide = $mainVisual.find('.main-slide ul'),
			mainslide = $mainSlide.bxSlider({
				mode: 'fade',
				auto: $('.main-slide ul li').length > 1,
				controls: $('.main-slide ul li').length > 1,
				pager: $('.main-slide ul li').length > 1,
				speed: 700,
				pause: 7000,
				//video: true,
				autoControls: $('.main-slide ul li').length > 1,
				autoControlsCombine: true,
				pagerType: 'short',
				onSliderLoad: function (currentIndex) {
					$mainVisual.find('.bx-controls .bx-controls-auto').add('.bx-controls .bx-pager').wrapAll("<div class='pager-wrap'></div>");
					if ($mainSlide.find('> li').eq(currentIndex).find('video').length > 0) {
						var $video = $mainSlide.find('> li').eq(currentIndex).find('video');
						$video.on("ended", function () {
							$('.bx-next').trigger('click');
						});
						if ($('.bx-stop').is(':visible')) {
							setTimeout(function () {
								$('.bx-stop').trigger('click');
							}, 100);
						}
					}
				},
				onSlideAfter: function ($slideElement, oldIndex, newIndex) {
					if ($mainSlide.find('video').length > 0) {
						$mainSlide.find('video').get(0).pause();
						$mainSlide.find('video').get(0).currentTime = 0;
					}
					if ($slideElement.find('video').length > 0) {
						var $video = $slideElement.find('video');
						$slideElement.find('video').get(0).play();
						$video.on("ended", function () {
							$('.bx-next').trigger('click');
						});
						
						if ($('.bx-stop').is(':visible')) {
							setTimeout(function () {
								$('.bx-stop').trigger('click');
							}, 100);
						}
					} else {
						if ($('.bx-start').is(':visible')) {
							setTimeout(function () {
								$('.bx-start').trigger('click');
							}, 100);
						}
					}
				},
			});
		$mainVisual.find('.bx-controls-direction a').on('click', function () {
			mainslide.stopAuto();
		});
	}
	mainSlide();

	function mainContentSlide() {
		var swiper = new Swiper('.main-content-slide', {
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		})
	}
	mainContentSlide();

	function mainContentSlide2() {
		var width_size = window.innerWidth;
		if (width_size = mobileWidth) {
			var swiper = new Swiper('.slide-boards', {
				slidesPerView: 2,
				slidesPerColumn: 2,
				slidesPerGroup: 2,
				spaceBetween: 70,
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
			})
		}
	}
	mainContentSlide2();

	function mainContentSlide3() {
		var width_size = window.innerWidth;
		if (width_size = mobileWidth) {
			var swiper = new Swiper('.main-card-slide', {
				slidesPerView: 3,
				spaceBetween: 70,
				slidesPerGroup: 3,
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
			})
		}
	}
	mainContentSlide3();

	function mainContentSlide4() {
		var width_size = window.innerWidth;
		if (width_size > mobileWidth) {
			var swiper = new Swiper('.event-slider', {
				slidesPerView: 3,
				spaceBetween: 70,
				slidesPerGroup: 3,
				observer: true,
				observeParents: true,
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
			})
		}
	}
	mainContentSlide4();

	function mainContentSlide6() {
		var width_size = window.innerWidth;
		if (width_size < mobileWidth) {
			var swiper = new Swiper('.event-slider', {
				slidesPerView: 3,
				spaceBetween: 70,
				slidesPerGroup: 3,
				observer: true,
				observeParents: true,
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
			})
		}
	}
	mainContentSlide6();

	function mainTabContent() {
		var $mainTabWrap = $wrap.find('.main-tab-wrap'),
			$mainTabMenu = $mainTabWrap.find('.main-tab-menu'),
			$mainTabMenulist = $mainTabMenu.find('> li'),
			$mainTabContent = $mainTabWrap.find('.main-tab-content');
		$mainTabMenulist.find('> a').on('click', function (e) {
			e.preventDefault();
			var $this = $(this),
				target = $this.attr('href');
			$mainTabMenulist.removeClass(currentClass);
			$this.parent().addClass(currentClass);
			$mainTabContent.hide();
			$(target).show();
		})
	}
	mainTabContent();

	function headerLang() {
		var $lang = $wrap.find('.header .lang'),
			$langBtn = $lang.find('> button'),
			$langList = $lang.find('> ul');
		$langBtn.on('click', function () {
			$langList.stop().slideToggle();
		});
	}
	headerLang();

	obj.totalSearch = {
		tgEl: {},
		init: function () {
			var tgEl = obj.totalSearch.tgEl;
			tgEl.$header = $header,
				tgEl.$totalSearch = $wrap.find('.total-search'),
				tgEl.$totalToggleBtn = tgEl.$totalSearch.find('.toggle-button'),
				tgEl.$totalToggleText = tgEl.$totalToggleBtn.find('span'),
				tgEl.$mobSearch = tgEl.$header.find('.mob-search'),
				tgEl.$mobSearchClose = tgEl.$header.find('.close-button');

			obj.totalSearch.pcSearchToggle();
			obj.totalSearch.mobSearchOpen();
			obj.totalSearch.mobSearchClose();
			obj.totalSearch.reset();
		},
		pcSearchToggle: function () {
			var tgEl = obj.totalSearch.tgEl;

			tgEl.$totalToggleBtn.on('click', function () {
				if (windowWidth > mobileWidth) {
					tgEl.$totalSearch.toggleClass(currentClass);
					if (tgEl.$totalToggleText.text() === 'search open') {
						tgEl.$totalToggleText.text('search close');
					} else {
						tgEl.$totalToggleText.text('search open');
					}
				}
			});
		},
		mobSearchOpen: function () {
			var tgEl = obj.totalSearch.tgEl;
			tgEl.$totalToggleBtn.on('click', function () {
				if (windowWidth < mobileWidth) {
					tgEl.$mobSearch.show().attr('tabindex', -1).focus();
				}
			});
		},
		mobSearchClose: function () {
			var tgEl = obj.totalSearch.tgEl;
			tgEl.$mobSearchClose.off().on('click', function () {
				tgEl.$mobSearch.removeAttr('tabindex').hide();
			});
		},
		reset: function () {
			var tgEl = obj.totalSearch.tgEl;
			tgEl.$totalToggleText.text('search open');
			tgEl.$totalSearch.removeClass(currentClass);
			tgEl.$mobSearch.hide();
		},
	}
	obj.totalSearch.init();

	obj.header = {
		tgEl: {
			lockScrollClass: 'LS',
		},
		init: function () {
			var tgEl = obj.header.tgEl;
			tgEl.$header = $header;
			tgEl.$gnbBg = tgEl.$header.find('.gnb-bg');
			tgEl.$gnbList = $gnb.find('.gnb-list');
			tgEl.$gnb1Depth = tgEl.$gnbList.find('> li > a');
			tgEl.$gnb2Depth = tgEl.$gnbList.find('.items > .item > a');
			tgEl.$subMenu = tgEl.$gnb1Depth.next('.items');
			tgEl.$mobBtn = tgEl.$header.find('.mobile-menu');
			tgEl.$mobBtnClose = tgEl.$header.find('.close-mob-menu');
			obj.header.mouseInOut();
			obj.header.subMenu();
			obj.header.reset();
			if (windowWidth < mobileWidth) {
				obj.header.mobileMenu();
			}
		},
		mouseInOut: function () {
			var tgEl = obj.header.tgEl;
			tgEl.$header.off().on('mouseenter', function () {
				if (!$html.hasClass('mob')) {
					tgEl.$header.addClass('over');
				}
			});
			tgEl.$header.off().on('mouseleave', function () {
				if (!$html.hasClass('mob')) {
					tgEl.$header.removeClass('over');
					tgEl.$subMenu.hide();
					tgEl.$gnbBg.hide().css('height', '0');
				}
			})
		},
		subMenu: function () {
			var tgEl = obj.header.tgEl;
			if (windowWidth > mobileWidth) {
				tgEl.$gnb1Depth.off('click').on({
					'focusin mouseenter': function () {
						var $this = $(this),
							$items = $this.next('.items'),
							$item = $items.find('.item'),
							subHeight = $items.outerHeight(true),
							itemHeight = $item.css('height', true);

						tgEl.$subMenu.hide();
						$items.show().css('display', 'table');
						$item.css('height', itemHeight);

						if ($items.length) {
							obj.header.gnbBg(subHeight);
						} else {
							tgEl.$gnbBg.hide();
						}
					}
				})

				//tgEl.$gnb2Depth.on({
				//	'click': function () {
				//		tgEl.$gnbBg.hide();
				//	}
				//})
				tgEl.$header.find('.header-top').on({
					'focusin mouseenter': function () {
						tgEl.$subMenu.hide();
						tgEl.$gnbBg.hide();
					}
				})
			} else {
				tgEl.$gnbList.find('li a').each(function () {
					if ($(this).next().length < 1) {
						$(this).addClass('no-submenu');
					}
				})
				tgEl.$gnb1Depth.off('focusin mouseenter').on({
					'click': function (e) {
						var $this = $(this),
							$items = $this.next('.items');
						if ($this.next().length > 0) {
							e.preventDefault();
							if ($items.is(':animated')) return false;
							tgEl.$gnb1Depth.not($this).removeClass(currentClass);
							$this.toggleClass(currentClass);

							tgEl.$gnb1Depth.not($this).next().slideUp(aniSpeed);
							$this.next().slideToggle(aniSpeed);

							tgEl.$gnb2Depth.removeClass(currentClass);
							tgEl.$gnb2Depth.next().slideUp(aniSpeed);
						}
					}
				});
				tgEl.$gnb2Depth.off('focusin mouseenter').on({
					'click': function (e) {
						var $this = $(this);
						if ($this.next().length > 0) {
							e.preventDefault();
							if ($this.next().is(':animated')) return false;
							tgEl.$gnb2Depth.not($this).removeClass(currentClass);
							$this.toggleClass(currentClass);

							tgEl.$gnb2Depth.not($this).next().slideUp(aniSpeed);
							$this.next().slideToggle(aniSpeed);
						}
					}
				});
			}
		},
		mobileMenu: function () {
			var tgEl = obj.header.tgEl;
			tgEl.$mobBtn.off().on({
				'click': function () {
					tgEl.$header.addClass('mob-menu-open');
					$html.addClass(tgEl.lockScrollClass);
				}
			});
			tgEl.$mobBtnClose.off().on({
				'click': function () {
					tgEl.$header.removeClass('mob-menu-open');
					$html.removeClass(tgEl.lockScrollClass);
					obj.header.reset();
				}
			});
		},
		reset: function () {
			var tgEl = obj.header.tgEl;
			tgEl.$header.removeClass('mob-menu-open');
			tgEl.$gnbList.find('a').removeClass(currentClass);
			tgEl.$subMenu.hide();
			tgEl.$gnbBg.hide().css('height', '0');
			// if ( $html.hasClass('mob') ) {
			// 	console.log('모바일')
			// }
			$html.removeClass(tgEl.lockScrollClass);
		},
		gnbBg: function (height) {
			var tgEl = obj.header.tgEl;
			tgEl.$gnbBg.show().css('height', height + 5);
		}
	};
	obj.header.init();

	obj.fixedHeader = {
		tgEl: {
			// lockScrollClass: 'LS',
		},
		init: function () {
			var tgEl = obj.fixedHeader.tgEl;
			tgEl.$notice = $wrap.find('.notice-banner');
			tgEl.$header = $header;
			tgEl.noticeHeight = tgEl.$notice.outerHeight();
			obj.fixedHeader.noticeBanner();
			obj.fixedHeader.lockScroll();
		},
		noticeBanner: function () {
			var tgEl = obj.fixedHeader.tgEl;

			if (tgEl.$notice.length && tgEl.$notice.is(':visible')) {
				tgEl.$header.css({
					top: tgEl.noticeHeight
				})
			}
			
			// 211129
			if(tgEl.$notice.hasClass('hide') && tgEl.$notice.is(':hidden')) {
				console.log('hide')
				tgEl.$header.css({top: 0})
			}

			if (windowScrollTop > tgEl.noticeHeight) {
				tgEl.$header.addClass('fixed').css({
					top: 0
				});
			} else {
				if (tgEl.$notice.is(':visible')) {
					tgEl.$header.removeClass('fixed').css({
						top: tgEl.noticeHeight
					});
				} else {
					if (windowScrollTop > 0) {
						tgEl.$header.addClass('fixed').css({
							top: 0
						});
					} else {
						tgEl.$header.removeClass('fixed');
					}
				}
			}
			
			/*
			tgEl.$notice.find('.close-button').on('click', function () {
				tgEl.$header.animate({
					top: 0
				}, aniSpeed);
			})
			*/
		
		},
		lockScroll: function () {
			var tgEl = obj.fixedHeader.tgEl;
			if (windowWidth < mobileWidth) return false;
			if (windowWidth < $headerInner.width() || windowHeight < 600) {
				if (!$html.hasClass('mob')) {
					$html.addClass(tgEl.lockScrollClass);
				}
				if (tgEl.$notice.is(':visible') && windowScrollTop < tgEl.noticeHeight) {
					tgEl.$header.css({
						top: tgEl.noticeHeight
					});
				}
				if ($html.hasClass('mob') && windowScrollTop > tgEl.noticeHeight) {
					tgEl.$header.addClass('fixed').css({
						top: 0
					});
				}
			} else {
				$html.removeClass(tgEl.lockScrollClass);
				if (windowScrollTop > tgEl.noticeHeight) {
					tgEl.$header.addClass('fixed').css({
						top: 0
					});
				}
			}
		}
	}
	obj.fixedHeader.init();


	obj.footerMenu = {
		tgEl: {},
		init: function () {
			var tgEl = obj.footerMenu.tgEl;
			tgEl.$footerMenu = $wrap.find('.footer-menu');
			tgEl.$footerBtn = tgEl.$footerMenu.find('> button');
			tgEl.$menuContent = tgEl.$footerMenu.find('.menus');
			obj.footerMenu.subContent();
		},
		subContent: function () {
			var tgEl = obj.footerMenu.tgEl;
			tgEl.$footerBtn.off().on('click', function () {
				var $this = $(this);
				if ($this.next().is(':animated')) return false;
				if (windowWidth > mobileWidth) {
					tgEl.$footerBtn.toggleClass(currentClass);
					tgEl.$menuContent.stop().slideToggle(200);
				} else {
					tgEl.$footerBtn.not($(this)).removeClass(currentClass)
					$this.toggleClass(currentClass);
					tgEl.$menuContent.not($this).slideUp();
					$this.next().stop().slideToggle();
				}
			})
		},
		reset: function () {
			var tgEl = obj.footerMenu.tgEl;
			if (windowWidth < mobileWidth) {
				tgEl.$footerBtn.removeClass(currentClass);
				tgEl.$menuContent.slideUp().removeAttr("style");
			}
		}
	}
	obj.footerMenu.init();

	$window.on({
		'resize': function () {
			windowWidth = $window.width();
			windowHeight = $window.height();

			mobileCheck();
			obj.header.init();
			obj.fixedHeader.lockScroll();
			obj.footerMenu.reset();
			obj.footerMenu.init();

            if(originHeight == windowHeight){
                obj.totalSearch.reset();     
            }else{
                originHeight = windowHeight;
            }
			
		},
		'scroll': function () {
			windowScrollTop = $window.scrollTop();
			obj.fixedHeader.init();
		},
		'DOMContentLoaded': function () {
			mobileCheck();
		},
		'load': function () {
			obj.fixedHeader.init();
		},
	});
})(obj, jQuery, window, document);


//sub lnb
  $(".sub_lnb_wrap .sub_lnb .lnb_item .sub_lnb_child").hide();
  // $("ul > li:first-child a").next().show();
  $(".sub_lnb_wrap .sub_lnb .sub_lnb_parent .lnb_item > a").click(function(){
  	$(this).addClass('active');
    $(this).next().slideToggle(100);
    // $(this).next().slideDown(300);
    $(".sub_lnb_wrap .sub_lnb .sub_lnb_parent .lnb_item > a").not(this).next().slideUp(100);
    $(".sub_lnb_wrap .sub_lnb .sub_lnb_parent .lnb_item > a").not(this).removeClass('active')
    return false;
  });
  $(".sub_lnb_wrap .sub_lnb ul li a.active").trigger("click");  


//sub D-type slider
 var swiper = new Swiper('.swiper-college-container', {
 	effect: 'fade',
 	loop: true,
 	autoHeight: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

//custom select
var x, i, j, l, ll, selElmnt, a, b, c;
x = document.getElementsByClassName("sub_tab_m");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
document.addEventListener("click", closeAllSelect);

//sub gnb 
var didScroll; 
var lastScrollTop = 0; 
var delta = 5;
var navbarHeight = $('.header').outerHeight(); 

$(window).scroll(function(event){ 
	didScroll = true; 
}); 

setInterval(function() { 
	if (didScroll) { 
		hasScrolled();
		didScroll = false; 
	} 
}, 250); 
function hasScrolled() { 
	var st = $(this).scrollTop(); 
	if(Math.abs(lastScrollTop - st) <= delta) 
		return;
	
	if (st > lastScrollTop && st > navbarHeight){ 
		$('.header').removeClass('nav-down').addClass('nav-up'); 
	} else { 
		if(st + $(window).height() < $(document).height()) { 
			$('.header').removeClass('nav-up').addClass('nav-down'); 
		} 
	}
	lastScrollTop = st; 
}

//notice rolling
var height = $(".notice_roll .roll").height();
var num = $(".notice_roll .roll .text li").length;
var max = height * num;
var move = 0;

function noticeRolling(){
	var height = window.$(".notice_roll .roll").height(); //재할당
	var wResize = $("html,body").width();
	move += height;
	$(".notice_roll .roll .text").animate({"top":-move},600,function(){
		//width값 확대축소 조정테스트시 슬라이드 위치찾는 버그현상은 초단위로 조정요청
		if( move >= max ){
			$(this).css("top",0);
			move=0;
		}
		else if(wResize>=768 && move >= max){
			$(this).css("top",-10+"px"); 
		}
	});
};

noticeRollingOff = setInterval(noticeRolling,2000);
$(".notice_roll .roll .text ").append($(".notice_roll .roll .text li").first().clone());


//masonry 
var msnry = new Masonry( '.grid', {
	itemSelector: '.grid-item',
	// columnWidth: 200
	columnWidth: '.grid-sizer',
	percentPosition: true,
	gutter : 58,
	});
	imagesLoaded( '.grid' ).on( 'progress', function() {
	msnry.layout();
});



