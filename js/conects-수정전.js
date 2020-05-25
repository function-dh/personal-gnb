/* snb 시작 */
/* snb_banner */
function snbSlide(){
	var snbBanner = document.querySelector('.snb_banner .snb_banner_slide')
	var snbSlide = document.querySelectorAll('.snb_banner .snb_banner_slide li')
	var snbBtnPrev = document.querySelector('.snb_banner_btn .snb_banner_prev')
	var snbBtnNext = document.querySelector('.snb_banner_btn .snb_banner_next')
	var snbBtnStop = document.querySelector('.snb_banner_btn .snb_banner_stop')
	var snbBtnPlay = document.querySelector('.snb_banner_btn .snb_banner_play')

	snbBanner.bxSlider({
		auto: snbSlide.length <= 3 ? true : false, 
		speed: 500,
		pager : false,
		controls : false,
		slideWidth : 123,
		slideMargin : 10,
		autoHover : true,
	})
	snbBtnPrev.click(function(){
		snbBanner.goToPrevSlide();
		return false;

	});
	snbBtnNext.on('click', function(){
		snbBanner.goToNextSlide();
		return false;
	});
	snbBtnStop.click(function(){
		snbBanner.stopAuto();
		return false;

	});
	snbBtnPlay.on('click', function(){
		snbBanner.startAuto();
		return false;
	});
}
snbSlide()

$(document).ready(function(){
	var _focus;

	/* gnb 시작 */
	/* category */
	function category(){
		var category = $('.category .select')
		var categoryList = $('.category .category_list')
		var lastCategory = $('.category .category_list li:last a')

		// 마우스 액션
		category.mouseenter(function(){
			$(this).addClass('on')
			categoryList.addClass('on')
		})
		category.mouseleave(function(){
			$(this).removeClass('on')
			categoryList.removeClass('on')
		})
		categoryList.mouseenter(function(){
			category.addClass('on')
			$(this).addClass('on')
		})
		categoryList.mouseleave(function(){
			category.removeClass('on')
			$(this).removeClass('on')
		})

		// focus, blur
		category.focus(function(){
			$(this).addClass('on')
			categoryList.addClass('on')
		})
		lastCategory.blur(function(){
			category.removeClass('on')
			categoryList.removeClass('on')
		})
	}
	category()

	/* interest_box */
	/* 관심사 설정 */
	function interMove(){
		// 페이지 크기 조절시
		$(window).resize(function(){
			if($('.inter-wrap').width() < 894 || $('.interest').width() > 894){
				$('.inter_btn').css({
					'display' : 'block'
				})
			}else{
				$('.inter_btn').css({
					'display' : 'none'
				})
			}
		})
		// 페이지 로딩시
		if($('.inter-wrap').width() < 894 || $('.interest').width() > 894){
			$('.inter_btn').css({
				'display' : 'block'
			})
		}else{
			$('.inter_btn').css({
				'display' : 'none'
			})
		}
	}
	interMove()

	/* 관심사 추가 */
	$('.interest_box .inter_plus a').click(function(){
		$('.popup_wrap').addClass('on')
		$('.popup_wrap').attr('tabindex', 0).focus()
		_focus = $(this)
	})

	/* 관심사 팝업 */
	$('.popup_dim').click(function(){
		$('.popup_wrap').removeClass('on')
		_focus.focus()
	})
	$('.inter_menu dd a').click(function(){
		$(this).parent().toggleClass('on')
		return false
	})
	$('.inter_close_btn').click(function(){
		$('.popup_wrap').removeClass('on')
		_focus.focus()
	})
	$('.inter_close_btn').blur(function(){
		$('.popup_wrap').focus()
	})

	/* 관심사 버튼 */
	var internum = 0;
	var slideWidth = $('.interest').width()

	function interBtn(){
		$('.interest_box').animate({
			left: -(slideWidth/3)*internum
		})
	}

	$('.inter_btn .inter_left_btn').click(function(){
		if($('.interest_box').is(':animated') === false){
			internum--
			if(internum < 0){
				internum=0;
			}
			interBtn(internum)
		}
	})
	$('.inter_btn .inter_right_btn').click(function(){
		if($('.interest_box').is(':animated') === false){
			internum++
			if(internum > 3){
				internum=0;
			}
			interBtn(internum)
		}
	})

	/* top_menu_list */
	// 로그인
	function loginList(){
		var login = $('.top_menu_list .login')
		var userInfo = $('.top_menu_list .user_info')
		var lastUserInfo = $('.user_info .user_info_list li:last a')

		login.mouseenter(function(){
			login.addClass('on')
			userInfo.addClass('on')
		})
		userInfo.mouseleave(function(){
			login.removeClass('on')
			$(this).removeClass('on')
		})
	
		// 영역 밖으로 나갔을 때 삭제
		$('.top_menu_box').mouseleave(function(){
			loginRemove()
		})
	
		// 로그인 버튼 제외 하고 메뉴 삭제
		$('.top_menu_list > li > a').mouseenter(function(){
			if($(this).hasClass('login') === false){
				loginRemove()
			}
		})
	
		// focus, blur
		login.focus(function(){
			$(this).addClass('on')
			userInfo.addClass('on')
		})
		lastUserInfo.blur(function(){
			loginRemove()
		})

		function loginRemove(){
			login.removeClass('on')
			userInfo.removeClass('on')
		} 
	}
	loginList()

	// 알림창
	function notiList(){
		var notice = $('.top_menu_list .notice')
		var userNoti = $('.top_menu_list .user_notice')
		var lastUserNoti = $('.all_notice_btn')

		notice.click(function(){
			$(this).next().toggleClass('on')
		})
		userNoti.mouseleave(function(){
			$(this).removeClass('on')
		})
	
		// 영역 밖으로 나갔을 때 삭제
		$('.top_menu_box').mouseleave(function(){
			userNoti.removeClass('on')
		})
	
		// 알림 버튼 제외 하고 메뉴 삭제
		$('.top_menu_list > li > a').mouseenter(function(){
			if($(this).hasClass('notice') === false){
				userNoti.removeClass('on')
			}
		})
	
		// blur
		lastUserNoti.blur(function(){
			userNoti.removeClass('on')
		}) 
	}
	notiList()

	/* snb 시작 */
	/* snb_banner */
	function snbSlide(){
		var snbBanner = $('.snb_banner .snb_banner_slide').bxSlider({
			auto: $('.snb_banner .snb_banner_slide li').length<=3 ? true : false, 
			speed: 500,
			pager : false,
			controls : false,
			slideWidth : 123,
			slideMargin : 10,
			autoHover : true,
	
			onSliderLoad : function(){
				if($('.snb_banner .snb_banner_slide li').length<=3){
					$('.snb_banner_btn').hide()
				}
			},
		})
		$('.snb_banner_btn .snb_banner_prev').click(function(){
			snbBanner.goToPrevSlide();
			return false;
	
		});
		$('.snb_banner_btn .snb_banner_next').on('click', function(){
			snbBanner.goToNextSlide();
			return false;
		});
		$('.snb_banner_btn .snb_banner_stop').click(function(){
			snbBanner.stopAuto();
			return false;
	
		});
		$('.snb_banner_btn .snb_banner_play').on('click', function(){
			snbBanner.startAuto();
			return false;
		});
	}
	snbSlide()

	/* content 시작 */
	/* dangi_gnb */
	var dangi = new dangiGnb
	var depth1 = $('.dangi_gnb > li .depth1')
	var lastDepth = $('.dangi_gnb > li:last .dangi_sub_gnb > li:last a')
	var subGnb = $('.dangi_gnb > li .dangi_sub_gnb')
	
	function dangiGnb(){}
	dangiGnb.prototype.depth1 = function(){
		depth1.each(function(){
			// 마우스 호버 시 서브 메뉴 노출
			$(this).mouseenter(function(){
				$('.dangi_gnb > li').removeClass('on')
				subGnb.removeClass('on')
				$(this).parents().addClass('on')
				$(this).next().addClass('on')
			})
	
			// tab 이동시 서브 메뉴 노출
			$(this).focus(function(){
				$('.dangi_gnb > li').removeClass('on')
				subGnb.removeClass('on')
				$(this).parents().addClass('on')
				$(this).next().addClass('on')
			})

			// tab으로 이동 했을 때 마지막 (메뉴 벗어났을 때)
			lastDepth.blur(function(){
				$('.dangi_gnb > li').removeClass('on')
				subGnb.removeClass('on')
			})
		})
		
		// 마우스 아웃 시 서브 메뉴 숨기기
		subGnb.each(function(){
			$(this).mouseleave(function(){
				$(this).parents().removeClass('on')
				$(this).removeClass('on')
			})
		})

		// 타이틀 영역 밖으로 마우스 아웃 시 서브 메뉴 숨기기
		$('.title_wrap').mouseleave(function(){
			depth1.parents().removeClass('on')
			subGnb.removeClass('on')
		})
	}
	
	dangi.depth1();
})