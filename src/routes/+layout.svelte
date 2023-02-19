<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import '../app.css';
	import type { PageData } from './users/$types'; // FIXME why is this only importable from here?
	export let data: PageData;
</script>

<Navbar user={data.user} />

<slot />
