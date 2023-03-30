<script lang="ts">
	import { onMount } from 'svelte';

	let scrolled = false;
	let initiallyScrolled = true;

	onMount(() => {
		initiallyScrolled = false;
		if (!window) return;
		if (window.scrollY > 0) initiallyScrolled = true;
		if (window.document.body.clientHeight <= window.innerHeight) initiallyScrolled = true;
		if (initiallyScrolled) return;

		window.addEventListener('scroll', () => {
			scrolled = scrolled || window.scrollY > 0;
		});

		window.addEventListener('resize', () => {
			if (window.document.body.clientHeight <= window.innerHeight) scrolled = true;
		});
	}); // TODO: remove listener on destroy
</script>

{#if !initiallyScrolled}
	<div
		class="transition-all absolute animate-pulse flex items-center justify-center bottom-0 right-0 mr-4 mb-4 z-50"
	>
		<div class="rounded-full bg-slate-900 transition-colors" class:bg-transparent={scrolled}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class={'h-8 w-8 m-3 text-white transition-all ' + (scrolled ? 'h-0 w-0 m-7' : '')}
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
			</svg>
		</div>
	</div>
{/if}
