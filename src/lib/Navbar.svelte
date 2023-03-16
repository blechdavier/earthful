<script lang="ts">
	import { onMount } from 'svelte';
	export let user: null | { name: string };
	let open = false;
</script>

<svelte:window
	on:resize={() => {
		if (window.innerWidth >= 768) {
			open = false;
		}
	}}
/>

<!--
  Modified from https://www.hyperui.dev/
-->
<header aria-label="Site Header" class="bg-white shadow-sm">
	<div class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
		<a
			class="flex text-teal-600"
			href="/"
			on:click={() => {
				open = false;
			}}
		>
			<span class="sr-only">Home</span>
			<img src="/favicon.svg" alt="Earthful Logo" class="h-8" />
			<p class="text-3xl font-bold pl-3 hidden xs:block">Earthful</p>
		</a>

		<div class="flex flex-1 items-center justify-end md:justify-between">
			<nav aria-label="Site Nav" class="hidden md:block">
				<ul class="flex items-center gap-6 text-sm text-gray-500">
					<li>
						<a
							class="transition hover:text-gray-500/75"
							href="/"
							on:click={() => {
								open = false;
							}}
						>
							Home
						</a>
					</li>

					<li>
						<a
							class="transition hover:text-gray-500/75"
							href="/about"
							on:click={() => {
								open = false;
							}}
						>
							About
						</a>
					</li>

					<li>
						<a
							class="transition hover:text-gray-500/75"
							href="/data"
							on:click={() => {
								open = false;
							}}
						>
							Data
						</a>
					</li>

					<li>
						<a
							class="transition hover:text-gray-500/75"
							href="/leaderboard"
							on:click={() => {
								open = false;
							}}
						>
							Leaderboard
						</a>
					</li>

					<li>
						<a
							class="transition hover:text-gray-500/75"
							href="/thanks"
							on:click={() => {
								open = false;
							}}
						>
							Credits
						</a>
					</li>
				</ul>
			</nav>

			<div class="flex items-center gap-4">
				{#if user}
					<p class="text-gray-500 transition">Hi, {user.name}.</p>

					<form method="POST" class="flex items-center gap-4">
						<button
							formaction="/logout"
							type="submit"
							name="logout"
							class="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
						>
							Logout
						</button>
					</form>
				{:else}
					<div class="sm:flex sm:gap-4">
						<a
							class="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
							href="/login"
							on:click={() => {
								open = false;
							}}
						>
							Login
						</a>

						<a
							class="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
							href="/register"
							on:click={() => {
								open = false;
							}}
						>
							Register
						</a>
					</div>
				{/if}

				<button
					class="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
					on:click={() => {
						open = !open;
					}}
				>
					<span class="sr-only">Toggle menu</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				</button>
			</div>
		</div>
	</div>
	<div class="absolute right-0 overflow-hidden z-50 shadow-lg rounded-lg">
		<div class="transition-all w-48 bg-white pb-1" class:-mt-96={!open}>
			{#if open}
				<nav aria-label="Submenu Site Nav" class="flex flex-col space-y-1">
					<a
						href="/"
						class="block rounded-lg hover:bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
						on:click={() => {
							open = false;
						}}
					>
						Home
					</a>

					<a
						href="/about"
						class="block rounded-lg hover:bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
						on:click={() => {
							open = false;
						}}
					>
						About
					</a>

					<a
						href="/data"
						class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
						on:click={() => {
							open = false;
						}}
					>
						Data
					</a>

					<a
						href="/leaderboard"
						class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
						on:click={() => {
							open = false;
						}}
					>
						Leaderboard
					</a>

					<a
						href="/thanks"
						class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
						on:click={() => {
							open = false;
						}}
					>
						Credits
					</a>

					<a
						href="/register"
						class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
						on:click={() => {
							open = false;
						}}
					>
						Register
					</a>
				</nav>
			{/if}
		</div>
	</div>
</header>
