<script lang="ts">
    
	import type { LayerGroup, Map } from 'leaflet';
	import 'leaflet/dist/leaflet.css';

	import { onMount } from 'svelte';
	// import { bindPopup } from './map';

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

	const success = (position: GeolocationPosition) => {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;
		const altitude = position.coords.altitude;
		const accuracy = position.coords.accuracy;
		console.log(`lat: ${latitude} long: ${longitude}`);
		return [latitude, longitude];
	};

	const error = (error: GeolocationPositionError) => {
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
		// geolocation
		await geoFindMe();

		console.log('position', position);
		// make map
		const l = await import('leaflet');
		L = l.default;

		let map: Map | LayerGroup<any> | undefined = undefined;
		
		map = L.map('map', { zoomControl: false }).setView(position, zoom);

		new L.Control.Zoom({ position: 'bottomright' }).addTo(map);

		let lightMap = L.tileLayer(
			'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
			{
				maxZoom: 20,
				attribution:
					'&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
			}
		);
		let darkMap = L.tileLayer(
			'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png',
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

		// let marker = L.marker([51.5, -0.09])
		// bindPopup(marker, (container) => {
		// 	let c = new Button({
		// 		target: container,
		// 	});
		// 	return c;
		// });

		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
			if (!map) return;
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