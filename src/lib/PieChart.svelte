<script lang="ts">
	import { Chart, registerables } from 'chart.js';
	import { onMount } from 'svelte';

	Chart.register(...registerables);

	export let labels: string[];
	export let data: number[];

	let id = 'Chart ' + Math.random().toString(36);

	onMount(() => {
		let ctx = document.getElementById(id);

		if (!ctx) {
			throw new Error('No canvas element found');
		}

		new Chart(ctx as HTMLCanvasElement, {
			type: 'pie',
			data: {
				labels,
				datasets: [
					{
						label: '',
						data,
						borderWidth: 1
					}
				]
			},
			options: {
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});
	});
</script>

<canvas {id} />
