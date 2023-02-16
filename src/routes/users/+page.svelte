<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData

	$: ({ users } = data)
	console.log(users)
</script>

<!--Get all the posts from page.server.ts and put them in an each-->

<h1>USERS</h1>
{#each users as user}
	<p>user "{user.name}" has id "{user.id}"</p>
{/each}