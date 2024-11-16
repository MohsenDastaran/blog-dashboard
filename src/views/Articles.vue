<template>
	<div class="article" ref="articles-container">
		<h2>All Posts</h2>
		<DataTable :value="articles" :rows="5">
			<Column header="#">
				<template #body="{ index }">
					{{ index + 1 }}
				</template>
			</Column>
			<Column field="title" header="Title"></Column>
			<Column field="author.username" header="Author"></Column>
			<Column field="tagList" header="Tags"></Column>
			<Column field="body" header="Excerpt"
				><template #body="{ data }">
					{{ getFirst20Words(data.body) }}
				</template></Column
			>
			<Column field="createdAt" header="Created"
				><template #body="{ data }">
					{{ formatDate(data.createdAt) }}
				</template></Column
			>
		</DataTable>
		<Paginator
			ref="Paginator"
			:template="{
				'960px': ' PrevPageLink CurrentPageReport NextPageLink ',
				default: 'PrevPageLink PageLinks NextPageLink   ',
			}"
			:rows="rowsNumber"
			:totalRecords="totalCount"
			@page="onPageChange"
		>
		</Paginator>
	</div>
</template>

<script setup>
import { ref, onMounted, onUpdated, useTemplateRef, nextTick } from "vue";
import { useArticleStore } from "@/store/articles";
import router from "@/router";
const rowsNumber = 10;
const articlesContainer = useTemplateRef("articles-container");
const paginatorRef = useTemplateRef("Paginator");
const store = useArticleStore();

const articles = ref([]);
const totalCount = ref(0);

function getFirst20Words(str) {
	const words = str.split(/\s+/);
	return words.length <= 20 ? str : words.slice(0, 20).join(" ") + " ...";
}
const onPageChange = (data) => {
	if (data.page) router.push(`/articles/page/${data.page + 1}`);
	else router.push("/articles");
	console.log(data.page, rowsNumber, data.page * rowsNumber);

	fetchArticles(data.page * rowsNumber);
};
const formatDate = (date) =>
	new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

const fetchArticles = (offset) => {
	store.getArticles(offset, articlesContainer.value).then((incomingArticles) => {
		articles.value = incomingArticles.articles;
		totalCount.value = incomingArticles.articlesCount;
	});
};
const observePagination = () => {
	if (!paginatorRef.value) return;

	const observer = new MutationObserver(() => {
		const targetButton =
			paginatorRef.value.$el.querySelectorAll(".p-paginator-page");
		targetButton[router.currentRoute.value.params.page - 1].click();

		observer.disconnect(); // Stop observing once the element is found
	});

	observer.observe(paginatorRef.value.$el, { childList: true, subtree: true });
};
onMounted(() => {
	// Wait for the DOM to be fully updated
	if (router.currentRoute.value.params.page) observePagination();
	fetchArticles();
});
</script>
