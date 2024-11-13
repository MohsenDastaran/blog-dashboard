<script lang="ts" setup>
import cButton from "primevue/button";
import { toast } from "@/utils/toast";
</script>

<template>
	<div>
		<div>Hello</div>
		<cButton @click="toast.success('test')">click</cButton>
	</div>
</template>
