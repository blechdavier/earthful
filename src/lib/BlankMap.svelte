<script lang="ts">
	// placeholder for the map, tiles, and marker components. Then, onMount, we'll create the map and add the components to it.
	import { onMount } from 'svelte';

	import Map from 'ol/Map';
	import View from 'ol/View';
	import TileLayer from 'ol/layer/Tile';
	import XYZ from 'ol/source/XYZ';
	import { defaults as defaultControls, Control } from 'ol/control';
	import { defaults } from 'ol/interaction';

	const satellite_tile_url = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`;
	const simple_tile_url = `https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}`;

	let satelliteActive = false;

	let map: Map;
	let minimap: Map;

	// TODO fix the minimap lmao

	onMount(() => {
		let zoom = window.devicePixelRatio;
		// the api allows adding a zoom level to the URL to get an image with a higher pixel scaling
		// for example, basemaps.cartocdn.com/.../z/x/y@2x.png would return the same image as /z/x/y.png
		// but with twice the resolution
		// if we don't do this the maps look crusty on phones which is pretty bad
		let zoomString = '';
		if (zoom > 1) {
			zoomString = '@' + Math.ceil(zoom) + 'x';
		}
		map = new Map({
			target: 'map',
			layers: [
				new TileLayer({
					source: new XYZ({
						// TODO IMPORTANT https://carto.com/grants/#form
						url: (satelliteActive ? satellite_tile_url : simple_tile_url) + zoomString + '.png'
					})
				})
			],
			view: new View({
				center: [0, 0],
				zoom: 2
			}),
			controls: []
		});
		minimap = new Map({
			target: 'minimap',
			layers: [
				new TileLayer({
					source: new XYZ({
						// TODO IMPORTANT https://carto.com/grants/#form
						url: (satelliteActive ? simple_tile_url : satellite_tile_url) + zoomString + '.png'
					})
				})
			],
			view: new View({
				center: [0, 0],
				zoom: 0
			}),
			controls: [],
			interactions: []
		});
		map.on('moveend', () => {
			// set the minimap to the same view as the main map
			minimap.getView().setCenter(map.getView().getCenter());
			const zoom = map.getView().getZoom() ?? 0;
			const mapSize = map.getSize() ?? [256, 256];
			//console.log('zoom', zoom, 'mapSize', mapSize, 'log2', Math.log2(mapSize[1] / 64));
			//console.log('zoom', zoom - Math.log2(mapSize[1] / 64));
			minimap.getView().setZoom(zoom - Math.log2(mapSize[1] / 64));
		});
	});

	function toggleSatellite() {
		satelliteActive = !satelliteActive;
		let mapTileLayer: TileLayer<XYZ> = map.getLayers().getArray()[0] as TileLayer<XYZ>;
		let minimapTileLayer: TileLayer<XYZ> = minimap.getLayers().getArray()[0] as TileLayer<XYZ>;
		mapTileLayer.setSource(
			new XYZ({
				url: (satelliteActive ? satellite_tile_url : simple_tile_url) + '.png'
			})
		);
		minimapTileLayer.setSource(
			new XYZ({
				url: (satelliteActive ? simple_tile_url : satellite_tile_url) + '.png'
			})
		);
	}
</script>

<div class="w-full h-full relative overflow-hidden">
	<div id="map" class="w-full h-full -mb-16 bg-[#e1eff0]" class:bg-slate-900={satelliteActive} />
	<label class="sr-only" for="minimap">Toggle Satellite View</label>
	<button
		id="minimap"
		class="w-16 h-16 rounded-lg overflow-hidden border-2 shadow-lg absolute left-4 bottom-4 bg-slate-900 border-white"
		title="Toggle Satellite View"
		class:bg-[#e1eff0]={satelliteActive}
		class:border-gray-500={satelliteActive}
		on:click={toggleSatellite}
	/>
</div>
