<script lang="ts">
	export let data;
	const { dataPoints } = data;
</script>

<!--Get all the posts from page.server.ts and put them in an each-->

<h1>POSTS</h1>
{#each dataPoints as dataPoint}
	<p>{dataPoint.lat}, {dataPoint.lng}</p>
	<p>Debris type: {dataPoint.debrisType}</p>
{/each}
