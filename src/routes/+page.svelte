<script>
	import { Map, Marker, Tiles } from 'svelte-parts/map';
</script>

<Map width="100%" height="100dvh" lon={0} lat={51.5}>
	<Tiles url={'./0.png'} />
	<Marker lon={0} lat={51.5} popup={'<div class="w-28 h-16 rounded bg-slate-700 m-0" />'} />
</Map>
