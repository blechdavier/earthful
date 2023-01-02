<script>
	import { GlobeEuropeAfrica } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>
<section>
	<div
		class="hero min-h-screen bg-gradient-to-br from-lime-400 to-green-600 overflow-hidden pb-16 pt-16"
	>
		<!-- <h1 class="text-[12rem] relative top-48 left-80 text-[#fff2] font-semibold">EARTHFUL</h1> -->

		<div class="relative left-24 sm:left-64 sm:w-[600px] top-16 lg:w-[900px] lg:left-96">
			<Icon src={GlobeEuropeAfrica} class="text-[#16a34a80] lg:text-green-600" />
		</div>
		<div class="hero-content max-w-[70rem] flex-col lg:flex-row-reverse">
			<!-- FIXME Photo by <a href="https://unsplash.com/@vmxhu?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Szabo Viktor</a> on <a href="https://unsplash.com/photos/tsbcvd1YBZo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> -->
			<img
				src="https://images.unsplash.com/photo-1565886728041-a239b6a3ec42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
				class="min-w-[500px !important] max-w-sm rounded-lg shadow-2xl w-full"
				alt="A pile of trash on the ground."
			/>

			<div>
				<h1 class="text-5xl font-bold leading-[3.25rem]">Sharing Change through Social Media.</h1>
				<p class="py-6">
					In today's digital world, social media is a powerful tool. As people spend more and more
					time online, they draw influence from their digital peers. Read more to learn how to make
					an impact.
				</p>
				<div>
					<button class="btn btn-primary">Read More</button>
				</div>
			</div>
		</div>
	</div>
</section>
<section class="relative">
	<div class="fill-base-200 rotate-180 absolute bottom-[-1px] left-0 w-full">
		<svg
			data-name="Layer 1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1200 120"
			preserveAspectRatio="none"
		>
			<path
				d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
				opacity=".25"
				class="shape-fill"
			/>
			<path
				d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
				opacity=".5"
				class="shape-fill"
			/>
			<path
				d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
				class="shape-fill"
			/>
		</svg>
	</div>
</section>
<section>
	<div class="flex flex-col min-h-screen bg-base-200 items-center justify-center pb-16 pt-16">
		<h1 class="text-5xl font-bold mb-8">What is Earthful?</h1>
		<div class="2xl:flex space-y-2 2xl:space-x-4 2xl:space-y-0">
			<div class="bg-base-100 shadow-xl rounded-3xl md:w-[640px]">
				<div>
					<iframe
						class="aspect-video m-0 rounded-t-3xl w-full"
						title="Overview Video"
						src="https://www.youtube.com/embed/tgbNymZ7vqY"
					/>
				</div>
				<div class="card-body">
					<h2 class="card-title">
						Overview
						<div class="badge border-transparent bg-[#c4302b] text-white">YouTube</div>
					</h2>
					<p>What is Earthful, and why was it made? What went into the design and development?</p>
				</div>
			</div>
			<div class="bg-base-100 shadow-xl rounded-3xl md:w-[640px]">
				<div>
					<iframe
						title="Technical Development Video"
						class="aspect-video m-0 rounded-t-3xl w-full"
						src="https://www.youtube.com/embed/tgbNymZ7vqY"
					/>
				</div>
				<div class="card-body">
					<h2 class="card-title">
						Technical Development
						<div class="badge border-transparent bg-[#c4302b] text-white">YouTube</div>
					</h2>
					<p>
						A deeper dive into the technical details of Earthful. This video is geared towards
						programmers.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
<section class="relative w-full lg:mb-32">
	<div class="absolute top-[-1px] left-0 w-full overflow-hidden fill-base-200">
		<svg
			data-name="Layer 1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1200 120"
			preserveAspectRatio="none"
		>
			<path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" class="shape-fill" />
		</svg>
	</div>
</section>
<section>
	<div class="hero min-h-screen pb-16 pt-24">
		<div class="flex-col">
			<div class="hero-content flex-col lg:flex-row-reverse">
				<div class="text-center lg:text-left lg:pl-8">
					<h1 class="text-5xl font-bold">Sign Up</h1>
					<p class="py-6">Get started with a free account and start making a difference today.</p>
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
