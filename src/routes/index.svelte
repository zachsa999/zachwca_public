<script>
	$: mouse = { x: 0, y: 0 };

	$: outerWidth = 0;
	$: innerWidth = 0;
	$: outerHeight = 0;
	$: innerHeight = 0;
	$: center = { x: innerHeight / 2, y: outerHeight / 2 };
	$: distanceFromCenter = mouse.x + mouse.y / 2;

	function handleMouseMove(event) {
		mouse.x = (event.clientX - innerWidth / 2) / 100;
		mouse.y = (event.clientY - innerHeight / 2) / 100;
	}
</script>

<svelte:window bind:innerWidth bind:outerWidth bind:innerHeight bind:outerHeight />

<section on:mousemove={handleMouseMove} class="font-ubuntu flex justify-center items-center ">
	<div
		class="max-w-4xl content-wrapper flex justify-center items-center 
        h-screen m-5"
	>
		<div
			class="card bg-white px-28 py-8 shadow-2xl rounded-3xl"
			style={`transform: rotate3d(${mouse.x}, ${mouse.y}, 1, ${distanceFromCenter}deg);`}
		>
			<img src="../static/zWebLogo.png" alt="zWeb Logo" style="" class="w-full mb-8" />
			<div class="w-full px-5">
				<p class="text-xl min-w-4/5	text-center">
					Building software for efficiency, marketing, and automation, but mostly for people.
				</p>
				<div class="p-5">
					<div class="flex pl-20">
						<p class="font-semibold">Phone:</p>
						<p>&nbsp;<a href="tel:204-698-4613">1-204-698-4613</a></p>
					</div>
					<div class="flex pl-20">
						<p class="font-semibold">Email:</p>
						<p>&nbsp;<a href="mailto: zach@zachw.ca">zach@zachw.ca</a></p>
					</div>
				</div>
			</div>
			<p>x={mouse.x} y={mouse.y}</p>
			<p>
				Inner Width: {innerWidth}
			</p>
			<p>
				Inner Height: {innerHeight}
			</p>
			<p>
				Outer Width: {outerWidth}
			</p>
			<p>
				Outer Height: {outerHeight}
			</p>
		</div>
		<div />
	</div>
</section>

<style>
	.card {
		/* transform: skew({mouse.x}); */
	}
</style>
