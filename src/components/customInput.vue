<template>
	<div class="input-wrapper">
		<label :class="{ 'label-error': invalid }" :for="name">{{ label }}</label>
		<InputText pt:root:class="pt-input" :name="name" type="text" fluid />
		<Message v-if="invalid" severity="error" size="small" variant="simple">{{
			errorMessage
		}}</Message>
	</div>
</template>

<script lang="ts" setup>
defineProps<{
	errorMessage: string;
	invalid: boolean;
	name: string;
	label: string;
}>();
</script>
<style scoped>
.input-wrapper {
	margin-bottom: 20px;
}
</style>
