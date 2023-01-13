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

<section>
	<div class="hero min-h-screen pb-16 pt-24">
		<div class="flex-col">
			<div class="hero-content flex-col lg:flex-row-reverse">
				<div class="text-center lg:text-left lg:pl-8">
					<h1 class="text-5xl font-bold">Sign Up</h1>
					<p class="py-6">
						Get started with a free account and start making a difference today. Click <a
							class="link link-hover text-blue-500"
							href="login">here</a
						> to log in instead.
					</p>
				</div>
				<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
					<div class="card-body">
						<div class="form-control">
							<label for="email" class="label">
								<span class="label-text">Email</span>
							</label>
							<input id="email" type="text" placeholder="email" class="input input-bordered" />
						</div>
						<div class="form-control">
							<label for="password" class="label">
								<span class="label-text">Password</span>
							</label>
							<input
								id="password"
								type="text"
								placeholder="password"
								class="input input-bordered"
							/>
						</div>
						<div class="form-control mt-6">
							<button class="btn btn-primary">Sign Up</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
