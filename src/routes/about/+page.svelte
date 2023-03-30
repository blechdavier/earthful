<script lang="ts">
	import ScrollDownIndicator from '$lib/ScrollDownIndicator.svelte';
</script>

<ScrollDownIndicator />

<section>
	<div class="mx-auto px-4 py-16 sm:px-6 lg:px-8 h-full">
		<div class="grid grid-cols-1 lg:grid-cols-2 h-full">
			<div class="relative z-10 lg:py-16">
				<div class="relative h-64 sm:h-80 lg:h-full overflow-hidden">
					<img
						alt="House"
						src="https://images.unsplash.com/photo-1619099140992-06e3440e25a6?w=1000&q=80"
						class="absolute inset-0 h-full w-full object-cover"
					/>
				</div>
			</div>

			<div class="relative flex items-center bg-gray-100">
				<span class="hidden lg:absolute lg:inset-y-0 lg:-left-16 lg:block lg:w-16 lg:bg-gray-100" />

				<div class="p-8 sm:p-16 lg:p-24">
					<h2 class="text-2xl font-bold sm:text-3xl">What is Earthful?</h2>

					<p class="mt-4 text-gray-600">
						Intended to be used by teachers, students, and the general public, Earthful is a tool
						for visualizing the location and amount of marine debris around the world. Our mission
						is to educate people about the problem of marine debris, and to encourage people to take
						action to reduce the amount of debris in the ocean.
					</p>

					<a
						href="/data"
						class="mt-8 inline-block rounded-lg bg-teal-600 px-12 py-3 text-sm font-medium text-white hover:bg-teal-700"
					>
						Get Started
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<section>
	<div
		class="px-4 py-8 sm:py-12 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center w-full h-full"
	>
		<h2 class="text-3xl font-bold sm:text-4xl mb-4 md:mb-6">What makes us special?</h2>

		<div class="border w-40 h-0" />
		<div
			class="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:grid-cols-2 md:gap-12 lg:grid-cols-3 max-w-screen-xl text-left md:text-center"
		>
			<div class="flex items-start gap-4 bg-gray-100 p-4 rounded-lg border shadow-sm">
				<span class="shrink-0 rounded-lg bg-gray-200 p-2 xs:p-4 border border-gray-300 shadow-sm">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
						/>
					</svg>
				</span>

				<div>
					<h2 class="text-lg font-bold">Performance.</h2>

					<p class="mt-1 text-sm text-gray-600">
						We're fast, and we're proud of it. Earthful shows up to a <span class="font-bold italic"
							>{(10000).toLocaleString()}%
							<a class="align-super text-[0.5em]" href="/about#1">1</a>
						</span>
						improvement in performance over the competition, decreasing some loading times by over a
						minute.
					</p>
				</div>
			</div>

			<div class="flex items-start gap-4 bg-gray-100 p-4 rounded-lg border shadow-sm">
				<span class="shrink-0 rounded-lg bg-gray-200 p-2 xs:p-4 border border-gray-300 shadow-sm">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
						/>
					</svg>
				</span>

				<div>
					<h2 class="text-lg font-bold">Specialized.</h2>

					<p class="mt-1 text-sm text-gray-600">
						Earthful has options for filtering by date, location, and type of debris, along with
						multiple ways to visualize your data, making it the most specialized tool for
						visualizing marine debris.
					</p>
				</div>
			</div>

			<div class="flex items-start gap-4 bg-gray-100 p-4 rounded-lg border shadow-sm">
				<span class="shrink-0 rounded-lg bg-gray-200 p-2 xs:p-4 border border-gray-300 shadow-sm">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</span>

				<div>
					<h2 class="text-lg font-bold">Easy to Use.</h2>

					<p class="mt-1 text-sm text-gray-600">
						Earthful was designed with ease of use in mind. We've made it as intuitive as possible,
						and will continue to take feedback from our users to improve the experience.
					</p>
				</div>
			</div>

			<div class="flex items-start gap-4 bg-gray-100 p-4 rounded-lg border shadow-sm">
				<span class="shrink-0 rounded-lg bg-gray-200 p-2 xs:p-4 border border-gray-300 shadow-sm">
					<svg
						class="h-5 w-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M12 14l9-5-9-5-9 5 9 5z" />
						<path
							d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
						/>
					</svg>
				</span>

				<div>
					<h2 class="text-lg font-bold">Education Focused.</h2>

					<p class="mt-1 text-sm text-gray-600">
						We believe that the best way to educate a community is to appeal to teachers and
						students alike. We want to make it fun for students to learn and easy for teachers to
						teach.
					</p>
				</div>
			</div>

			<div class="flex items-start gap-4 bg-gray-100 p-4 rounded-lg border shadow-sm">
				<span class="shrink-0 rounded-lg bg-gray-200 p-2 xs:p-4 border border-gray-300 shadow-sm">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-5 h-5"
						fill="currentColor"
						viewBox="0 0 16 16"
					>
						<path
							d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1v-1z"
						/>
						<path
							d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729c.14.09.266.19.373.297.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.34 2.34 0 0 1 .433-.335.504.504 0 0 1-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a13.748 13.748 0 0 0-.748 2.295 12.351 12.351 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.354 12.354 0 0 0-.339-2.406 13.753 13.753 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27-1.036 0-2.063.091-2.913.27z"
						/>
					</svg>
				</span>

				<div>
					<h2 class="text-lg font-bold">Exciting.</h2>

					<p class="mt-1 text-sm text-gray-600">
						Leaderboards can encourage students to learn more and compete with their peers, or for
						schools to compete with each other to track the most debris.
					</p>
				</div>
			</div>

			<div class="flex items-start gap-4 bg-gray-100 p-4 rounded-lg border shadow-sm">
				<span class="shrink-0 rounded-lg bg-gray-200 p-2 xs:p-4 border border-gray-300 shadow-sm">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						/>
					</svg>
				</span>

				<div>
					<h2 class="text-lg font-bold">Ongoing Support.</h2>

					<p class="mt-1 text-sm text-gray-600">
						Any good product needs to be supported. We're here to help you with any <a
							href="/help"
							class="text-blue-600 underline">questions</a
						>
						you may have, and we're always looking for
						<a href="/suggestions" class="text-blue-600 underline">suggestions</a> to improve our product.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
