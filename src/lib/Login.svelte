<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';

	let data = {
		email: ''
	};

	let errors = {
		email: undefined,
		password: undefined
	};

	let submitLogin: SubmitFunction = () => {
		return async ({ result }) => {
			if (result.type == 'failure' && result.data) {
				data = result.data.data;
				errors = result.data.errors;
			}
			applyAction(result);
		};
	};
</script>

<!--
  This component uses @tailwindcss/forms

  yarn add @tailwindcss/forms
  npm install @tailwindcss/forms

  plugins: [require('@tailwindcss/forms')]
-->

<div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-lg text-center">
		<h1 class="text-2xl font-bold sm:text-3xl">Welcome back!</h1>

		<p class="mt-4 text-gray-500">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla eaque error neque
			ipsa culpa autem, at itaque nostrum!
		</p>
	</div>

	<form
		action="/login"
		method="POST"
		class="mx-auto mt-8 mb-0 max-w-md space-y-4"
		use:enhance={submitLogin}
	>
		<div>
			<label for="email" class="sr-only">Email</label>

			<div class="relative">
				<input
					name="email"
					type="email"
					class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
					class:border-red-500={errors.email}
					placeholder="Enter email"
					value={data.email ?? ''}
				/>

				<span class="absolute inset-y-0 right-0 grid place-content-center px-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 text-gray-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
						/>
					</svg>
				</span>
			</div>
			{#if errors.email}
				<div class="text-red-500 text-sm">{errors.email[0] ?? ''}</div>
			{/if}
		</div>

		<div>
			<label for="password" class="sr-only">Password</label>

			<div class="relative">
				<input
					name="password"
					type="password"
					class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
					class:border-red-500={errors.password}
					placeholder="Enter password"
					value={''}
				/>

				<span class="absolute inset-y-0 right-0 grid place-content-center px-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 text-gray-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
						/>
					</svg>
				</span>
			</div>
			{#if errors.password}
				<div class="text-red-500 text-sm">{errors.password[0] ?? ''}</div>
			{/if}
		</div>

		<div class="flex items-center justify-between">
			<p class="text-sm text-gray-500">
				No account?
				<a class="underline" href="/register">Sign up</a>
			</p>

			<button
				type="submit"
				class="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
			>
				Sign in
			</button>
		</div>
	</form>
</div>
