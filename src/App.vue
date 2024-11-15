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
		<router-view> </router-view>
	</div>
</template>
<script setup lang="ts">
import { enuStorageKey, storage } from "@/utils/storage";
import { useAuthStore } from "@/store/auth";

const token = storage.get(enuStorageKey.token);
const UserData = storage.get(enuStorageKey.user);
if (token && UserData) {
	useAuthStore().setUserCredentialsInApp({ ...JSON.parse(UserData), token });
}
</script>

<style scoped>
strong {
	margin-right: 5px;
}
.toast-wrapper {
	display: flex;
	width: 90%;
}
</style>
