<script lang=ts>
	import { page } from '$app/stores';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { InformationCircle, PlusCircle, UserCircle } from '@steeze-ui/heroicons';
	//import user store
	import { userStore } from './stores';
	import { User } from './user';
	let user: User | null;
	userStore.subscribe(x => user = x);
	userStore.set(new User("numericly"));
	// userStore.set(null);
</script>

<header>
	<nav class="flex content-between h-12 justify-between items-center p-3">
		<a href="/" aria-current={$page.url.pathname === '/' ? 'page' : undefined}
			><h1 class="font-black text-2xl">Earthful</h1></a
		>
		<ul class="flex">
			<li class="ml-3" aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">
					<Icon src={InformationCircle} size="2rem" />
				</a>
			</li>
			<li class="ml-3" aria-current={$page.url.pathname === '/plus' ? 'page' : undefined}>
				<a href="/plus"><Icon src={PlusCircle} size="2rem" /></a>
			</li>
			<li class="ml-3" aria-current={$page.url.pathname === '/profile' ? 'page' : undefined}>
				<a href="/profile">
					<div class="flex border-2 border-gray-100 rounded-full p-1 mt-[-2px] ml-[2px]">
						{#if user !== null}
							
								<div class="flex rounded-full w-6 h-6 overflow-hidden justify-center align-middle">
									<img src={user.picture} alt="user profile" class="min-w-full min-h-full object-cover"/>
								</div>
								<p class="ml-2 mr-2 text-gray-300">{user.username}</p>
							
						{:else}
							<Icon src={UserCircle} theme="solid" size="28px" class="m-[-2px]"/>
							<p class="ml-2 mr-2 text-gray-500">Log In</p>
						{/if}
					</div>
				</a>
			</li>
		</ul>
	</nav>
</header>