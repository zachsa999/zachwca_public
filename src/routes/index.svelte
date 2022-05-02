<script>
	import HomeHandler from '$lib/HomeHandler/HomeHandler.svelte';

	export let document;
</script>

<!-- this works -->
<h1>This works: {document.data.title}</h1>

<HomeHandler />
