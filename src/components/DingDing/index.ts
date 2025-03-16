export default `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
</head>
<style>
	body {
		margin: 0;
	}

	.container {
		height: 5000px;
	}

	.title {
		height: 100vh;
    font-size: 60px;
		text-align: center;
		line-height: 100vh;
	}

	.animation-box {
		height: calc(100vh * 5);
	}

	.animation-list {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 50px;
		background-color: #111;
		height: 100vh;
		position: sticky;
		top: 0;
	}

	.list-item {
		width: 100px;
		height: 100px;
		border-radius: 8px;
		margin: auto;
		transition: all .5s;
	}

	.animation-list .list-item:nth-child(1n + 1),
	.animation-list .list-item:nth-child(7n + 7) {
		background-color: cornflowerblue;
	}

	.animation-list .list-item:nth-child(2n + 2),
	.animation-list .list-item:nth-child(6n + 2) {
		background-color: crimson;
	}

	.animation-list .list-item:nth-child(3n + 3),
	.animation-list .list-item:nth-child(5n + 5) {
		background-color: chocolate;
	}
</style>
<body>
	<div class="title">
		<h1>钉钉动画开始</h1>
	</div>

	<div class="container">
		<div class="animation-box">
			<div class="animation-list">
				<div class="list-item" data-delay="0"></div>
				<div class="list-item" data-delay="1"></div>
				<div class="list-item" data-delay="2"></div>
				<div class="list-item" data-delay="3"></div>
				<div class="list-item" data-delay="2"></div>
				<div class="list-item" data-delay="1"></div>
				<div class="list-item" data-delay="0"></div>

				<div class="list-item" data-delay="0"></div>
				<div class="list-item" data-delay="1"></div>
				<div class="list-item" data-delay="2"></div>
				<div class="list-item" data-delay="3"></div>
				<div class="list-item" data-delay="2"></div>
				<div class="list-item" data-delay="1"></div>
				<div class="list-item" data-delay="0"></div>

				<div class="list-item" data-delay="0"></div>
				<div class="list-item" data-delay="1"></div>
				<div class="list-item" data-delay="2"></div>
				<div class="list-item" data-delay="3"></div>
				<div class="list-item" data-delay="2"></div>
				<div class="list-item" data-delay="1"></div>
				<div class="list-item" data-delay="0"></div>
			</div>
		</div>
	</div>

	<div class="title">
		<h1>钉钉动画结束</h1>
	</div>

	<script>
		const oBox = document.querySelector('.animation-box');
		const oList = document.querySelector('.animation-list');
		const oItems = oList.querySelectorAll('.list-item');
		const styleMap = new Map();

		function setStyleMap () {
			styleMap.clear();
			const containerRect = oBox.getBoundingClientRect();
			const scrollStart = containerRect.top + window.scrollY  - window.innerHeight / 2;
			const scrollEnd = containerRect.bottom + window.scrollY - window.innerHeight * 1.5;

			for (const item of oItems) {
				styleMap.set(item, getElAnimation(item, scrollStart, scrollEnd));
			}
		}
		
		setStyleMap();

		function getElAnimation (el, scrollStart, scrollEnd) {
			scrollStart = el.dataset.delay * 500 + scrollStart;
			const opacity = createAnimation(scrollStart, scrollEnd, 0, 1);
			const scale = createAnimation(scrollStart, scrollEnd, 0.5, 1);
			const translateX = createAnimation(scrollStart, scrollEnd, oList.clientWidth / 2 - el.offsetLeft - el.clientWidth / 2, 0);
			const translateY = createAnimation(scrollStart, scrollEnd, oList.clientHeight / 2 - el.offsetTop - el.clientHeight / 2, 0);
			const transform = function (scroll) {
				return \`translate(\${ translateX(scroll) }px, \${ translateY(scroll) }px) scale(\${ scale(scroll) })\`;
			}

			return {
				opacity,
				transform
			}
		}

		function createAnimation (scrollStart, scrollEnd, valueStart, valueEnd) {
			return function (scroll) {
				if (scroll <= scrollStart) return valueStart;
				if (scroll >= scrollEnd) return valueEnd;
				return valueStart + (valueEnd - valueStart) * (scroll - scrollStart) / (scrollEnd - scrollStart);
			}
		}

		function setStyleProperty () {
			const scroll = window.scrollY;

			for (const [el, styles] of styleMap) {
				for (const key in styles) {
					el.style[key] = styles[key](scroll);
				}
			}
		}

		setStyleProperty();

		window.addEventListener('scroll', setStyleProperty, false);
	</script>
</body>
</html>
`;