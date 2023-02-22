<script>
	// placeholder for the map, tiles, and marker compoents. Then, onMount, we'll create the map and add the components to it.
	import { onMount } from 'svelte';

	import Map from 'ol/Map';
	import View from 'ol/View';
	import TileLayer from 'ol/layer/Tile';
	import XYZ from 'ol/source/XYZ';
	import { fromLonLat } from 'ol/proj';
	import { Attribution, defaults as defaultControls } from 'ol/control.js';
	onMount(() => {
		let map = new Map({
			target: 'map',
			layers: [
				new TileLayer({
					source: new XYZ({
						// TODO IMPORTANT https://carto.com/grants/#form
						url: 'https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png'
					})
				})
			],
			view: new View({
				center: [0, 0],
				zoom: 2
			}),
			controls: []
		});

		fetch('https://ipapi.co/json/')
			.then((response) => response.json())
			.then((data) => {
				//glide to the user's approximate location
				map.getView().animate({
					center: fromLonLat([data.longitude, data.latitude]),
					zoom: 10,
					duration: 1000
				});
			});
	});
</script>

<div id="map" class="w-full h-full" />
