const config = {
	daisyui: {
		themes: [
		  {
			mytheme: {
			
				"primary": "#16a34a",
          
 "secondary": "#1e40af",
          
 "accent": "#44403c",
          
 "neutral": "#3D4451",
          
 "base-100": "#FFFFFF",
          
 "info": "#3ABFF8",
          
 "success": "#36D399",
          
 "warning": "#FBBD23",
          
 "error": "#F87272",
			},
		  },
		],
	  },
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
					"url('/src/assets/images/rocks.webp'), linear-gradient(173deg, rgb(0, 0, 0) 48%, rgb(59, 60, 64) 67%, rgb(35, 37, 40) 82%)"
			}
		}
	},

	plugins: [require("daisyui")],
};

module.exports = config;
