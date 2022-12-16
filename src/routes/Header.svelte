<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { LightningBolt } from '@steeze-ui/heroicons';
</script>

<header>
	<nav class="flex content-between h-12 justify-between items-center p-3">
		<a href="/" aria-current={$page.url.pathname === '/' ? 'page' : undefined}
			><h1 class="font-black text-2xl">Earthful</h1></a
		>
		<ul class="flex">
			<li class="ml-3" aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">
					<Icon src={LightningBolt} theme="solid" class="text-red-500" />
				</a>
			</li>
			<li class="ml-3" aria-current={$page.url.pathname === '/plus' ? 'page' : undefined}>
				<a href="/plus"><Icon src={LightningBolt} theme="solid" class="bg-red-500" /></a>
			</li>
			<li class="ml-3" aria-current={$page.url.pathname === '/profile' ? 'page' : undefined}>
				<a href="/profile"><Icon src={LightningBolt} theme="solid" class="color-gray-900" /></a>
			</li>
		</ul>
	</nav>
</header>
