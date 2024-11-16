<template>
	<div class="card flex justify-center">
		<SplitButton
			severity="info"
			label="..."
			@click="save"
			:model="items"
			ref="SplitButtonRef"
		/>
	</div>
</template>

<script setup>
import { useTemplateRef } from "vue";
const emit = defineEmits(["edit", "delete"]);
const SplitButtonRef = useTemplateRef("SplitButtonRef");
const items = [
	{
		label: "Edit",
		command: () => emit("edit"),
	},
	{
		separator: true,
	},
	{
		label: "Delete",
		command: () => emit("delete"),
	},
];

const save = () =>
	SplitButtonRef.value.$el.querySelector(".p-splitbutton-dropdown").click();
</script>
