<script lang="ts">
	import { page } from '$app/stores';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { InformationCircle, PlusCircle, UserCircle } from '@steeze-ui/heroicons';
	//import user store
	import { userStore } from '../routes/stores';
	import { User } from '../routes/user';
	let user: User | null;
	userStore.subscribe((x) => (user = x));
	userStore.set(new User('test_user123'));
	// userStore.set(null);

	import { onMount } from 'svelte';
	let navbarShown = true;

	onMount(() => {
		let nav = document.getElementById('nav');
		let ticking = false;
		let prevScrollPos = 0;
		document.addEventListener('scroll', () => {
			let offset = window.scrollY - prevScrollPos;
			prevScrollPos = window.scrollY;
			//performance
			if (!ticking) {
				window.requestAnimationFrame(() => {
					if (nav === null) return;
					if (offset > 0 && window.scrollY > 0) {
						navbarShown = false;
					} else {
						navbarShown = true;
					}
					ticking = false;
				});
				ticking = true;
			}
		});
	});
</script>

<div
	id="nav"
	class={'navbar fixed bg-[#16a34a] transition-all z-50 ' + (navbarShown ? '' : '-translate-y-16')}
>
	<div class="flex-1">
		<a href="/" class="btn btn-primary normal-case text-xl">Earthful</a>
	</div>
	<div class="flex-none">
		<button class="btn btn-square btn-primary">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="inline-block w-5 h-5 stroke-current"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
				/></svg
			>
		</button>
	</div>
</div>
