var IMAGE_DIR = 'img/';
let ANIMATION_DELAY = 1000;
let IMAGE_CHANGE_DELAY = 400;
let LOADING_DELAY = 700;

/**
 * Preload images into an array
 *
 * @argument 2D array of image paths
 */
var preloadedImages = [];
function preloadImages(images) {
	images.forEach(function(item) {
		// preloadedImages.push((new Image().src = /*IMAGE_DIR + */ item[0]));
		// preloadedImages.push((new Image().src = /*IMAGE_DIR + */ item[1]));
		let img1 = new Image();
		img1.src = item[0];
		let img2 = new Image();
		img2.src = item[1];
		preloadedImages.push([img1, img2]);
	});
}

(() => {
	let cursel = document.getElementById('cursel');
	let linkHover = document.querySelector('.link-hover');
	let centerTitleH2 = linkHover.querySelectorAll('.center-title h2');
	let centerImage = linkHover.querySelector('.cursel-center-img');
	let before = centerImage.querySelector('.cursel-center-img-before');
	let beforeImage = before.querySelector('img');
	let after = centerImage.querySelector('.cursel-center-img-after');
	var afterImage = after.querySelector('img');
	let curselUpH2 = cursel.querySelector('.cursel-up h2');
	let curselDownH2 = cursel.querySelector('.cursel-down h2');
	let count = document.getElementById('count');
	let countNum = document.getElementById('count-num');
	let maxCount = document.getElementById('max-num');

	// Load animation
	setTimeout(() => {
		centerImage.classList.add('load');
	}, 2000);
	setTimeout(() => {
		count.classList.add('load');
	}, 2500);
	setTimeout(() => {
		[...centerTitleH2].forEach(item => {
			item.classList.add('load');
		});
	}, 2500);
	setTimeout(() => {
		curselUpH2.classList.add('load');
	}, 2700);
	setTimeout(() => {
		curselDownH2.classList.add('load');
	}, 3000);

	// DEBUG: kad se ide back sa strelicom !!!

	// Hover
	linkHover.addEventListener('mouseenter', () => {
		document.body.classList.add('on');
	});
	linkHover.addEventListener('mouseleave', () => {
		document.body.classList.remove('on');
	});

	let TITLES = [
		["IVAN'S<br>PORTFOLIO", 'detail/kazuki.html'],
		['TITLE 1<br>SUBTITLE 1', 'detail/tamaki.html'],
		['TITLE 2<br>SUBTITLE 2', 'detail/kose.html'],
		['TITLE 3<br>SUBTITLE 3', 'detail/kawasaki.html'],
		['TITLE 4<br>SUBTITLE 4', 'detail/misawa.html']

		// ['WAKKA<br>LANDING PAGE', 'detail/wakka.html'],
		// ['GUNGHO<br>FESTIVAL 2017', 'detail/gungho.html'],
		// ['DELICA D:5<br>SPECIAL SITE', 'detail/delica.html'],
		// ['KEY COFFEE<br>DRIP ON', 'detail/key.html'],
		// ['ZETTAI GEIGEKI<br>WARS', 'detail/zettai.html'],
		// ['COSMOS FAIR<br>2011', 'detail/cosmos.html'],
		// ['THE MEDIA<br>GARDEN', 'detail/media.html']
	];
	let IMAGES = [
		['https://picsum.photos/g/2000/1250?random&1', 'https://picsum.photos/2000/1250?random&1'],
		['https://picsum.photos/g/2000/1250?random&2', 'https://picsum.photos/2000/1250?random&2'],
		['https://picsum.photos/g/2000/1250?random&3', 'https://picsum.photos/2000/1250?random&3'],
		['https://picsum.photos/g/2000/1250?random&4', 'https://picsum.photos/2000/1250?random&4'],
		['https://picsum.photos/g/2000/1250?random&5', 'https://picsum.photos/2000/1250?random&5']
		// ['02_tamaki_duotone.jpg', '02_tamaki.jpg'],
		// ['03_kose_duotone.jpg', '03_kose.jpg'],
		// ['04_kawasaki_duotone.jpg', '04_kawasaki.jpg'],
		// ['05_misawa_duotone.jpg', '05_misawa.jpg']
	];

	// ç”»åƒã®ãƒ—ãƒªãƒ­ãƒ¼ãƒ‰
	// var preloadImage = function(path) {
	// 	var img = new Image();
	// 	img.src = /*IMAGE_DIR + */ path;
	// };

	// var preloadImages = function() {
	// 	IMAGES.forEach(function(item) {
	// 		preloadImage(item[0]);
	// 		preloadImage(item[1]);
	// 	});
	// };

	let itemCount = TITLES.length;
	let clientY = 0;
	let isAnimating = false;
	let currentIndex = 0;
	let direction;

	// Align to 2 digits
	function z2(num) {
		return ('0' + num).slice(-2);
	}
	// Update counter
	function updateCounter(num) {
		countNum.innerHTML = z2(currentIndex + 1);
	}

	// Get scrolling direction
	let setScrollEvents = function() {
		window.addEventListener('touchstart', function(ev) {
			clientY = ev.changedTouches[0].clientY;
		});
		window.addEventListener('wheel', function(ev) {
			let deltaY = ev.deltaY;
			direction = deltaY < 0 ? 'up' : 'down';
			tryMove(direction);
		});
		window.addEventListener('touchmove', function(ev) {
			let nextClientY = ev.changedTouches[0].clientY;
			direction = clientY < nextClientY ? 'up' : 'down';
			clientY = nextClientY;
			tryMove(direction);
		});
	};

	// Event handler => move with trotle
	let tryMove = function(direction /* up | down */) {
		// Exit if is alredy animating
		if (isAnimating || (direction !== 'up' && direction !== 'down')) return;

		// Prevent another animation to start (trotle)
		isAnimating = true;

		switch (direction) {
			case 'up':
				currentIndex -= 1;
				// If index is negative restart from last item
				if (currentIndex < 0) currentIndex = itemCount - 1;
				// console.log('up')
				break;
			case 'down':
				currentIndex += 1;
				// If index out of range restart from first item
				if (currentIndex >= itemCount) currentIndex = 0;
				// console.log('down')
				break;
			default:
				return;
		}

		// Move page
		move(direction);
		setTimeout(function() {
			// Wait for animation to finish
			isAnimating = false;
		}, ANIMATION_DELAY);
	};

	// Page move
	let move = function(direction) {
		// Start animation
		cursel.classList.add('stop', direction);
		// This is important for scroll animation !!!
		cursel.offsetTop;
		cursel.classList.remove('stop');
		cursel.classList.add('start');
		// Remove last center image
		centerImage.classList.remove('load');

		// Text change processing
		updateCounter();
		updateTitle();

		// Switch cursel centar image
		// setTimeout(function() {
		// 	beforeImage.setAttribute('src', /*IMAGE_DIR + */ IMAGES[currentIndex][0]);
		// 	afterImage.setAttribute('src', /*IMAGE_DIR + */ IMAGES[currentIndex][1]);
		// }, IMAGE_CHANGE_DELAY);
		setTimeout(function() {
			before.removeChild(before.firstChild);
			// console.log(preloadedImages);
			// console.log(preloadedImages[currentIndex]);
			// console.log(preloadedImages[currentIndex][0]);
			// console.log(preloadedImages[currentIndex][1]);

			before.appendChild(preloadedImages[currentIndex][0]);
			after.removeChild(after.firstChild);
			after.appendChild(preloadedImages[currentIndex][1]);
		}, IMAGE_CHANGE_DELAY);

		// End of animation
		setTimeout(function() {
			cursel.classList.remove('start', direction);
			centerImage.classList.add('load');
		}, LOADING_DELAY);
	};

	// Title and link updates
	let updateTitle = function() {
		let prevIndex = currentIndex - 1;
		let nextIndex = currentIndex + 1;

		if (prevIndex < 0) {
			prevIndex = itemCount - 1;
		}
		if (nextIndex >= itemCount) {
			nextIndex = 0;
		}

		// centerTitleH2.innerHTML = TITLES[currentIndex][0];
		[...centerTitleH2].forEach(item => {
			item.innerHTML = TITLES[currentIndex][0];
		});
		linkHover.setAttribute('href', TITLES[currentIndex][1]);
		curselUpH2.innerHTML = TITLES[prevIndex][0];
		curselDownH2.innerHTML = TITLES[nextIndex][0];
	};

	// Wait for intro to finish
	// setTimeout(setScrollEvents, 6000);
	preloadImages(IMAGES);

	updateTitle();
	updateCounter();
	// Set max count number
	maxCount.innerText = z2(itemCount);
	setScrollEvents();
})();
