<script>

	import MapComponent from "../components/MapComponent.svelte";

</script>
<svelte:head>
	<title>Earthful</title>
	<meta name="description" content="A social platform to save our Earth." />
</svelte:head>

<MapComponent /> 

<section>
	<div id="map" class="h-[calc(100vh-48px)] bg-[#c1c9cc] dark:bg-[#222222]" />
</section>
