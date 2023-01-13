<svelte:head>
	<title>Earthful</title>
	<meta name="description" content="Log in to your Earthful account." />
</svelte:head>

<section>
	<div class="hero min-h-screen pb-16 pt-24">
		<div class="flex-col">
			<div class="hero-content flex-col lg:flex-row-reverse">
				<div class="text-center lg:text-left lg:pl-8">
					<h1 class="text-5xl font-bold">Log In</h1>
					<p class="py-6">
						Log in to your existing Earthful account. Click <a
							class="link link-hover text-blue-500"
							href="signup">here</a
						> to make an account instead.
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
						<label for="forgot" class="label">
							<a id="forgot" href="/reset" class="label-text-alt link link-hover"
								>Forgot password?</a
							>
						</label>
						<div class="form-control mt-6">
							<button class="btn btn-primary">Sign Up</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
