const config = {
	mode: 'jit',
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		screens: {
			xs: '480px',
			xxs: '320px',
			xxxs: '200px'
		}
	},

	plugins: []
};

module.exports = config;
