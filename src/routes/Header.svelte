<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import { UserIcon, PlusSquareIcon, InfoIcon } from 'svelte-feather-icons';
</script>

<header>
	<nav class="flex content-between h-12 justify-between items-center p-3">
		<a href="/" aria-current={$page.url.pathname === '/' ? 'page' : undefined}
			><h1 class="font-black text-2xl">Cleaner World</h1></a
		>
		<ul class="flex">
			<li class="ml-3" aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about"><InfoIcon /></a>
			</li>
			<li class="ml-3" aria-current={$page.url.pathname === '/plus' ? 'page' : undefined}>
				<a href="/plus"><PlusSquareIcon /></a>
			</li>
			<li class="ml-3" aria-current={$page.url.pathname === '/profile' ? 'page' : undefined}>
				<a href="/profile"><UserIcon /></a>
			</li>
		</ul>
	</nav>
</header>
