<template>
	<div class="crete-article" ref="createArticleForm">
		<h2>New Article</h2>
		<Form @submit="onFormSubmit" :resolver v-slot="$form">
			<div class="section-wrapper">
				<section class="info">
					<customInput
						:errorMessage="$form.title?.error?.message"
						:invalid="$form.title?.invalid"
						label="Title"
						placeholder="Title"
						name="title"
					></customInput>
					<customInput
						label="Description"
						placeholder="Description"
						name="description"
					></customInput>
					<label for="textarea">Body</label>
					<Textarea
						name="body"
						style="resize: none"
						id="textarea"
						rows="5"
						cols="30"
						fluid
					/>
				</section>
				<section class="tag">
					<label for="tag">Tags</label>
					<InputGroup class="InputGroup">
						<InputText
							v-model="newTag"
							pt:root:class="pt-input"
							class="tag-input"
							name="tag"
							type="text"
							placeholder="New tag"
							fluid
							@keypress.enter="addTag"
						/>
						<InputGroupAddon :style="Boolean(newTag) ? 'display: block;' : ''">
							<Button @click="addTag" icon="pi pi-times" severity="secondary"
								><arrow />
							</Button>
						</InputGroupAddon>
					</InputGroup>
					<div class="tags-box" ref="tagsBox">
						<div v-for="tag in tags?.sort()">
							<Checkbox
								class="checkbox"
								size="small"
								v-model="selectedTags"
								:inputId="tag"
								name="tag"
								:value="tag"
							/>
							<label :for="tag">{{ tag }}</label>
						</div>
					</div>
				</section>
			</div>
			<Button type="submit" label="Submit" severity="info" :loading="isLoading" />
		</Form>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, useTemplateRef, Ref, toRaw } from "vue";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import { useArticleStore } from "@/store/articles";
import arrow from "@/components/arrow.vue";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";

const router = useRouter();
const toast = useToast();

const newTag = ref("");
const tags: Ref<string[]> = ref([]);
const selectedTags: Ref<string[]> = ref([]);
const tagsBox = useTemplateRef("tagsBox");
const createArticleForm = useTemplateRef("createArticleForm");

const store = useArticleStore();
const isLoading = ref(false);

const addTag = () => {
	if (newTag.value.trim() !== "") {
		tags.value.push(newTag.value);
		selectedTags.value.push(newTag.value);
		newTag.value = "";
	}
};
const resolver = zodResolver(
	z.object({
		title: z.string().min(1, { message: "Required field." }),
		description: z.string().optional(),
		body: z.string().optional(),
	})
);
const onFormSubmit = (e) => {
	if (e.valid) {
		const payload = { ...e.values, tagList: toRaw(selectedTags.value) };
		store
			.createBlog(payload, createArticleForm.value)
			.then(() => {
				toast.add({
					severity: "success",
					summary: "Success",
					detail: `Blog created successfully.`,
					life: 3000,
				});
				router.push("/articles");
			})
			.catch((err) => {
				console.error(err);
				toast.add({
					severity: "error",
					summary: "Error",
					detail: "Something goes wrong",
					life: 3000,
				});
			});
	}
};
onMounted(() => {
	store.getTags(tagsBox.value).then((data) => (tags.value = data.tags));
});
</script>
<style scoped>
.crete-article {
	padding: 0 10px;
}
h2 {
	font-size: 40px;
	font-weight: normal;
	line-height: 1.2;
}
.section-wrapper {
	display: flex;
}
section.info {
	width: 75%;
	margin-right: 30px;
}

Form > Button {
	margin: 20px 0 10px 0;
	border: solid 1px var(--water-blue);
	background-color: var(--water-blue);
	padding: 0 10px 2px;
}
.tags-box {
	border: 1px solid var(--p-inputtext-border-color);
	height: 325px;
	border-radius: 4px;
	overflow-y: scroll;
}
.checkbox {
	margin-left: 15px;
}
.checkbox + label {
	padding-left: 10px;
	translate: 0px 6px;
	display: inline-block;
}
.checkbox + label::first-letter {
	text-transform: capitalize;
}
.InputGroup {
	margin-bottom: 20px;
}
.tag-input + div.p-inputgroupaddon {
	display: none;
	height: 40px;
}

@media (max-width: 768px) {
	section.info {
		width: 100%;
	}
	.section-wrapper {
		flex-direction: column;
	}
}
</style>
