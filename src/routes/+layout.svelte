<script>
	import '../app.postcss';
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div
	class="app text-black dark:text-white bg-gray-100 dark:bg-black h-full flex flex-col flex-grow"
>
	<header>
		<Header />
	</header>

	<main class="flex-grow">
		<slot />
	</main>

	<footer />
</div>
