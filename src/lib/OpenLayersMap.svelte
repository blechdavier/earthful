<script lang="ts">
	// placeholder for the map, tiles, and marker components. Then, onMount, we'll create the map and add the components to it.
	import { onMount } from 'svelte';

	import Map from 'ol/Map';
	import View from 'ol/View';
	import TileLayer from 'ol/layer/Tile';
	import XYZ from 'ol/source/XYZ';

	// export let dataPoints: { latitude: number; longitude: number; id: number; debrisType: number }[] =
	// 	[];

	onMount(() => {
		let zoom = window.devicePixelRatio;
		// the api allows adding a zoom level to the URL to get an image with a higher pixel scaling
		// for example, basemaps.cartocdn.com/.../z/x/y@2x.png would return the same image as /z/x/y.png
		// but with twice the resolution
		// if we don't do this the maps look crusty on phones which is pretty bad
		let zoomString = '';
		if (zoom > 1) {
			zoomString = '@' + zoom + 'x';
		}
		console.log('zoom: ' + zoom);
		let map = new Map({
			target: 'map',
			layers: [
				new TileLayer({
					source: new XYZ({
						// TODO IMPORTANT https://carto.com/grants/#form
						url:
							'https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}' + zoomString + '.png'
					})
				})
			],
			view: new View({
				center: [0, 0],
				zoom: 2
			}),
			controls: []
		});
	});
</script>

<div id="map" class="w-full h-full" />
