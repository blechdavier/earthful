<script lang="ts">
	import Tray from '$lib/Tray.svelte';
</script>

<div class="flex flex-col sm:flex-row h-[calc(100dvh-64px)]">
	<div class="p-4 flex-grow">
		<h1 class="text-3xl semibold mb-4">Some Example Content</h1>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, omnis. Officiis ducimus quis non
			tenetur reprehenderit dolores consectetur nemo, modi facere! Corrupti laudantium voluptas
			voluptatibus fuga dolorum sunt commodi molestiae!
		</p>
	</div>
	<Tray>
		<div class="p-4">
			<h1 class="text-3xl semibold mb-4">Some Example Content</h1>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias tempore fuga voluptas
				doloremque atque debitis aspernatur sed ea ab fugit omnis iusto assumenda blanditiis
				necessitatibus enim architecto facere quas, dolore quasi consequuntur quo cupiditate. Dolor,
				illum provident quisquam sint omnis quasi alias consectetur dignissimos molestias libero
				quia optio, magnam debitis at, quidem accusantium dolorem quod. Quaerat molestiae sed ea
				incidunt beatae molestias corporis error! Facilis ipsum eligendi, earum tempore odit
				repudiandae molestias quod laudantium quos hic assumenda expedita aperiam adipisci.
			</p>
		</div>
	</Tray>
</div>
