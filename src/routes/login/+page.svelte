<script lang="ts">
	// import test from '@playwright/test';

	// import { page } from '$app/stores';
	// import { Icon } from '@steeze-ui/svelte-icon';
	// import { InformationCircle, PlusCircle, UserCircle } from '@steeze-ui/heroicons';
	// //import user store
	// import { userStore } from '../stores';
	// import type { User } from '../user';
	// import test from '@playwright/test';
	// let user: User | null;
	// userStore.subscribe((x) => (user = x));
	// userStore.set(new User("test_user123"));
	// userStore.set(null);
	let usernameValidity:
		| undefined
		| true
		| 'Username must be at least 3 characters'
		| 'Username must only contain numbers and letters'
		| 'Username must be at most 20 characters';

	let passwordValidity:
		| undefined
		| true
		| 'Password must be at least 8 characters'
		| 'Password must contain at least one number'
		| 'Password must contain at least one uppercase letter'
		| 'Password must contain at least one lowercase letter'
		| 'Password must contain at least one special character'
		| 'Password can only contain numbers, letters, and special characters'
		| 'Password must be at most 128 characters';

	function validateUsername(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (e.currentTarget.value.length > 0) {
			if (e.currentTarget.value.length < 3) {
				usernameValidity = 'Username must be at least 3 characters';
			} else if (e.currentTarget.value.length > 20) {
				usernameValidity = 'Username must be at most 20 characters';
			} else if (!/^[a-zA-Z0-9]+$/.test(e.currentTarget.value)) {
				usernameValidity = 'Username must only contain numbers and letters';
			} else {
				usernameValidity = true;
			}
		} else {
			usernameValidity = undefined;
		}
	}

	function validatePassword(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		//TODO: untested regex
		if (e.currentTarget.value.length > 0) {
			if (e.currentTarget.value.length < 8) {
				passwordValidity = 'Password must be at least 8 characters';
			} else if (e.currentTarget.value.length > 128) {
				passwordValidity = 'Password must be at most 128 characters';
			} else if (!/[0-9]/.test(e.currentTarget.value)) {
				passwordValidity = 'Password must contain at least one number';
			} else if (!/[a-z]/.test(e.currentTarget.value)) {
				passwordValidity = 'Password must contain at least one lowercase letter';
			} else if (!/[A-Z]/.test(e.currentTarget.value)) {
				passwordValidity = 'Password must contain at least one uppercase letter';
			} else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(e.currentTarget.value)) {
				passwordValidity = 'Password must contain at least one special character';
			} else if (!/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(e.currentTarget.value)) {
				passwordValidity = 'Password can only contain numbers, letters, and special characters';
			} else {
				passwordValidity = true;
			}
		} else {
			passwordValidity = undefined;
		}
	}
</script>

<div
	class="flex flex-col min-w-full h-full justify-center items-center bg-cover bg-center bg-clouds dark:bg-rocks"
>
	<div
		class="flex flex-col space-y-2 items-center p-4 shadow-lg rounded-xl border bg-white bg-opacity-20 backdrop-blur-sm dark:border-stone-900 dark:bg-opacity-0"
	>
		<h1 class="font-medium text-xl pb-1">Log In</h1>
		<input
			type="text"
			placeholder="username"
			class="p-1 rounded w-48 text-black shadow"
			on:input={validateUsername}
		/>
		<input
			type="password"
			placeholder="password"
			class="p-1 rounded w-48 text-black shadow"
			on:input={validatePassword}
		/>
		{#if usernameValidity && usernameValidity !== true}
			<p class="text-red-600 text-xs">{usernameValidity}</p>
		{/if}
		{#if passwordValidity && passwordValidity !== true}
			<p class="text-red-600 text-xs">{passwordValidity}</p>
		{/if}
		<div class="flex flex-row space-x-2 w-48">
			{#if usernameValidity === true && passwordValidity === true}
				<button class="p-1 rounded bg-blue-600 hover:bg-blue-500 text-white w-20 flex-grow shadow"
					>Sign Up</button
				>
				<button class="p-1 rounded bg-blue-600 hover:bg-blue-500 text-white  w-20 flex-grow shadow"
					>Log In</button
				>
			{:else if (usernameValidity == undefined || usernameValidity === true) && (passwordValidity == undefined || passwordValidity === true)}
				<button class="p-1 rounded bg-blue-600 hover:bg-blue-500 text-white w-20 flex-grow shadow"
					>Sign Up</button
				>
				<button
					class="p-1 rounded bg-blue-600 hover:bg-blue-500 text-white  w-20 flex-grow shadow"
					disabled
					title="Must enter valid credentials to log in.">Log In</button
				>
			{:else}
				<button class="p-1 rounded bg-neutral-600 text-white w-20 flex-grow shadow">Sign Up</button>
				<button
					class="p-1 rounded bg-neutral-600 text-white  w-20 flex-grow shadow"
					disabled
					title="Must enter valid credentials to log in.">Log In</button
				>
			{/if}
		</div>
	</div>
</div>
