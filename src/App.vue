<script setup lang="ts">
import cButton from "primevue/button";
import { toast } from "@/utils/toast";
</script>

<template>
	<div>Hello</div>
	<cButton @click="toast.success('test')">click</cButton>
</template>

<style scoped></style>
