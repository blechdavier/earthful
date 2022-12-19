const config = {
	mode: 'jit',
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		screens: {
			'2xl': '1600px',
			xl: '1280px',
			lg: '1024px',
			md: '768px',
			sm: '640px',
			xs: '480px',
			'2xs': '320px',
			'3xs': '200px'
		},
		extend: {
			backgroundImage: {
				clouds:
					"url('/src/assets/images/clouds.webp'), linear-gradient(to bottom, rgb(194, 202, 208) 0%, rgb(164, 174, 182) 87%, rgb(141, 155, 169) 100%)",
				rocks:
					"url('/src/assets/images/rock.webp'), linear-gradient(169deg, rgb(0, 0, 0) 40%, rgb(39, 36, 29) 50%, rgb(88, 79, 66) 68%, rgb(0, 0, 0) 82%)"
			}
		}
	},

	plugins: []
};

module.exports = config;
