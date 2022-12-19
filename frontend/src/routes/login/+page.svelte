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
		class="flex flex-col items-center p-4 shadow-lg rounded-xl border bg-white bg-opacity-20 backdrop-blur-sm dark:border-stone-900 dark:bg-opacity-0"
	>
		<h1 class="font-medium text-xl mb-4">Log In</h1>
		<input type="text" placeholder="username" class="p-1 rounded w-48 text-black shadow" />
		<input type="password" placeholder="password" class="p-1 rounded w-48 text-black shadow mt-2" />
		<div class="flex flex-row space-x-2 w-48 mt-2">
			<a class="w-20 flex-grow" href="/signup"
				><button class="p-1 rounded bg-blue-600 hover:bg-blue-500 text-white w-full shadow"
					>Sign Up</button
				></a
			>
			<button class="p-1 rounded bg-blue-600 hover:bg-blue-500 text-white  w-20 flex-grow shadow"
				>Log In</button
			>
		</div>
		<a href="./resetpassword" class="text-xs underline mt-2 mb-[-4px] hover:text-blue-500 dark:hover:text-blue-400">Forgot your password?</a>
	</div>
</div>
