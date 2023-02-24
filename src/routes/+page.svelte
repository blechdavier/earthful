<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ dataPoints } = data);
	import OpenLayersMap from '$lib/OpenLayersMap.svelte';
</script>

<div class="w-full h-[calc(100dvh-64px)]">
	<OpenLayersMap {dataPoints} />
</div>
