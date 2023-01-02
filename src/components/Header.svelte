<script lang="ts">
	//import user store
	import { userStore } from '../routes/stores';
	import { User } from '../routes/user';
	let user: User | null;
	userStore.subscribe((x) => (user = x));
	if (Math.random() > 0.5) userStore.set(new User('test_user123'));
	else userStore.set(null);

	import { onMount } from 'svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { UserCircle, Map, Bars3 } from '@steeze-ui/heroicons';
	let navbarShown = true;
	let innerWidth = 640;

	onMount(() => {
		innerWidth = window.innerWidth;
		let nav = document.getElementById('nav');
		let ticking = false;
		let prevScrollPos = 0;
		document.addEventListener('scroll', () => {
			let offset = window.scrollY - prevScrollPos;
			console.log;
			prevScrollPos = window.scrollY;
			//performance
			if (!ticking) {
				window.requestAnimationFrame(() => {
					if (nav === null) return;
					navbarShown = offset <= 0;
					ticking = false;
				});
				ticking = true;
			}
		});
		window.addEventListener('resize', () => {
			innerWidth = window.innerWidth;
		});
	});
</script>

<div
	id="nav"
	class="fixed bg-[#0002] shadow-xl navbar transition-all z-50 backdrop-blur uppercase text-[#fff8] tracking-wider font-bold flex items-center justify-between h-24 px-4"
	class:-translate-y-full={!navbarShown}
>
	<div class="grow-0">
		<a href="/" class="text-3xl ">Earthful</a>
	</div>
	<div class="flex-none">
		{#if innerWidth < 640}
			<div class="dropdown dropdown-end">
				<ul class="menu menu-horizontal px-1">
					<li tabindex="0">
						<a> <Icon src={Bars3} class="w-8 h-8" /> </a>
						<ul class="p-2 bg-base-100">
							<li><a>Submenu 1</a></li>
							<li><a>Submenu 2</a></li>
						</ul>
					</li>
				</ul>
			</div>
		{:else}
			<div class="flex items-center space-x-8 overflow-clip">
				<a href="/map" class="flex flex-col justify-center items-center">
					<Icon src={Map} class="w-6 h-6" />
					<p class="text-sm">Map</p>
				</a>

				{#if user == null}
					<a href="/login" class="flex flex-col justify-center items-center">
						<Icon src={UserCircle} class="w-6 h-6" />
						<p class="text-sm">Log In</p>
					</a>
				{:else}
					<a href="/profile" class="flex flex-col justify-center items-center">
						<div class="w-6 h-6 mask mask-circle">
							<img alt="Your avatar." src={user.picture} class="w-full h-full" />
						</div>
						<span class="text-sm">{user.username}</span>
					</a>
				{/if}
			</div>
		{/if}
	</div>
</div>
