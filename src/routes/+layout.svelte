<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import '../app.css';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<Navbar user={data.user} />

<slot />
