<script>
	// placeholder for the map, tiles, and marker compoents. Then, onMount, we'll create the map and add the components to it.
	import { onMount } from 'svelte';
	onMount(() => {
		// load the libraries necessary for the map
		import('leaflet').then((leaflet) => {
			// create the map
			const map = leaflet
				.map('map', {
					zoomControl: true,
					attributionControl: true,
					fadeAnimation: false
				})
				.setView([45, -69], 3);
			// add the tiles
			let CartoDB_Voyager = leaflet.tileLayer(
				'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
				{
					attribution:
						'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
					subdomains: 'abcd',
					maxZoom: 20
				}
			);
			CartoDB_Voyager.addTo(map);
			// center the map on the ip address of the user
			// do this asynchronously so that the map can load first
			let timer = Date.now();
			fetch('https://ipapi.co/json/')
				.then((response) => response.json())
				.then((data) => {
					//glide to the user's location
					map.flyTo([data.latitude, data.longitude], 10, {
						duration: 1.0
					});
				});
			console.log(Date.now() - timer);
		});
	});
</script>

<div id="map" class="w-full h-full" />
