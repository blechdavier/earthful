<script lang="ts">
	export let data;
</script>

<div class="flex flex-col justify-center items-center min-h-belownavbar space-y-6">
	<h1 class="text-5xl font-bold">Leaderboard 🎖</h1>
	<div class="flex flex-col sm:flex-row items-center justify-center">
		<div
			class="rounded-lg shadow-xl border border-gray-300 w-80 flex flex-col items-center m-2 p-6"
		>
			<h1 class="text-2xl font-bold mb-6">Top Users</h1>
			<div class="flex flex-col w-full rounded overflow-hidden shadow">
				<p
					class="group flex items-center justify-between px-4 py-2 text-gray-500 text-sm font-medium bg-gray-100 border-b-2"
				>
					<span>Username</span>
					<span>Debris Collected</span>
				</p>
				<p class="group flex items-center justify-between px-4 py-2 text-gray-500">
					<span class="text-sm font-medium"> {data.trackers[0].username} </span>

					<span class="shrink-0 rounded-full ml-3 bg-gold py-0.5 px-3 text-xs text-gray-600">
						{data.trackers[0].score.toLocaleString()}
					</span>
				</p>
				<p class="group flex items-center justify-between px-4 py-2 text-gray-500 bg-gray-100">
					<span class="text-sm font-medium"> {data.trackers[1].username} </span>

					<span
						class="shadow-inner shrink-0 rounded-full ml-3 bg-silver py-0.5 px-3 text-xs text-gray-600  font-semibold"
					>
						{data.trackers[1].score.toLocaleString()}
					</span>
				</p>
				<p class="group flex items-center justify-between px-4 py-2 text-gray-500">
					<span class="text-sm font-medium"> {data.trackers[2].username} </span>

					<span
						class="shadow-inner shrink-0 rounded-full ml-3 bg-bronze py-0.5 px-3 text-xs text-gray-600"
					>
						{data.trackers[2].score.toLocaleString()}
					</span>
				</p>
			</div>
			<a
				href="/leaderboard/trackers"
				class="mt-4 -mb-2 text-sm text-white font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 py-2 px-4"
			>
				See All
			</a>
		</div>
		<div class="rounded-lg shadow-xl border border-gray-300 flex flex-col items-center m-2 p-6">
			<h2 class="text-2xl font-bold mb-6">Top Projects</h2>
			<div class="flex flex-col w-full rounded overflow-hidden shadow">
				<p
					class="group flex items-center justify-between px-4 py-2 text-gray-500 text-sm font-medium bg-gray-100 border-b-2"
				>
					<span>Project Name</span>
					<span>Debris Collected</span>
				</p>
				<p class="group flex items-center justify-between px-4 py-2 text-gray-500">
					<span class="text-sm font-medium"> {data.projects[0].name} </span>

					<span class="shrink-0 rounded-full ml-3 bg-gold py-0.5 px-3 text-xs text-gray-600">
						{data.projects[0].score.toLocaleString()}
					</span>
				</p>
				<p class="group flex items-center justify-between px-4 py-2 text-gray-500 bg-gray-100">
					<span class="text-sm font-medium"> {data.projects[1].name} </span>

					<span
						class="shadow-inner shrink-0 rounded-full ml-3 bg-silver py-0.5 px-3 text-xs text-gray-600  font-semibold"
					>
						{data.projects[1].score.toLocaleString()}
					</span>
				</p>
				<p class="group flex items-center justify-between px-4 py-2 text-gray-500">
					<span class="text-sm font-medium"> {data.projects[2].name} </span>

					<span
						class="shadow-inner shrink-0 rounded-full ml-3 bg-bronze py-0.5 px-3 text-xs text-gray-600"
					>
						{data.projects[2].score.toLocaleString()}
					</span>
				</p>
			</div>
			<a
				href="/leaderboard/projects"
				class="mt-4 -mb-2 text-sm text-white font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 py-2 px-4"
			>
				See All
			</a>
		</div>
	</div>
</div>
