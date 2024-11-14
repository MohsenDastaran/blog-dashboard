<template>
	<div class="auth-layout">
		<div class="card">
			<h1 class="title">{{ route.name }}</h1>
			<router-view />
		</div>
	</div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>
<style scoped>
.auth-layout {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
}

.card {
	background-color: var(--silver);
	width: 450px;
	padding: 2rem 1.5rem;
	border: 1px solid #d9d9d9;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
h1.title {
	width: 100%;
	margin: 0 0 3rem 0;
	font-size: 3rem;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.19;
	letter-spacing: normal;
	text-align: center;
	color: var(--warm-grey);
}
</style>
