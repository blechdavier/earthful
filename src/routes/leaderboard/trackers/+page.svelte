<script lang="ts">
	export let data;
</script>

<h1 class="font-bold text-5xl py-8 px-4 text-center w-full">Top Trackers Worldwide</h1>

{#each data.trackers as { username, score }, i}
	<p class="m-1 ml-2"><span class="font-bold">{i + 1}:</span> {username}: {score}</p>
{/each}
