document.addEventListener("DOMContentLoaded", function () {

	const skillSlider = document.getElementById('skill-slider');

	if (skillSlider) {

		var splide = new Splide("#skill-slider", {
			type: "loop",
			perPage: 4,
			arrows: false,
			drag: false,
			pagination: false,
			gap: "1.5rem",
			autoplay: true,
			interval: 0,
			speed: 75000,
			mediaQuery: "min",
			breakpoints: {
				576: {
					perPage: 4,
				},
				768: {
					perPage: 4,
				},
				992: {
					perPage: 6,
					width: "50%",
					gap: "2.5rem",
					speed: 100000,
				},
				1200: {
					perPage: 6,
				},
				1400: {
					perPage: 6,
				}
			},
		});

		splide.mount();
	}
});
