<script lang="ts">
	import 'leaflet/dist/leaflet.css';
	//TODO make this better lol

	import { onMount } from 'svelte';

	export let map;
	let L;
	let position: [number, number] = [0, 0];
	let zoom = 16;

	// https://docs.ipdata.co/docs/html5-geolocation-with-ipdata-fallback
	const geoFindMe = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(success, error, geoOptions);
		} else {
			console.log('Geolocation services are not supported by your web browser.');
		}
	};

	const success = (position) => {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;
		const altitude = position.coords.altitude;
		const accuracy = position.coords.accuracy;
		console.log(`lat: ${latitude} long: ${longitude}`);
		return [data.latitude, data.longitude];
	};

	const error = (error) => {
		var request = new XMLHttpRequest();
		request.open('GET', 'http://ipapi.co/json');
		request.onreadystatechange = function () {
			if (this.readyState === 4) {
				let data = JSON.parse(this.responseText);
				console.log(`lat: ${data.latitude} long: ${data.longitude}`);
				position = [data.latitude, data.longitude];
			}
		};
		request.send();
	};

	const geoOptions = {
		enableHighAccuracy: true,
		maximumAge: 30000,
		timeout: 27000
	};

	onMount(async () => {
		// geolocate
		await geoFindMe();

		console.log('position', position);
		// make map
		const l = await import('leaflet');
		L = l.default;

		if (map != undefined) {
			map.remove();
		}
		map = L.map('map', { zoomControl: false }).setView(position, zoom);

		new L.Control.Zoom({ position: 'bottomright' }).addTo(map);

		let lightMap = L.tileLayer(
			'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
			{
				maxZoom: 20,
				attribution:
					'&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
			}
		);
		let darkMap = L.tileLayer(
			'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
			{
				maxZoom: 20,
				attribution:
					'&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
			}
		);
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			// dark mode
			darkMap.addTo(map);
		} else {
			// light mode
			lightMap.addTo(map);
		}

		L.marker([51.5, -0.09])
			.addTo(map)
			.bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
			.openPopup();
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
			const newColorScheme = event.matches ? 'dark' : 'light';
			if (newColorScheme === 'dark') {
				darkMap.addTo(map);
				lightMap.remove();
			} else {
				lightMap.addTo(map);
				darkMap.remove();
			}
		});
	});
</script>

<svelte:head>
	<title>Earthful</title>
	<meta name="description" content="A social platform to save our Earth." />
</svelte:head>

<section>
	<div id="map" class="h-[calc(100vh-48px)] bg-[#c1c9cc] dark:bg-[#222222]" />
</section>
