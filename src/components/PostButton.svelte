<script>
	import { PlusCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
</script>

<button
	class="absolute left-2 bottom-2 bg-blue-600 hover:bg-blue-500 shadow-2xl rounded-full p-1 flex items-center text-white z-[4000]"
	><Icon src={PlusCircle} size="2rem" />
	<p class="font-medium p-2">New Post</p>
</button>
