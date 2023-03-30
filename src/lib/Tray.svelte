<script lang="ts">
	let open = true;
	export let expandMessage: string = 'Expand Tray';
	export let collapseMessage: string = 'Collapse Tray';
</script>

<div class="flex flex-col sm:flex-row max-h-belownavbar sm:max-w-[100dvw]">
	<!-- A button to open and close the tray and a slot for content -->
	<button
		class="rounded-lg bg-teal-600 text-white font-medium text-sm transition-colors hover:bg-teal-700 p-2.5 flex items-center justify-center shadow-lg"
		on:click={() => (open = !open)}
	>
		{#if open}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 sm:-rotate-90"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="3"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
			</svg>
			<p class="ml-1 sm:hidden">{collapseMessage}</p>
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 sm:-rotate-90"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="3"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
			</svg>
			<p class="ml-1 sm:hidden">{expandMessage}</p>
		{/if}
	</button>
	{#if open}
		<div class="w-full">
			<div class="overflow-auto max-h-full">
				<slot />
			</div>
		</div>
	{/if}
</div>
