<script lang="ts">
	let open = false;
</script>

<div
	class="flex flex-col sm:flex-row w-full max-h-[calc(100dvh-64px)] sm:w-auto sm:max-w-[100dvw] sm:h-[calc(100dvh-64px)] border-gray-100"
>
	<!-- A button with arrows based on if it's open or not and a slot for content -->
	<button
		class="rounded-lg bg-teal-600 text-white font-medium transition-colors hover:bg-teal-700 p-2.5 mx-1 sm:mx-0 sm:my-1 flex items-center justify-center"
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
			<p class="ml-1 sm:hidden">Collapse Tray</p>
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
			<p class="ml-1 sm:hidden">Expand Tray</p>
		{/if}
	</button>
	{#if open}
		<div class="">
			<slot />
		</div>
	{/if}
</div>
