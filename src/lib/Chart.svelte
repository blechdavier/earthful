<script lang="ts">
	import { Chart, registerables } from 'chart.js';
	import { onMount } from 'svelte';

	Chart.register(...registerables);

	export let labels: string[];
	export let data: number[];
	export let type: 'pie' | 'bar' = 'pie';
	export let title: string;

	let id = 'Chart ' + Math.random().toString(36);

	const plugins = {
		title: {
			display: true,
			text: title,
			font: {
				size: 20,
				family:
					'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
				weight: '500'
			}
		},
		legend: {
			labels: {
				font: {
					size: 12.8,
					family:
						'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
					weight: '500'
				},
				usePointStyle: true
			},
			maxHeight: 96
		}
	};

	onMount(() => {
		let ctx = document.getElementById(id);

		if (!ctx) {
			throw new Error('No canvas element found');
		}

		let options;
		if (type === 'pie') {
			options = {
				plugins
			};
		} else {
			options = {
				scales: {
					y: {
						beginAtZero: true
					}
				},
				plugins
			};
			options.plugins.legend = {
				// @ts-ignore the type definition is wrong, this has the correct effect
				display: false
			};
		}

		new Chart(ctx as HTMLCanvasElement, {
			type,
			data: {
				labels,
				datasets: [
					{
						label: '',
						data,
						borderWidth: 1,
						hoverOffset: 16
					}
				]
			},
			options
		});
	});
</script>

<canvas {id} />
