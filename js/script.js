'use strict';

//==========для работы, удалить потом

const titles = document.querySelectorAll('.title');
for (let title of titles) {
	title.addEventListener('click', function() {
		alert(`ширина: ${document.documentElement.clientWidth} 
высота: ${document.documentElement.clientHeight}`);
	});
}

//========== form & modals

const overlay = document.querySelector('.overlay');
const modal = overlay.querySelector('.modal');
const text = modal.querySelector('p');
const close = modal.querySelector('.modal__close');

// const order = overlay.querySelector('#order');
// const comment = overlay.querySelector('#comment');
// const fail = overlay.querySelector('#fail');
// const closes = overlay.querySelectorAll('.modal__close');

// overlay.addEventListener('click', function() {
// 	this.classList.remove('active');
// 	let children = this.children;
// 	for (let child of children) {
// 		child.classList.remove('active');
// 	}
// });
// for (let close of closes) {
// 	close.addEventListener('click', function() {
// 		overlay.classList.remove('active');
// 		this.parentElement.classList.remove('active');
// 	});
// }

// overlay.addEventListener('click', closeModal);
// overlay.addEventListener('click', function(e) {
// 	if (e.target === overlay) {
// 		// closeModal();
// 		this.classList.remove('active');
// 		modal.classList.remove('active');
// 	}
// });

// close.addEventListener('click', function() {
// 	this.parentElement.classList.remove('active');
// 	overlay.classList.remove('active');
// });

close.addEventListener('click', closeModal);
overlay.addEventListener('click', function(e) {
	if (e.target === overlay) {
		closeModal();
	}
});

function closeModal() {
	overlay.classList.remove('active');
	document.body.style.overflow = '';
	// modal.classList.remove('active');
}

// for (let close of closes) {
// 	close.addEventListener('click', closeModal);
// }

// function closeModal() {
// 	let modals = overlay.querySelectorAll('.modal');
// 	overlay.classList.remove('active');
	
// 	for (let modal of modals) {
// 		modal.classList.remove('active');
// 		// modal.classList.add('modal_animated');
// 	}
// }



const form = document.querySelector('#form');
form.addEventListener('submit', formSend);

async function formSend(e) {
	e.preventDefault();
	let error = formValidate(form);
	let formData = new FormData(form);

	if (error === 0) {
		form.classList.add('_sending');
		
		let response = await fetch('mailer/sendmail.php', {
			method: 'POST',
			body: formData
		});
		if (response.ok) {
			let result = await response.json();
			// alert(result.message);
			text.innerHTML = result.message;
			overlay.classList.add('active');
			document.body.style.overflow = 'hidden';
			// modal.classList.add('active');
			// order.classList.add('active');
			form.reset();
			form.classList.remove('_sending');
		} else {
			text.innerHTML = 'Ошибка';
			overlay.classList.add('active');
			document.body.style.overflow = 'hidden';
			// modal.classList.add('active');
			// fail.classList.add('active');
			// alert('Ошибка');
			form.classList.remove('_sending');
		}

	} else {
		// alert('Заполните все поля, помеченые звёздочкой');
		text.innerHTML = 'Заполните все поля, помеченные звёздочкой';
		overlay.classList.add('active');
		document.body.style.overflow = 'hidden';
		// modal.classList.add('active');
		// comment.classList.add('active');
	}
}

function formValidate(form) {
	let error = 0;
	let formReq = form.querySelectorAll('._req');

	for (let input of formReq) {
		// formRemoveError(input);

		if (input.value === '') {
			// formAddError(input);
			error++;
		}

		// if (input.classList.contains('_email')) {
		// 	if (emailTest(input)) {
		// 		formAddError(input);
		// 		error++;
		// 	} 
		// } else {
		// 	if (input.value === '') {
		// 		formAddError(input);
		// 		error++;
		// 	}
		// }
	}
	return error;
}

// function formAddError(input) {
// 	// input.parentElement.classList.add('_error');
// 	input.classList.add('_error');
// }

// function formRemoveError(input) {
// 	// input.parentElement.classList.remove('_error');
// 	input.classList.remove('_error');
// }

// function emailTest(input) {
// 	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
// }

//========== tabs

const tabs = document.querySelectorAll('.tab');

for (let tab of tabs) {
	tab.addEventListener('click', function() {
		const symb = tab.querySelector('.tab__symb');
		const panel = this.nextElementSibling;

		this.classList.toggle('tab_active');
		if (panel.style.maxHeight) {
			panel.style.maxHeight = null;
			// panel.style.margin = '1 auto';
			symb.innerHTML = '\u002B';
		} else {
			panel.style.maxHeight = panel.scrollHeight + 'px';
			// panel.style.margin = '3rem auto';
			symb.innerHTML = '\u2212';
		}
	});
}

// ========== reviews

function isVisible(elem) {
	const coords = elem.getBoundingClientRect();
	const windowHeight = document.documentElement.clientHeight;
	const topVisible = coords.top > 100 && coords.top < windowHeight - 100;
	const bottomVisible = coords.bottom < windowHeight - 100 && coords.bottom > 100;

	return topVisible || bottomVisible;
}


function showVisible() {
	const blocks = document.querySelectorAll('.block');

	for (let block of blocks) {
		const spans = block.querySelectorAll('span');

		if (isVisible(block)) {
			for (let i = 0; i < spans.length; i++) {
				spans[i].classList.add('block_animated');
				spans[i].style.animationDelay = i/20 + 's';
			}
		}
	}
}


// function showVisible() {
// 	const blocks = document.querySelectorAll('.block');

// 	for (let block of blocks) {
// 		// const spans = block.querySelectorAll('span');

// 		// const str = block.innerText;
// 		// const str = block.textContent;
// 		// const spans = str.split(' ');

// 		// if (isVisible(block)) {
// 		// 	// block.classList.add('block_animated');
// 		// 	const str = block.innerText;
// 		// 	console.log(str);
// 		// 	console.log(str.length);
// 		// 	// let result;
// 		// 	for (let i = 0; i < str.length; i++) {
// 		// 		// str[i].classList.add('block_animated');
// 		// 		console.log(str[i]);
// 		// 		// result = str[i];
// 		// 		// str[i].style.animation = 'moveLeft';
// 		// 		// str[i].style.fontSize = '50px';
// 		// 		// str[i].style.animationDelay = i/20 + 's';
// 		// 	}
// 		// 	// console.log(result);
// 		// }


// 		// if (isVisible(block)) {
// 		// 	let str = block.innerText;
// 		// 	let arr = str.split(' ');
// 		// 	let result;

// 		// 	for (let i = 0; i < arr.length; i++) {
// 		// 		let elem = arr[i];
// 		// 		console.log(arr[i]);
// 		// 		// elem.classList.add('block_animated');
// 		// 		// arr[i].style.animationDelay = i/20 + 's';
// 		// 		// result = arr.join(' ');
// 		// 	}
// 		// 	// console.log(result);
// 		// }
// 	}
// }



// function isVisible(elem) {
// 	const coords = elem.getBoundingClientRect();
// 	const windowHeight = document.documentElement.clientHeight;
// 	const topVisible = coords.top > 0 && coords.top < windowHeight;
// 	const bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

// 	return topVisible || bottomVisible;
// }

// function showVisible() {
// 	const rows = document.querySelectorAll('.reviews__row');

// 	for (let row of rows) {
// 		if (isVisible(row)) {
// 			const cards = row.querySelectorAll('.reviews__card');

// 			for (let i = 0; i < cards.length; i++) {
// 				cards[0].classList.add('first');
// 				cards[1].classList.add('second');
// 				cards[2].classList.add('third');
// 			}
// 		}
// 	}
// }



// function showVisible() {
// 	const cards = document.querySelectorAll('.reviews__card');
// 	const block = document.querySelector('.reviews__cards');
// 	console.log(block);

// 	for (let i = 0; i < cards.length; i++) {
// 		if (isVisible(block)) {
// 			console.log('hello');
// 			cards[0].classList.add('first');
// 			cards[1].classList.add('second');
// 			cards[2].classList.add('third');
// 		}
// 	}
// }

showVisible();
window.onscroll = showVisible;


// window.addEventListener('scroll', function() {
// 	const cards = document.querySelectorAll('.reviews__card');
// 	console.log(pageYOffset);

// 	for (let i = 0; i < cards.length; i++) {
// 		if (pageYOffset >= 400 && pageYOffset <= 700) {
// 			console.log('hello');
// 			cards[0].classList.add('first');
// 			cards[1].classList.add('second');
// 			cards[2].classList.add('third');
// 		}
// 		else if (pageYOffset >= 700 && pageYOffset <= 1000) {
// 			cards[3].classList.add('first');
// 			cards[4].classList.add('second');
// 			cards[5].classList.add('third');
// 		}
// 		else if (pageYOffset >= 1000) {
// 			cards[6].classList.add('first');
// 			cards[7].classList.add('second');
// 			cards[8].classList.add('third');
// 		}
// 	}

// });

//========== pageup

window.addEventListener('scroll', function() {
	const arrow = document.querySelector('.pageup');

	if (pageYOffset >= 500) {
		// arrow.style.display = 'block';
		arrow.classList.add('active');
	} else {
		// arrow.style.display = 'none';
		arrow.classList.remove('active');
	}
});




//========== burger, menu

// const arrow = document.querySelector('.arrow-menu');
// const menu = document.querySelector('.menu');
// const links = menu.querySelectorAll('.menu__item');

// arrow.addEventListener('click', function() {
// 	this.classList.toggle('arrow-menu_active');
// 	menu.classList.toggle('menu_active');
// });

// for(let link of links) {
// 	link.addEventListener('click', function() {
// 		menu.classList.remove('menu_active');
// 		arrow.classList.remove('arrow-menu_active');
// 	});
// }

const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
const links = menu.querySelectorAll('.menu__item');

// const windowWidth = document.documentElement.ClientWidth;

// windowWidth.addEventListener('click', function(e) {
// 	if (e.target !== menu) {
// 		burger.classList.remove('burger_active');
// 		menu.classList.remove('menu_active');
// 	}
// });

// document.onclick = function(e) {
// 	if (menu.classList.contains('menu_active') && e.target !== menu) {
// 		menu.classList.remove('menu_active');
// 		burger.classList.remove('burger_active');
// 	}
// }



burger.addEventListener('click', function(e) {
	e.stopPropagation();
	burger.classList.toggle('burger_active');
	menu.classList.toggle('menu_active');
});

for (let link of links) {
	link.addEventListener('click', function() {
		burger.classList.remove('burger_active');
		menu.classList.remove('menu_active');
	});
}

// document.addEventListener('click', function(e) {
// 	if (menu.classList.contains('menu_active') && burger.classList.contains('burger_active')) {
// 		if (e.target != menu && e.target != burger) {
// 			menu.classList.remove('menu_active');
// 			burger.classList.remove('burger_active');
// 		}
// 	}
// });

document.addEventListener('click', function(e) {
	if (menu.classList.contains('menu_active') && e.target !== menu) {
		menu.classList.remove('menu_active');
		burger.classList.remove('burger_active');
	}
});

// document.body.style.overflow = 'hidden';

// menu.addEventListener('click', function(e) {
// 	if (e.target !== menu) {
// 		burger.classList.remove('burger_active');
// 		menu.classList.remove('menu_active');
// 	}
// });


//========== slider

new Swiper('.swiper', {
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
		dynamicBullets: true,
	},
	//перелистывание колёсиком мышки
	mousewheel: {
		invert: true,
		sensitivity: 1,
		// eventsTarget: 'img',
	},

	//перелистывание стрелками клавиатуры
	keyboard: {
		enabled: true,
		onlyInViewport: true,
		pageUpDown: true,
	},

	//отключаем перелистывание свайпом на ПК
	// simulateTouch: false,

	//курсор становится ладошкой
	// grabCursor: true,

	//переключение при клике на слайд (работает при показе нескольких слайдов и активном свайпе на ПК)
	// slideToClickedSlide: true, 

	//автовысота
	// autoHeight: true,

	//количество слайдов для показа (при значении 'auto' поставить в стилях для родителя img 'width: auto' тоже)
	slidesPerView: 3,
	// slidesPerView: 'auto',

	//отступ между слайдами (при показе нескольких слайдов)
	// spaceBetween: 10,

	//количество пролистываемых слайдов
	// slidesPerGroup: 3,

	//активный слайд по центру
	// centeredSlides: true,

	//стартовый слайд
	// initialSlide: 0,

	//бесконечный слайдер
	loop: true,

	//количество дублирующих слайдов, если установлено slidesPerView: 'auto'
	// loopedSlides: 3,

	//эффекты переключения слайдов
	//по умолчанию 'slide'

	// effect: 'slide',

	// effect: 'fade',
	// fadeEffect: {
	// 	crossFade: true,
	// },

	// effect: 'flip',
	// flipEffect: {
	// 	slideShadows: false,
	// },

	// effect: 'cube',
	// cubeEffect: {
	// 	slideShadows: false,
	// },
	// effect: 'cards',
	// cardsEffect: {
	// 	slide: true,
	// 	slideShadows: false,
	// },

	effect: 'coverflow',
	coverflowEffect: {
		//угол
		rotate: 30,
		//наложение
		stretch: 50,
		//тень
		slideShadows: true,
		// modifier: 2,
		depth: 100,
	},

	//ленивая загрузка
	//отключить предзагрузку картинок
	preloadImages: false,
	//подгрузка картинок
	lazy: {
		checkInView: true,
		//подгружать на старте переключения слайда
		loadOnTransitionStart: true,
		//подгружать предыдущую и следующую картинки
		// loadPrevNext: false,
		loadPrevNext: true,
	},
	//слежка за видимыми слайдами
	watchSlidesProgress: true,
	//добавление класса видимым слайдам
	watchSlidesVisibility: true,

	//зум картинки
	zoom: {
		//максимальное увеличение
		maxRatio: 2,
		//минимальное увеличение
		minRatio: 1,
	},

	//адаптив (работает по принципу mobile-first)
	//по умолчанию breakpointsBase: 'window'
	// breakpointsBase: 'container',
	// breakpoints: {
	// 	320: {
	// 		// effect: 'slide',
	// 		slidesPerView: 1,
	// 		coverflowEffect: {
	// 			stretch: 300,
	// 		},
	// 	},
	// 	768: {
	// 		slidesPerView: 3,
	// 		zoom: {
	// 			maxRatio: 3,
	// 		},
	// 		coverflowEffect: {
	// 			stretch: 50,
	// 		},
	// 		// spaceBetween: 55,
	// 		// coverflowEffect: {
	// 		// 	// rotate: 30,
	// 		// 	// stretch: 120,
	// 		// 	// slideShadow: true,
	// 		// },
	// 	},
	// 	1024: {
	// 		// slidesPerView: 3,
	// 		zoom: {
	// 			maxRatio: 2,
	// 		},
	// 	}
	// },
});




// new Swiper('.swiper', {
// 	navigation: {
// 		nextEl: '.swiper-button-next',
// 		prevEl: '.swiper-button-prev'
// 	},
// 	pagination: {
// 		el: '.swiper-pagination',
// 		clickable: true,
// 		dynamicBullets: true,
// 		// hideOnClick: true
// 	},
// 	//отключать при бесконечной прокрутке
// 	// scrollbar: {
// 	// 	el: '.swiper-scrollbar',
// 	// 	draggable: true,
// 	// 	// hide: true
// 	// },

// 	//перелистывание колёсиком мышки
// 	mousewheel: {
// 		invert: true,
// 		sensitivity: 1,
// 		// eventsTarget: 'img',
// 	},

// 	//перелистывание стрелками клавиатуры
// 	keyboard: {
// 		enabled: true,
// 		onlyInViewport: true,
// 		pageUpDown: true,
// 	},

// 	//отключаем перелистывание свайпом на ПК
// 	// simulateTouch: false,

// 	//курсор становится ладошкой
// 	// grabCursor: true,

// 	//переключение при клике на слайд (работает при показе нескольких слайдов и активном свайпе на ПК)
// 	// slideToClickedSlide: true, 

// 	//автовысота
// 	autoHeight: true,

// 	//количество слайдов для показа (при значении 'auto' поставить в стилях для родителя img 'width: auto' тоже)
// 	slidesPerView: 3,
// 	// slidesPerView: 'auto',

// 	//отступ между слайдами (при показе нескольких слайдов)
// 	// spaceBetween: 10,

// 	//количество пролистываемых слайдов
// 	// slidesPerGroup: 3,

// 	//активный слайд по центру
// 	// centeredSlides: true,

// 	//стартовый слайд
// 	// initialSlide: 0,

// 	//бесконечный слайдер
// 	loop: true,

// 	//количество дублирующих слайдов, если установлено slidesPerView: 'auto'
// 	// loopedSlides: 3,

// 	//эффекты переключения слайдов
// 	//по умолчанию 'slide'

// 	// effect: 'slide',

// 	// effect: 'fade',
// 	// fadeEffect: {
// 	// 	crossFade: true
// 	// },

// 	effect: 'coverflow',
// 	coverflowEffect: {
// 		//угол
// 		rotate: 30,
// 		//наложение
// 		stretch: 50,
// 		//тень
// 		slideShadows: true,
// 		// modifier: 2,
// 		depth: 100,
// 	},

// 	//ленивая загрузка
// 	//отключить предзагрузку картинок
// 	preloadImages: false,
// 	//подгрузка картинок
// 	lazy: {
// 		//подгружать на старте переключения слайда
// 		loadOnTransitionStart: true,
// 		//подгружать предыдущую и следующую картинки
// 		// loadPrevNext: false,
// 		loadPrevNext: true,
// 	},
// 	//слежка за видимыми слайдами
// 	watchSlidesProgress: true,
// 	//добавление класса видимым слайдам
// 	watchSlidesVisibility: true,

// 	//зум картинки
// 	zoom: {
// 		//максимальное увеличение
// 		maxRatio: 2,
// 		//минимальное увеличение
// 		minRatio: 1,
// 	},

// 	//адаптив (работает по принципу mobile-first)
// 	//по умолчанию breakpointsBase: 'window'
// 	// breakpointsBase: 'container',
// 	breakpoints: {
// 		320: {
// 			// effect: 'slide',
// 			slidesPerView: 1,
// 			coverflowEffect: {
// 				stretch: 300,
// 			},
// 		},
// 		768: {
// 			slidesPerView: 3,
// 			zoom: {
// 				maxRatio: 3,
// 			},
// 			coverflowEffect: {
// 				stretch: 50,
// 			},
// 			// spaceBetween: 55,
// 			// coverflowEffect: {
// 			// 	// rotate: 30,
// 			// 	// stretch: 120,
// 			// 	// slideShadow: true,
// 			// },
// 		},
// 		1024: {
// 			slidesPerView: 3,
// 			zoom: {
// 				maxRatio: 2,
// 			},
// 		}
// 	},
// });




// const prev = document.querySelector('.prev');
// const next = document.querySelector('.next');

// let i = 0;

// function slidePrev(arr) {
// 	const photo = event.target.nextElementSibling.querySelector('.portfolio__photo');
// 	photo.style.display = 'none';
// 	setTimeout(() => {
// 		photo.style.display = 'block';
// 	}, 0);

// 	i--;
// 	if (i < 0) {
// 		i = arr.length - 1;
// 	}
// 	photo.src = arr[i];
// }

// function slideNext(arr) {
// 	const photo = event.target.previousElementSibling.querySelector('.portfolio__photo');
// 	photo.style.display = 'none';
// 	setTimeout(() => {
// 		photo.style.display = 'block';
// 	}, 0);

// 	i++;
// 	if (i >= arr.length) {
// 		i = 0;
// 	}
// 	photo.src = arr[i];
// }


// const childArr = [
// 	'../img/children/1.jpg',
// 	'../img/children/2.jpg',
// 	'../img/children/3.jpg',
// 	'../img/children/4.jpg',
// 	'../img/children/5.jpg',
// 	'../img/children/6.jpg',
// 	'../img/children/7.jpg',
// 	'../img/children/8.jpg',
// 	'../img/children/9.jpg',
// 	'../img/children/10.jpg',
// ];

// const weddArr = [
// 	'../img/wedding/1.jpg',
// 	'../img/wedding/2.jpg',
// 	'../img/wedding/3.jpg',
// 	'../img/wedding/4.jpg',
// 	'../img/wedding/5.jpg',
// 	'../img/wedding/6.jpg',
// 	'../img/wedding/7.jpg',
// 	'../img/wedding/8.jpg',
// 	'../img/wedding/9.jpg',
// 	'../img/wedding/10.jpg',
// ];