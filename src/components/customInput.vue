<template>
	<div class="input-wrapper">
		<label :class="{ 'label-error': invalid }" :for="name">{{ label }}</label>
		<InputText pt:root:class="pt-input" :name type="text" :placeholder fluid />
		<Message v-if="invalid" severity="error" size="small" variant="simple">{{
			errorMessage
		}}</Message>
	</div>
</template>

<script lang="ts" setup>
defineProps<{
	errorMessage?: string;
	invalid?: boolean;
	name: string;
	label?: string;
	placeholder?: string;
}>();
</script>
<style scoped>
.input-wrapper {
	margin-bottom: 20px;
}
.label-error {
	color: var(--p-message-error-simple-color);
}
</style>
