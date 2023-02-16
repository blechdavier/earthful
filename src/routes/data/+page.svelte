<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData

	$: ({ dataPoints } = data)
	console.log(dataPoints)
</script>

<!--Get all the posts from page.server.ts and put them in an each-->

<h1>POSTS</h1>
{#each dataPoints as dataPoint}
	<p>data point at</p>
	<p>(lat, long), ({dataPoint.latitude}, {dataPoint.longitude})</p>
	<p>Debris type: {dataPoint.debrisType}</p>
{/each}