<!-- src/components/NotFound.vue -->
<template>
	<div class="not-found">
		<h1>404</h1>
		<p>The page you are looking for was not found.</p>
		<router-link to="/">Go back to Home</router-link>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

export default defineComponent({
	name: "NotFound",
	components: {
		RouterLink,
	},
});
</script>

<style scoped>
.not-found {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	text-align: center;
	color: #333;
}

.not-found h1 {
	font-size: 5rem;
	margin-bottom: 1rem;
}

.not-found p {
	font-size: 1.5rem;
	margin-bottom: 1.5rem;
}

.not-found a {
	color: #007bff;
	text-decoration: none;
}

.not-found a:hover {
	text-decoration: underline;
}
</style>
