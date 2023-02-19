<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';

	// this is a bit of a hacky way to do this but it works for now

	let data = {
		name: '',
		email: '',
		password: ''
	};

	let errors = {
		name: undefined,
		email: undefined,
		password: undefined
	};

	let submitRegister: SubmitFunction = () => {
		return async ({ result }) => {
			// this shouldn't be a success if there are errors but it is
			// I'm not sure why, I do return a failure in the backend but it still thinks it succeeded for some reason
			if (result.type == 'success' && result.data) {
				data = result.data.data;
				errors = result.data.errors;
			}
		};
	};
</script>

<form method="POST" use:enhance={submitRegister}>
	<label for="name">Name</label>
	<input type="text" name="name" value={data.name} />
	{#if errors.name}
		<label for="name">{errors?.name[0]}</label>
	{/if}
	<label for="email">Email</label>
	<input type="email" name="email" value={data.email} />
	{#if errors.email}
		<label for="email">{errors?.email[0]}</label>
	{/if}
	<label for="password">Password</label>
	<input type="password" name="password" />
	{#if errors.password}
		<label for="password">{errors?.password[0]}</label>
	{/if}
	<button type="submit">Sign Up</button>
</form>
<a href="/login">Already have an account?</a>
