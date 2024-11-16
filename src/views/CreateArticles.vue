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
					<div>
						<label for="textarea">Body</label>
						<Textarea
							name="body"
							style="resize: none; height: 190px"
							id="textarea"
							rows="5"
							cols="30"
							fluid
						/>
					</div>
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
							@keypress.enter.prevent="addTag"
						/>
						<InputGroupAddon :class="{ 'opacity-1': Boolean(newTag) }">
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

<script setup>
import { ref, onMounted, useTemplateRef, toRaw } from "vue";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import { useArticleStore } from "@/store/articles";
import arrow from "@/components/arrow.vue";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { objectMap } from "@/utils/objectMap";

const router = useRouter();
const toast = useToast();

const newTag = ref("");
const tags = ref([]);
const selectedTags = ref([]);
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
					summary: "Well done!",
					detail: ` Article created successfuly`,
					life: 3000,
				});
				router.push("/articles");
			})
			.catch((err) => {
				console.error(err);
				objectMap(err.errors, (value, key) => {
					toast.add({
						severity: "error",
						summary: key,
						detail: value[0] || "Something goes wrong",
						life: 3000,
					});
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
section.info > * {
	margin-bottom: 30px;
}

Form > Button {
	margin: 20px 0 10px 0;
	border: solid 1px var(--water-blue);
	background-color: var(--water-blue);
	padding: 10px 20px;
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
	padding: 5px 0 5px 15px;
	translate: 0px 16px;
	display: inline-block;
}
.checkbox + label::first-letter {
	text-transform: capitalize;
}
.InputGroup {
	margin-bottom: 20px;
	position: relative;
}
.tag-input + div.p-inputgroupaddon {
	display: block;
	position: absolute;
	right: 0;
	opacity: 0;
	height: 40px;
}
.opacity-1 {
	opacity: 1 !important;
}
.tag-input + div.p-inputgroupaddon > button {
	z-index: 1;
	border-left: 1px solid var(--el-border-color);
}

label {
	display: block;
	margin-bottom: 10px;
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
