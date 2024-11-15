<template>
	<div>
		<h2>New Article</h2>
		<Form v-model="articleForm" @submit="onSubmit">
			<section class="info"></section>
			<section class="tag"></section>
			<Button type="submit" label="Submit" :loading="isLoading" />
		</Form>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const articleForm = ref({
	title: "",
	description: "",
	body: "",
	tags: [],
});

const newTag = ref("");
const tagOptions = ref([]);
const isLoading = ref(false);

const fetchTags = async () => {
	// Fetch tags from API and update tagOptions
	const tags = await fetch("/api/tags").then((res) => res.json());
	tagOptions.value = tags.sort((a, b) => a.name.localeCompare(b.name));
};

const addTag = () => {
	if (newTag.value.trim() !== "") {
		articleForm.value.tags.push(newTag.value);
		newTag.value = "";
	}
};

const onSubmit = async () => {
	isLoading.value = true;

	// Submit form data to API
	await fetch("/api/articles", {
		method: "POST",
		body: JSON.stringify(articleForm.value),
	});

	isLoading.value = false;
	// Handle success/error messages
};

fetchTags();
</script>
<style scoped>
h2 {
	font-size: 40px;
	font-weight: normal;
	line-height: 1.2;
}
</style>
