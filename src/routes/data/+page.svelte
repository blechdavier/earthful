<script lang="ts">
	import { onMount } from 'svelte';

	import Map from 'ol/Map';
	import View from 'ol/View';
	import TileLayer from 'ol/layer/Tile';
	import XYZ from 'ol/source/XYZ';
	import VectorTileLayer from 'ol/layer/VectorTile';
	import VectorTileSource from 'ol/source/VectorTile';
	import GeoJSON from 'ol/format/GeoJSON';
	import Style from 'ol/style/Style';
	import CircleStyle from 'ol/style/Circle';
	import Fill from 'ol/style/Fill';
	import Stroke from 'ol/style/Stroke';
	import Text from 'ol/style/Text';
	import VectorSource from 'ol/source/Vector';
	import VectorLayer from 'ol/layer/Vector';
	import Draw from 'ol/interaction/Draw';
	import type { Type } from 'ol/geom/Geometry';
	import type Interaction from 'ol/interaction/Interaction';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import Tray from '$lib/Tray.svelte';
	import Chart from '$lib/Chart.svelte';
	import { Circle, Polygon } from 'ol/geom';
	import { toLonLat } from 'ol/proj';

	type AnalysisResponse = {
		masterItemNames: Array<{ master_item_name: string; quantity: number }>;
		masterMaterials: Array<{ master_material: string; quantity: number }>;
		debrisQuantity: number;
	};

	// TODO fix already submitted protection or whatever
	let hasSubmitted = false;
	let requestStartTime: number;
	let requestElapsed: number;
	let data: AnalysisResponse;

	let shapeType = 'None';
	let chartType: 'pie' | 'bar' = 'bar';

	let drawnGeometry: Polygon | Circle | undefined = undefined;
	let shape: [number, number][] = [];

	async function getDataAnalysis() {
		requestStartTime = Date.now();
		hasSubmitted = true;
	}

	let submitDataQuery: SubmitFunction = () => {
		// TODO make the query params in the URL for easier sharing
		return async ({ result }) => {
			if (result.type === 'success') {
				try {
					data = result.data as AnalysisResponse;
					//console.log(data);
				} catch (err) {
					console.error('The server sent malformed data.');
				}

				hasSubmitted = false;
				requestElapsed = Date.now() - requestStartTime;
				//console.log(requestElapsed);
			}
			applyAction(result);
		};
	};

	const satellite_tile_url = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`;
	const simple_tile_url = `https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}`;

	let satelliteActive = false;

	let map: Map;
	let minimap: Map;

	let pointSource = new VectorTileSource({
		url: '/api/clusters/{z}/{x}/{y}',
		format: new GeoJSON()
	});

	const styleCache: { [key: number]: Style } = {};

	let pointLayer = new VectorTileLayer({
		source: pointSource,
		style: function (feature) {
			// @ts-ignore
			const size = feature.values_.quantity;
			let style = styleCache[size];
			if (!style) {
				style = new Style({
					image: new CircleStyle({
						radius: Math.log10(size) * 3 + 10,
						stroke: new Stroke({
							color: '#3399CC',
							width: 1.25
						}),
						fill: new Fill({
							color: 'rgba(255, 255, 255, 0.6)'
						})
					}),
					text: new Text({
						text: size.toString(),
						fill: new Fill({
							color: '#084d70'
						}),
						font: 'bold 12px monospace'
					})
				});
				styleCache[size] = style;
			}
			return style;
		},
		renderMode: 'hybrid'
	});

	const drawSource = new VectorSource({ wrapX: false });

	const drawLayer = new VectorLayer({
		source: drawSource
	});

	let typeSelect: HTMLSelectElement;

	let draw: Interaction; // global so we can remove it later
	function addInteraction() {
		const value = typeSelect.value;
		if (value !== 'None') {
			draw = new Draw({
				source: drawSource,
				type: value as Type
			});
			//@ts-ignore
			draw.on('drawend', (e) => {
				// @ts-ignore
				const geom = e.feature.getGeometry();
				shape = [];
				if (geom instanceof Polygon) {
					drawnGeometry = geom;
					shape = geom.getCoordinates()[0].map((coord) => {
						return toLonLat(coord) as [number, number];
					});
				} else if (geom instanceof Circle) {
					drawnGeometry = geom;
					shape.push(toLonLat(geom.getCenter()) as [number, number]);
					shape.push([toLonLat([geom.getRadius(), 0])[0], 0]);
				} else {
					console.error('drawn geometry is not a polygon or circle');
				}
			});
			map.addInteraction(draw);
		}
	}

	onMount(() => {
		typeSelect = document.getElementById('type') as HTMLSelectElement;
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
				}),
				pointLayer,
				drawLayer
			],
			view: new View({
				center: [0, 0],
				zoom: 2
			}),
			controls: []
		});
		// add the interaction for drawing the shape
		addInteraction();
		// add a listener to print when the shape is drawn
		typeSelect.onchange = function () {
			console.log('changed');
			map.removeInteraction(draw);
			addInteraction();
		};
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

<div class="flex flex-col sm:flex-row h-belownavbar">
	<div class="flex-grow">
		<div class="w-full h-full relative overflow-hidden">
			<div
				id="map"
				class="w-full h-full -mb-16 bg-[#e1eff0]"
				class:bg-slate-900={satelliteActive}
			/>
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
	</div>
	<Tray expandMessage="Show Analysis Tools" collapseMessage="Hide Analysis Tools">
		<div class="p-4 font-medium text-gray-500">
			<h1 class="text-3xl mb-4 mt-1.5">Data Analysis</h1>
			{#if data !== undefined}
				<h2 class="text-xl pb-5">
					{data.debrisQuantity.toLocaleString()} Pieces of Debris Analyzed in
					<span class="text-teal-600">{(requestElapsed / 1000).toFixed(2)}s</span>
				</h2>
				<div class="flex justify-center flex-col xs:flex-row">
					<button
						class="block rounded-md bg-teal-600 px-5 py-2.5 font-medium text-white transition hover:bg-teal-700 m-2"
						on:click={() => (chartType = chartType === 'bar' ? 'pie' : 'bar')}
					>
						{#if chartType === 'bar'}
							View Pie Chart
						{:else}
							View Bar Chart
						{/if}
					</button>
					<button
						class="block rounded-md bg-teal-600 px-5 py-2.5 font-medium text-white transition hover:bg-teal-700 m-2"
					>
						Export Data
					</button>
					<button
						class="block rounded-md bg-teal-600 px-5 py-2.5 font-medium text-white transition hover:bg-teal-700 m-2"
					>
						Save Chart Image
					</button>
				</div>
				<div class="flex flex-col space-y-4 p-2">
					{#if chartType === 'bar'}
						<Chart
							title="Materials"
							labels={data.masterMaterials.map((material) => material.master_material)}
							data={data.masterMaterials.map((material) => material.quantity)}
							type="bar"
						/>
						<Chart
							title="Item Names"
							labels={data.masterItemNames.map((item) => item.master_item_name)}
							data={data.masterItemNames.map((item) => item.quantity)}
							type="bar"
						/>
					{:else}
						<Chart
							title="Materials"
							labels={data.masterMaterials.map((material) => material.master_material)}
							data={data.masterMaterials.map((material) => material.quantity)}
							type="pie"
						/>
						<Chart
							title="Item Names"
							labels={data.masterItemNames.map((item) => item.master_item_name)}
							data={data.masterItemNames.map((item) => item.quantity)}
							type="pie"
						/>
					{/if}
				</div>
			{:else}
				<h2 class="text-xl mb-4">Make sure to select the location and time frame you want.</h2>
				<form method="POST" class="text-sm" use:enhance={submitDataQuery}>
					<label for="gte">From</label>
					<input
						name="gte"
						type="date"
						id="gte"
						class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm my-2"
					/>
					<label for="lte">To</label>
					<input
						name="lte"
						type="date"
						id="lte"
						class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm my-2"
					/>
					<label for="locationPicker">Location Filter</label>
					<select
						class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm my-2"
						id="type"
						name="shapeType"
						bind:value={shapeType}
					>
						<option value="None">All Locations</option>
						<option value="Circle">Circle</option>
						<option value="Polygon">Custom Polygon</option>
					</select>
					<input type="hidden" name="shape" bind:value={shape} />
					{#if shapeType !== 'None'}
						<div class="flex rounded-full bg-blue-500 text-white p-1 animate-pulse shadow mt-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 mx-1"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
								/>
							</svg>
							<p class="text-md mx-1">Click anywhere on the map to draw your shape.</p>
						</div>
					{/if}
					<div class="flex justify-center items-center">
						<button
							type="submit"
							name="action"
							value="analysis"
							class="block rounded-md bg-teal-600 px-5 py-2.5 font-medium text-white transition hover:bg-teal-700 mt-3"
							on:click={getDataAnalysis}
						>
							{hasSubmitted ? 'Loading' : 'Analyze Data'}
						</button>
						<div class="w-1 h-3 rounded-full bg-gray-200 mx-1 mt-3" />
						<button
							type="submit"
							name="action"
							value="export"
							class="block rounded-md bg-teal-600 px-5 py-2.5 font-medium text-white transition hover:bg-teal-700 mt-3"
						>
							Export Data
						</button>
					</div>
				</form>
			{/if}
		</div>
	</Tray>
</div>
