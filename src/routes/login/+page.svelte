<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';

	let data = {
		email: '',
		password: ''
	};

	let errors = {
		email: undefined,
		password: undefined
	};

	let submitLogin: SubmitFunction = () => {
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

<form method="POST" use:enhance={submitLogin}>
	<label for="email">Email</label>
	<input type="email" name="email" value={data.email} />
	{#if errors.email}
		<label for="email">{errors?.email[0]}</label>
	{/if}
	<label for="password">Password</label>
	<input type="password" name="password" value={data.password} />
	{#if errors.password}
		<label for="password">{errors?.password[0]}</label>
	{/if}
	<button type="submit">Login</button>
</form>
<a href="/register">Don't have an account?</a>
