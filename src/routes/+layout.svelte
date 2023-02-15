<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<nav>
	<a href="/">home</a>
	<a href="/create">create</a>
	<a href="/data">data</a>
	<a href="/about">about</a>
	<a href="/users">users</a>
	{#if data.user}
		<p>Hi, {data.user.name}.</p>
		<form method="POST">
			<button formaction="/logout" type="submit" name="logout">logout</button>
		</form>
	{:else}
		<a href="/login">login</a>
		<a href="/register">register</a>
	{/if}
</nav>

<slot />
