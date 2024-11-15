<template>
	<div>
		<Toast
			:pt="{
				root: { class: 'toast-width' },
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
<script setup lang="ts"></script>

<style scoped>
strong {
	margin-right: 5px;
}
.toast-wrapper {
	display: flex;
	width: 90%;
}
</style>
