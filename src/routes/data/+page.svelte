<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import BlankMap from '$lib/BlankMap.svelte';
	import Tray from '$lib/Tray.svelte';
	import Chart from '$lib/Chart.svelte';

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
</script>

<div class="flex flex-col sm:flex-row h-[calc(100dvh-64px)]">
	<div class="flex-grow">
		<BlankMap />
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
						bind:value={shapeType}
					>
						<option value="None">All Locations</option>
						<option value="Circle">Circle</option>
						<option value="Polygon">Custom Polygon</option>
					</select>
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
