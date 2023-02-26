<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import OpenLayersMap from '$lib/OpenLayersMap.svelte';
	import Tray from '$lib/Tray.svelte';
	let queryData = false;
	let loadingType: false | 'Fetching' | 'Analyzing' | 'Finalizing' = false;
	let loadingDots = '.';
	let requestStartTime: number;
	let requestElapsed: number;
	type DebrisLocationPost = {
		debrisType: number;
		latitude: number;
		longitude: number;
	};
	let dataPoints: DebrisLocationPost[] = [];

	async function getDataAnalysis() {
		requestStartTime = Date.now();
		loadingType = 'Fetching';
		setInterval(() => {
			loadingDots = loadingDots + '.';
			if (loadingDots === '....') loadingDots = '.';
		}, 200);
	}

	let submitDataQuery: SubmitFunction = () => {
		// TODO make the query params in the URL for easier sharing
		return async ({ result }) => {
			if (result.type === 'success') {
				try {
					dataPoints = result.data as [];
				} catch (err) {
					console.error('The server sent malformed data.');
				}

				queryData = true;
				loadingType = false;
				requestElapsed = Date.now() - requestStartTime;
			}
			applyAction(result);
		};
	};
</script>

<div class="flex flex-col sm:flex-row h-[calc(100dvh-64px)]">
	<div class="flex-grow">
		<OpenLayersMap />
	</div>
	<Tray expandMessage="Show Analysis Tools" collapseMessage="Hide Analysis Tools">
		<div class="p-4 font-medium text-gray-500">
			<div class="flex justify-between">
				<h1 class="text-3xl mb-4 mt-1.5">Data Analysis</h1>
				<div class="text-sm">
					<button
						class="block rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
					>
						<span class="sr-only">Filters</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
							/>
						</svg>
					</button>
				</div>
			</div>
			{#if queryData}
				<h2 class="text-xl pb-5">
					{dataPoints.length.toLocaleString()} Points Found in
					<span class="text-teal-600">{(requestElapsed / 1000).toFixed(2)}s</span>
				</h2>
				<!-- {#each dataPoints as dataPoint}
					<div class="rounded-lg shadow-md m-4 p-4">
						<p class="text-sm font-medium">
							Debris Type: {dataPoint.debrisType}
						</p>
						<p class="text-xs font-medium">
							Found at: [{dataPoint.latitude}, {dataPoint.longitude}]
						</p>
					</div>
				{/each} -->
			{:else}
				<h2 class="text-xl mb-3.5">Make sure to select the location and time frame you want.</h2>
				<form method="POST" action="/data" class="text-sm" use:enhance={submitDataQuery}>
					<label for="fromDate">From</label>
					<input
						type="date"
						id="fromDate"
						class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm my-2"
					/>
					<label for="toDate">To</label>
					<input
						type="date"
						id="toDate"
						class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm my-2"
					/>
					<label for="locationPicker">Location</label>
					<select class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm my-2">
						<option value="all">All Locations</option>
						<option value="radius">Within Distance</option>
						<option value="polygon">Custom Polygon</option>
					</select>
					<button
						type="submit"
						class="block rounded-md bg-teal-600 px-5 py-2.5 font-medium text-white transition hover:bg-teal-700 mt-3"
						on:click={getDataAnalysis}
					>
						{loadingType ? loadingType + loadingDots : 'Submit'}
					</button>
				</form>
			{/if}
		</div>
	</Tray>
</div>
