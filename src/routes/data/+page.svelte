<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import BlankMap from '$lib/BlankMap.svelte';
	import Tray from '$lib/Tray.svelte';

	type AnalysisResponse = {
		masterItemNames: Array<{ [key: string]: number }>;
		masterItemMaterials: Array<{ [key: string]: number }>;
		debrisQuantity: number;
	};

	// TODO fix already submitted protection or whatever
	let hasSubmitted = false;
	let requestStartTime: number;
	let requestElapsed: number;
	let data: AnalysisResponse;

	async function getDataAnalysis() {
		requestStartTime = Date.now();
		hasSubmitted = true;
	}

	let submitDataQuery: SubmitFunction = () => {
		// TODO make the query params in the URL for easier sharing
		return async ({ result }) => {
			if (result.type === 'success') {
				try {
					data = result.data as AnalysisResponse; // shush typescript my API will probably work
					console.log(result);
				} catch (err) {
					console.error('The server sent malformed data.');
				}

				hasSubmitted = false;
				requestElapsed = Date.now() - requestStartTime;
				console.log(requestElapsed);
			}
			applyAction(result);
		};
	};
</script>

<div class="flex flex-col sm:flex-row h-[calc(100dvh-64px)]">
	<div class="flex-grow">
		<BlankMap />
	</div>
	<Tray expandMessage="Show Analysis Tools" collapseMessage="Hide Analysis Tools">
		<div class="p-4 font-medium text-gray-500">
			<div class="flex justify-between">
				<h1 class="text-3xl mb-4 mt-1.5">Data Analysis</h1>
			</div>
			{#if data !== undefined}
				<h2 class="text-xl pb-5">
					{data.debrisQuantity.toLocaleString()} Pieces of Debris Analyzed in
					<span class="text-teal-600">{(requestElapsed / 1000).toFixed(2)}s</span>
				</h2>
			{:else}
				<h2 class="text-xl mb-3.5">Make sure to select the location and time frame you want.</h2>
				<form method="POST" class="text-sm" use:enhance={submitDataQuery}>
					<label for="fromDate">From</label>
					<input
						name="fromDate"
						type="date"
						id="fromDate"
						class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm my-2"
					/>
					<label for="toDate">To</label>
					<input
						name="toDate"
						type="date"
						id="toDate"
						class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm my-2"
					/>
					<label for="locationPicker">Location Filter</label>
					<select class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm my-2">
						<option value="None">All Locations</option>
						<option value="Circle">Circle</option>
						<option value="Polygon">Custom Polygon</option>
					</select>
					<button
						name="submit"
						value="analysis"
						class="block rounded-md bg-teal-600 px-5 py-2.5 font-medium text-white transition hover:bg-teal-700 mt-3"
						on:click={getDataAnalysis}
					>
						{hasSubmitted ? 'Loading' : 'Analyze'}
					</button>
					<button
						name="submit"
						value="export"
						class="block rounded-md bg-teal-600 px-5 py-2.5 font-medium text-white transition hover:bg-teal-700 mt-3"
					>
						{hasSubmitted ? 'Loading' : 'Export Data'}
					</button>
				</form>
			{/if}
		</div>
	</Tray>
</div>
