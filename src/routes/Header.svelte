<script lang="ts">
	import { page } from '$app/stores';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { InformationCircle, PlusCircle, UserCircle } from '@steeze-ui/heroicons';
	//import user store
	import { userStore } from './stores';
	import type { User } from './user';
	let user: User | null;
	userStore.subscribe((x) => (user = x));
	// userStore.set(new User('test_user123'));
	userStore.set(null);
</script>

<nav
	class="content-between h-12 justify-between items-center p-3 shadow bg-white dark:bg-black flex"
>
	<a href="/" aria-current={$page.url.pathname === '/' ? 'page' : undefined}
		><h1 class="font-black text-2xl">
			Earthful<span class="text-green-700 dark:text-green-400">.app</span>
		</h1></a
	>
	<ul class="flex">
		<li class="ml-3" aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
			<a href="/about">
				<Icon src={InformationCircle} size="2rem" />
			</a>
		</li>
		<li
			class="ml-3 hidden xs:block"
			aria-current={$page.url.pathname === '/plus' ? 'page' : undefined}
		>
			<a href="/plus"><Icon src={PlusCircle} size="2rem" /></a>
		</li>
		<li class="ml-3" aria-current={$page.url.pathname === '/profile' ? 'page' : undefined}>
			{#if user !== null}
				<a
					href="/profile"
					class="flex border-2 border-black dark:border-gray-100 rounded-full p-1 mt-[-2px] ml-[2px]"
				>
					<div class="flex rounded-full w-6 h-6 overflow-hidden justify-center align-middle">
						<img src={user.picture} alt="user profile" class="min-w-full min-h-full object-cover" />
					</div>
					<p class="ml-2 mr-2 dark:text-gray-300">{user.username}</p>
				</a>
			{:else}
				<a
					href="/login"
					class="flex border-2 border-black dark:border-gray-100 rounded-full p-1 mt-[-2px] ml-[2px]"
				>
					<Icon src={UserCircle} alt="" theme="solid" size="28px" class="m-[-2px]" />
					<p class="ml-2 mr-2 dark:text-gray-300 whitespace-nowrap">Log In</p>
				</a>
			{/if}
		</li>
	</ul>
</nav>
