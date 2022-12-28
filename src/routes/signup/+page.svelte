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
		| undefined // blank  (doesn't show error message)
		| true // valid (doesn't show error message, but also is used in other logic)
		| 'Username must be at least 3 characters' // invalid
		| 'Username must only contain numbers and letters' //...
		| 'Username must be at most 20 characters'
		| 'Username is already taken';

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

	let passwordConfirmValidity: undefined | true | 'Passwords do not match';

	let emailValidity: undefined | true | 'Email must be a valid email address';

	function validateEmail(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (e.currentTarget.value.length > 0) {
			showBlankFieldMessage = false;
			blankFieldMessage = undefined;
			let formEmail = e.currentTarget.value;
			if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(formEmail)) {
				emailValidity = 'Email must be a valid email address';
			} else {
				emailValidity = true;
			}
		} else {
			blankFieldMessage = 'Please fill out all fields';
			emailValidity = undefined;
		}
	}

	function validateUsername(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (e.currentTarget.value.length > 0) {
			showBlankFieldMessage = false;
			blankFieldMessage = undefined;
			let formUsername = e.currentTarget.value;
			if (formUsername.length < 3) {
				usernameValidity = 'Username must be at least 3 characters';
			} else if (formUsername.length > 20) {
				usernameValidity = 'Username must be at most 20 characters';
			} else if (!/^[a-zA-Z0-9]+$/.test(formUsername)) {
				usernameValidity = 'Username must only contain numbers and letters';
			} else {
				usernameValidity = true;
			}
		} else {
			blankFieldMessage = 'Please fill out all fields';
			usernameValidity = undefined;
		}
	}

	function validatePassword(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		//TODO: untested regex
		if (e.currentTarget.value.length > 0) {
			showBlankFieldMessage = false;
			blankFieldMessage = undefined;
			let formPassword = e.currentTarget.value;
			if (e.currentTarget.value.length < 8) {
				passwordValidity = 'Password must be at least 8 characters';
			} else if (formPassword.length > 128) {
				passwordValidity = 'Password must be at most 128 characters';
			} else if (!/[0-9]/.test(formPassword)) {
				passwordValidity = 'Password must contain at least one number';
			} else if (!/[a-z]/.test(formPassword)) {
				passwordValidity = 'Password must contain at least one lowercase letter';
			} else if (!/[A-Z]/.test(formPassword)) {
				passwordValidity = 'Password must contain at least one uppercase letter';
			} else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formPassword)) {
				passwordValidity = 'Password must contain at least one special character';
			} else if (!/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(formPassword)) {
				passwordValidity = 'Password can only contain numbers, letters, and special characters';
			} else {
				passwordValidity = true;
			}
		} else {
			blankFieldMessage = 'Please fill out all fields';
			passwordValidity = undefined;
		}
	}

	function validateConfirmPassword(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (e.currentTarget.value.length > 0) {
			showBlankFieldMessage = false;
			blankFieldMessage = undefined;
			if (
				e.currentTarget.value !== (document.getElementById('password') as HTMLInputElement).value
			) {
				passwordConfirmValidity = 'Passwords do not match';
			} else {
				passwordConfirmValidity = true;
			}
		} else {
			blankFieldMessage = 'Please fill out all fields';
			passwordConfirmValidity = undefined;
		}
		console.log(passwordConfirmValidity);
	}

	let blankFieldMessage: undefined | 'Please fill out all fields' = 'Please fill out all fields';

	let showBlankFieldMessage = false;
</script>

<svelte:head>
	<title>Earthful</title>
	<meta name="description" content="Make a new Earthful account." />
</svelte:head>

<div
	class="flex flex-col min-w-full h-full justify-center items-center bg-cover bg-center bg-clouds dark:bg-rocks"
>
	<div
		class="flex flex-col space-y-2 items-center p-4 shadow-lg rounded-xl border bg-white bg-opacity-20 backdrop-blur-sm dark:border-stone-900 dark:bg-opacity-0"
	>
		<h1 class="font-medium text-xl pb-1">Sign Up</h1>
		<input
			type="email"
			placeholder="email"
			autocomplete="email"
			class="p-1 rounded w-48 text-black shadow"
			on:input={validateEmail}
		/>
		<input
			type="text"
			placeholder="username"
			class="p-1 rounded w-48 text-black shadow"
			on:input={validateUsername}
		/>
		<input
			type="password"
			placeholder="password"
			id="password"
			class="p-1 rounded w-48 text-black shadow"
			on:input={validatePassword}
		/>
		{#if passwordValidity === true}
			<input
				type="password"
				placeholder="confirm password"
				class="p-1 rounded w-48 text-black shadow"
				on:input={validateConfirmPassword}
			/>
		{/if}
		{#if emailValidity && emailValidity !== true}
			<p class="text-red-600 text-xs">{emailValidity}</p>
		{/if}
		{#if usernameValidity && usernameValidity !== true}
			<p class="text-red-600 text-xs">{usernameValidity}</p>
		{/if}
		{#if passwordValidity && passwordValidity !== true}
			<p class="text-red-600 text-xs">{passwordValidity}</p>
		{/if}
		{#if passwordConfirmValidity && passwordConfirmValidity !== true}
			<p class="text-red-600 text-xs">{passwordConfirmValidity}</p>
		{/if}
		{#if blankFieldMessage && showBlankFieldMessage}
			<p class="text-red-600 text-xs">{blankFieldMessage}</p>
		{/if}
		<div class="flex flex-row space-x-2 w-48">
			{#if usernameValidity === true && passwordValidity === true && passwordConfirmValidity === true && emailValidity === true}
				<a class="w-20 flex-grow" href="/signup"
					><button class="p-1 rounded bg-blue-600 hover:bg-blue-500 text-white w-full shadow"
						>Log In</button
					></a
				>
				<button class="p-1 rounded bg-blue-600 hover:bg-blue-500 text-white  w-20 flex-grow shadow"
					>Sign Up</button
				>
			{:else if (usernameValidity == undefined || usernameValidity === true) && (passwordValidity == undefined || passwordValidity === true) && (passwordConfirmValidity == undefined || passwordConfirmValidity === true) && (emailValidity == undefined || emailValidity === true)}
				<a class="w-20 flex-grow" href="/login" title="Go to the login page."
					><button class="p-1 rounded bg-blue-600 hover:bg-blue-500 text-white w-full shadow"
						>Log In</button
					></a
				>
				<button
					class="p-1 rounded bg-blue-600 hover:bg-blue-500 text-white  w-20 flex-grow shadow"
					title="Must enter valid credentials to sign up."
					on:click={() => {
						showBlankFieldMessage = true;
					}}>Sign Up</button
				>
			{:else}
				<a class="w-20 flex-grow" href="/login" title="Go to the login page."
					><button class="p-1 rounded bg-blue-600 hover:bg-blue-500 text-white w-full shadow"
						>Log In</button
					></a
				>
				<button
					class="p-1 rounded bg-neutral-600 text-white  w-20 flex-grow shadow"
					disabled
					title="Must enter valid credentials to sign up.">Sign Up</button
				>
			{/if}
		</div>
	</div>
</div>
