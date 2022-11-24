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

		var Esri_WorldImagery = L.tileLayer(
			'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
			{
				attribution:
					'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
			}
		).addTo(map);
	});
</script>

<svelte:head>
	<title>Cleaner World</title>
	<meta name="description" content="A social platform to save our Earth." />
</svelte:head>

<section>
	<div id="map" class="h-[calc(100vh-48px)]" />
</section>
