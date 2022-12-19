<script lang="ts">
</script>

<svelte:head>
	<title>Earthful</title>
	<meta name="description" content="Log in to your Earthful account." />
</svelte:head>

<div
	class="flex flex-col min-w-full h-full justify-center items-center bg-cover bg-center bg-clouds dark:bg-rocks"
>
	<div
		class="flex flex-col space-y-2 items-center p-4 shadow-lg rounded-xl border bg-white bg-opacity-20 backdrop-blur-sm dark:border-stone-900 dark:bg-opacity-0"
	>
		<h1 class="font-medium text-xl pb-1">Log In</h1>
		<input type="text" placeholder="username" class="p-1 rounded w-48 text-black shadow" />
		<input type="password" placeholder="password" class="p-1 rounded w-48 text-black shadow" />
		<div class="flex flex-row space-x-2 w-48">
			<a class="w-20 flex-grow" href="/signup"
				><button class="p-1 rounded bg-blue-600 hover:bg-blue-500 text-white w-full shadow"
					>Sign Up</button
				></a
			>
			<button class="p-1 rounded bg-blue-600 hover:bg-blue-500 text-white  w-20 flex-grow shadow"
				>Log In</button
			>
		</div>
	</div>
</div>
