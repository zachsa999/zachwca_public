<script>
	//todo Add Scrolling to zooom
	import { onMount } from 'svelte';
	import CardHome from './CardHome.svelte';
	import HomeMain from './HomeMain.svelte';
	import { fade, fly, crossfade } from 'svelte/transition';

	export let mouse = { x: 0, y: 0 };
	let cardTransform = { x: 0, y: 0, deg: 0 };
	let innerWidth = 0;
	let innerHeight = 0;

	let switchTimout = 1000;
	$: switchTimer = true;

	$: offset = 0.25;
	$: rotationMultiplier = 0.02;

	function toUnsignedInt(x) {
		if (x > 0) {
			return x;
		} else {
			return x * -1;
		}
	}

	function handleMouseMove(event) {
		mouse.x = event.clientX;
		mouse.y = event.clientY;

		cardTransform.x = (offset / innerWidth) * mouse.x - offset / 2;
		cardTransform.y = -(offset / innerHeight) * mouse.y + offset / 2;
		cardTransform.deg =
			(toUnsignedInt(cardTransform.x) + toUnsignedInt(cardTransform.y)) * rotationMultiplier;
	}

	function toggleClickIcon() {
		if (switchTimer == false) {
			switchTimer = true;
		} else {
			switchTimer = false;
		}
		setTimeout(toggleClickIcon, switchTimout);
	}
	onMount(() => {
		toggleClickIcon();
	});

	function handleClick() {
		splash = true;
	}

	export let splash = false;
</script>

<svelte:window bind:innerWidth bind:innerHeight />
{#if !splash}
	<div class="card-content w-full" on:mousemove={handleMouseMove} out:fade>
		<div class="panel-perspective relative" on:click={handleClick}>
			<div class="card-bottom absolute">
				<CardHome>
					<div class="click-logo">
						{#if switchTimer}
							<img class="click-prompt" src="finger.svg" alt="cursor" />
						{:else}
							<img class="click-prompt" src="fingerClick.svg" alt="cursor" />
						{/if}
					</div>
				</CardHome>
			</div>
			<div
				class="card"
				style={`transform: rotate3d(${cardTransform.y}, ${cardTransform.x}, 0, ${cardTransform.deg}turn);`}
			>
				<CardHome />
			</div>
		</div>
	</div>
{:else}
	<HomeMain />
{/if}

<style>
	.click-logo {
		bottom: calc(-3%);
		right: calc(50% - 25px);
		position: absolute;
		z-index: 1000;
	}

	.relative {
		position: relative;
	}
	.absolute {
		position: absolute;
	}
	.click-prompt {
		opacity: 60%;
		height: 50px;
		width: 50px;
	}

	.card-content {
		font-family: Ubuntu, sans-serif;
		justify-content: center;
		align-items: center;
		display: flex;
	}
	.panel-perspective {
		perspective: 900px;
		justify-content: center;
		align-items: center;
		max-width: 56rem;
		height: 98vh;
		display: flex;
		margin: 1.25rem;
		display: --hide-main-card;
	}

	.card {
		--tw-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
		--tw-shadow-colored: 0 25px 50px -12px var(--tw-shadow-color);
		box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
			var(--tw-shadow);
		padding-top: 2rem;
		padding-bottom: 2rem;
		padding-left: 7rem;
		padding-right: 7rem;
		--tw-bg-opacity: 1;
		background-color: rgb(255 255 255 / var(--tw-bg-opacity));
		--tw-border-opacity: 1;
		border-style: solid;
		border-width: 2px;
		border-radius: 1.5rem;
		align-items: center;
		transform: scale(0.9);
	}
</style>
