<script>
	import '../app.postcss';
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="app text-black dark:text-white bg-white dark:bg-black h-screen">
	<header>
		<Header />
	</header>

	<main>
		<slot />
	</main>

	<footer />
</div>
