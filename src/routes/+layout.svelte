<script>
	import '../app.postcss';
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import './styles.css';
</script>

<div class="app h-full flex flex-col flex-grow">
	<header>
		<Header />
	</header>

	<main class="flex-grow">
		<slot />
	</main>

	<footer>
		<Footer />
	</footer>
</div>
