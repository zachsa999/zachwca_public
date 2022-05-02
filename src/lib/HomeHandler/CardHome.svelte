<script>
	export let document;
</script>

<!-- This next line is the error -->
<h4 class="card-title mb-10">
	This needs to be dynamic:
	<!-- {document.data.title>} -->
</h4>

<slot />
