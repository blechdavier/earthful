<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Earthful</title>
	<meta name="description" content="Error: {$page.status}" />
</svelte:head>

<section class="hero min-h-screen pb-16 pt-24">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<div class="flex-col">
			<h2 class="text-3xl lg:text-5xl">{$page.status}</h2>
		</div>
	</div>
</section>
