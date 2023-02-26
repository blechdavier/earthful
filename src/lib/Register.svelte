<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';

	// this is a bit of a hacky way to do this but it works for now

	let data = {
		name: '',
		email: ''
	};

	let errors = {
		name: undefined,
		email: undefined,
		password: undefined
	};

	let submitRegister: SubmitFunction = () => {
		return async ({ result }) => {
			console.log('submitRegister', result);
			if (result.type == 'failure' && result.data) {
				data = result.data.data;
				errors = result.data.errors;
			}
			applyAction(result);
		};
	};
</script>

<!--
  Modified from https://www.hyperui.dev/
-->

<div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-lg text-center">
		<h1 class="text-2xl font-bold sm:text-3xl">Get started today!</h1>

		<p class="mt-4 text-gray-500">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla eaque error neque
			ipsa culpa autem, at itaque nostrum!
		</p>
	</div>

	<form
		action="/register"
		method="POST"
		class="mx-auto mt-8 mb-0 max-w-md space-y-4"
		use:enhance={submitRegister}
	>
		<div>
			<label for="name" class="sr-only">Name</label>
			<div class="relative">
				<input
					name="name"
					type="text"
					class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
					class:border-red-500={errors.name}
					placeholder="Enter name"
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
							d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
						/>
					</svg>
				</span>
			</div>

			{#if errors.name}
				<p class="text-red-500 text-xs italic">{errors.name[0] ?? ''}</p>
			{/if}
		</div>
		<div>
			<label for="email" class="sr-only">Email</label>

			<div class="relative">
				<input
					name="email"
					type="email"
					class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
					class:border-red-500={errors.email}
					placeholder="Enter email"
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
				<p class="text-red-500 text-xs italic">{errors.email[0] ?? ''}</p>
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
				<p class="text-red-500 text-xs italic">{errors.password[0] ?? ''}</p>
			{/if}
		</div>

		<div class="flex items-center justify-between">
			<p class="text-sm text-gray-500">
				Already have an account?
				<a class="underline" href="/login">Sign in</a>
			</p>

			<button
				type="submit"
				class="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
			>
				Sign up
			</button>
		</div>
	</form>
</div>
