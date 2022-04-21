<script>
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	$: mouse = { x: 0, y: 0 };
	$: cardTransform = { x: 0, y: 0, deg: 0 };

	$: innerWidth = 0;
	$: innerHeight = 0;

	function toUnsignedInt(x) {
		if (x > 0) {
			return x;
		} else {
			return x * -1;
		}
	}

	$: offset = 0.25;
	$: rotationMultiplier = 0.02;
	$: perspectiveMulitiplier = 200;
	function handleMouseMove(event) {
		mouse.x = event.clientX;
		mouse.y = event.clientY;

		cardTransform.x = (offset / innerWidth) * mouse.x - offset / 2;
		cardTransform.y = -(offset / innerHeight) * mouse.y + offset / 2;
		cardTransform.deg =
			(toUnsignedInt(cardTransform.x) + toUnsignedInt(cardTransform.y)) * rotationMultiplier;
		// console.log(x, y);
		console.log(cardTransform);
	}
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div class="slidecontainer flex mx-auto">
	<div class="p-2">
		<input
			bind:value={rotationMultiplier}
			type="range"
			min="0"
			step="0.001"
			max="1"
			class="slider accent-[#DA7D00] color-slate-400"
			id="offset"
			color="#DA7D00"
		/>
		<label for="offset">Rotation</label>
		<input
			bind:value={perspectiveMulitiplier}
			type="range"
			min="1"
			max="1000"
			class="slider accent-[#DA7D00]"
			id="perspectiveMulitplier"
			color="#DA7D00"
		/>
		<label for="perspectiveMulitplier">Perspective</label>
	</div>
</div>

<section on:mousemove={handleMouseMove} class="font-ubuntu flex justify-center items-center ">
	<div
		class="max-w-4xl content-wrapper flex justify-center items-center 
        h-screen m-5 panel-perspective"
		style={`transform: perspective(${perspectiveMulitiplier}px);`}
	>
		<div
			transition:scale={{ duration: 500, delay: 500, opacity: 0.5, start: 0.5, easing: quintOut }}
			class="card bg-white px-28 py-8 shadow-2xl rounded-3xl border-slate-200 border-solid border-2"
			style={`transform: rotate3d(${cardTransform.y}, ${cardTransform.x}, 0, ${cardTransform.deg}turn);`}
		>
			<img src="zWebLogo.png" alt="zWeb Logo" style="" class="w-full mb-8" />
			<div class="w-full px-5">
				<p class="text-xl min-w-4/5	text-center">
					Building software for efficiency, marketing, and automation, but mostly for humans.
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
		</div>
		<div />
	</div>
</section>

<style>
	.slider {
		color: #da7d00;
	}
	.panel-perspective {
		perspective: 400px;
	}

	.card {
	}
</style>
