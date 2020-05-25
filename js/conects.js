window.onload = function(){

	/* gnb 공통 */
	var category = new gnbAction
	var login = new gnbAction
	var gnb = new gnbAction
	var loginClick = new clickAction
	var categoryPopup = new popupAction

	function gnbAction(){}
	gnbAction.prototype.menuAction = function(wrap, depth, list, next){
		var gnbWrap = document.querySelector(wrap)
		var depth1 = document.querySelector(wrap + ' ' + depth)
		var gnbList = document.querySelector(wrap + ' ' + list)
		var lastLink = gnbList.querySelectorAll('li a')
		var nextLink = document.querySelectorAll(next)[0]

		// classList를 쓸수 있지만 ie에서 동작하지 않음.. -> polyfill로 해결
		function add(){
			depth1.classList.add('on')
			gnbList.classList.add('on')
		}
		function remove(){
			depth1.classList.remove('on')
			gnbList.classList.remove('on')
		}
		// 마우스 액션 부분
		gnbWrap.addEventListener('mouseleave', remove)
		depth1.addEventListener('mouseenter', add)

		// 키보드 액션 부분
		// lastLink는 gnbList의 li a의 모든 자식을 담고 있음
		// gnbList.children = li 의 길이만큼에서 -1 해줘야함 length는 1부터 시작하니까
		depth1.addEventListener('focus', add)
		lastLink[lastLink.length-1].addEventListener('keydown', function(){
			if(event.keyCode === 9 && event.shiftKey){
				return
			}else if(event.keyCode === 9){
				remove()
			}
		})														
		depth1.addEventListener('keydown', function(){
			if(event.keyCode === 9 && event.shiftKey){
				remove()
			}
		})
		nextLink.addEventListener('keydown', function(){
			if(event.keyCode === 9 && event.shiftKey){
				add()
			}
		})
	}
	category.menuAction('.category', '.select', '.category_list', '.interest li a')
	login.menuAction('.top_menu_list li', '.login', '.user_info', '.top_menu_list li .notice')
	
	// node말고 Element를 사용하면 개행문자가 잡히지 않음(#text)
	gnbAction.prototype.gnbAction = function(gnbList, depth1, subMenu){
		var gnbWrap = document.querySelectorAll(gnbList)
		var depth1 = document.querySelectorAll(gnbList + ' ' + depth1)
		var subMenu = document.querySelectorAll(subMenu)
		var txt_cont = document.getElementById('txt_cont')
		
		function add(_this){
			_this.parentElement.classList.add('on')
			_this.nextElementSibling.classList.add('on')
		}
		function remove(_this){
			_this.classList.remove('on')
			_this.querySelector('.dangi_sub_gnb').classList.remove('on')
		}
		
		for(var i = 0; i < gnbWrap.length; i++){
			var subMenuLast = subMenu[i].querySelectorAll('li a')			
			
			depth1[i].addEventListener('mouseenter', function(){
				add(this)
			})
			gnbWrap[i].addEventListener('mouseleave', function(){
				remove(this)
			})

			depth1[i].addEventListener('focus', function(){
				add(this)
			})
			subMenuLast[subMenuLast.length-1].addEventListener('keydown', function(){
				if(event.keyCode === 9 && event.shiftKey){
					return
				}else if(event.keyCode === 9){
					if(this.parentElement.parentElement.classList.contains('dangi_sub_gnb') === true){ 
						this.parentElement.parentElement.classList.remove('on')
						this.parentElement.parentElement.parentElement.classList.remove('on')
					}else{
						this.parentElement.parentElement.parentElement.parentElement.classList.remove('on')
						this.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove('on')
					}
				}
			})
			depth1[i].addEventListener('keydown', function(){
				if(event.keyCode === 9 && event.shiftKey){
					if(gnbWrap[0]){
						this.parentElement.classList.remove('on')
						this.nextElementSibling.classList.remove('on')
						return false
					}
					this.parentElement.classList.remove('on')
					this.nextElementSibling.classList.remove('on')
					this.parentElement.previousElementSibling.classList.add('on')
					this.parentElement.previousElementSibling.children[1].classList.add('on')
				}
			})
		}
		txt_cont.addEventListener('keydown', function(){
			if(event.keyCode === 9 && event.shiftKey){
				gnbWrap[gnbWrap.length-1].classList.add('on')
				gnbWrap[gnbWrap.length-1].children[1].classList.add('on')
			}
		})
	}
	gnb.gnbAction('.dangi_gnb > li', '.depth1', '.dangi_sub_gnb')

	/* 클릭 스크립트 공통 */
	function clickAction(){}
	clickAction.prototype.loginClick = function(){
		var loginBtn = document.querySelector('.notice')
		var loginNotice = document.querySelector('.user_notice')
		var lastBtn = document.querySelector('.all_notice_btn')

		loginBtn.addEventListener('click', function(){
			loginNotice.classList.toggle('on')
		})
		lastBtn.addEventListener('keydown', function(){
			if(event.keyCode === 9){
				loginNotice.classList.remove('on')
			}
		})
	}
	loginClick.loginClick()

	/* 팝업 스크립트 */
	function popupAction(){}
	popupAction.prototype.categoryPopup = function(){
		var popupBtn = document.querySelector('.inter_plus').firstElementChild
		var popup = document.querySelector('.popup_wrap')
		var popupDim = document.querySelector('.popup_dim')
		var interMenu = document.querySelectorAll('.inter_menu dd')
		var interClose = document.querySelector('.inter_close_btn')

		popupBtn.addEventListener('click', function(){
			document.querySelector('html').style.overflow = 'hidden'
			popup.classList.add('on')
			popup.focus()
		})
		for(var i = 0; i < interMenu.length; i++){
			interMenu[i].addEventListener('click', function(){
				this.classList.toggle('on')
			})
		}
		interClose.addEventListener('click', function(){
			document.querySelector('html').style.overflow = 'auto'
			popup.classList.remove('on')
			popupBtn.focus()
		})
		interClose.addEventListener('keydown', function(e){
			if(event.keyCode == 9 && event.shiftKey){
				return false;
			}else if(event.keyCode == 9){
				popup.focus()
			}
		})
		interMenu[0].addEventListener('keydown', function(e){
			if(event.keyCode === 9 && event.shiftKey){
				e.preventDefault()
				interClose.focus()
			}
		})
		popupDim.addEventListener('click', function(){
			document.querySelector('html').style.overflow = 'auto'
			popup.classList.remove('on')
		})
	}
	categoryPopup.categoryPopup()
}

$(document).ready(function(){
	/* snb 시작 */
	/* snb_banner */
	var snbSlide_01 = new slideAction

	function slideAction(){}
	slideAction.prototype.action = function(wrap, wrapSlide, wrapBtn){
		var banner = $(wrap + ' ' + wrapSlide)
		var bannerSlide = $(wrap +' '+ wrapSlide + ' li')
		var btnPrev = $(wrapBtn + ' .banner_prev')
		var btnNext = $(wrapBtn + ' .banner_next')
		var btnStop = $(wrapBtn + ' .banner_stop')
		var btnPlay = $(wrapBtn + ' .banner_play')

		banner.bxSlider({
			auto: bannerSlide.length <= 3 ? true : false, 
			speed: 500,
			pager : false,
			controls : false,
			slideWidth : 123,
			slideMargin : 10,
			autoHover : true,
		});
		btnPrev.click(function(){
			banner.goToPrevSlide();
			return false;
		});
		btnNext.on('click', function(){
			banner.goToNextSlide();
			return false;
		});
		btnStop.click(function(){
			banner.stopAuto();
			return false;
		});
		btnPlay.on('click', function(){
			banner.startAuto();
			return false;
		});
	}
	snbSlide_01.action('.snb_banner', '.snb_banner_slide', '.banner_btn')
})