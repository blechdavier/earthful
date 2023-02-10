<script lang="ts">
	export let data;
	const { posts } = data;
</script>

<!--Get all the posts from page.server.ts and put them in an each-->

<h1>POSTS</h1>
{#each posts as post}
	<h2>{post.title}</h2>
	<p>{post.body}</p>
{/each}
