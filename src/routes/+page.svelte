<script lang="ts">
	import 'leaflet/dist/leaflet.css';
	import { onMount } from 'svelte';

	export let map;
	let L;
	let position: [number, number] = [0, 0];
	let zoom = 16;

	onMount(async () => {
		function success(pos: { coords: { latitude: number; longitude: number; accuracy: number } }) {
			const crd = pos.coords;
			console.log('Your current position is:');
			console.log(`Latitude : ${crd.latitude}`);
			console.log(`Longitude: ${crd.longitude}`);
			console.log(`More or less ${crd.accuracy} meters.`);
			position = [crd.latitude, crd.longitude];
		}

		function error(err: { code: any; message: string }) {
			console.warn(`ERROR(${err.code}): ${err.message}`);
		}

		await navigator.geolocation.getCurrentPosition(success, error);

		const l = await import('leaflet');
		L = l.default;

		map = L.map('map', { zoomControl: false }).setView(position, zoom);

		new L.Control.Zoom({ position: 'bottomright' }).addTo(map);

		L.tileLayer(
			'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
			{
				maxZoom: 18,
				attribution:
					'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
					'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
					'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
				id: 'mapbox/light-v9'
			}
		).addTo(map);
	});
</script>

<svelte:head>
	<title>Earthful</title>
	<meta name="description" content="A social platform to save our Earth." />
</svelte:head>

<section>
	<div id="map" class="h-[calc(100vh-48px)]" />
</section>
