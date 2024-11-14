<script setup lang="ts"></script>

<template>
	<div>
		<Toast
			@close="onClose"
			:pt="{
				messageContent: 'pt-toast',
			}"
		>
			<template #message="slotProps">
				<div class="toast-wrapper">
					<strong> {{ slotProps.message.summary }} </strong>
					<div class="font-medium text-lg my-4">{{ slotProps.message.detail }}</div>
				</div>
			</template>
		</Toast>
		<RouterView />
	</div>
</template>

<style scoped>
strong {
	margin-right: 5px;
}
.toast-wrapper {
	display: flex;
	width: 90%;
}
</style>
