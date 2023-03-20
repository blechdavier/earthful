<script lang="ts">
	export let data;
</script>

{#each data.projects as { name, score }, i}
	<p class="m-1"><span class="font-bold">{i + 1}:</span> {name}: {score}</p>
{/each}
