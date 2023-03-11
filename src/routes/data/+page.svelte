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
				<h2 class="text-xl">Make sure to select the location and time frame you want.</h2>
				<div
					class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 rounded-lg my-3"
					role="alert"
				>
					<svg
						class="fill-current w-4 h-4 mr-2"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						><path
							d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"
						/></svg
					>
					<p>
						All time zones in UTC {(new Date().getTimezoneOffset() / 60 < 0 ? ' + ' : ' - ') +
							Math.abs(new Date().getTimezoneOffset() / 60)}
					</p>
				</div>
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
