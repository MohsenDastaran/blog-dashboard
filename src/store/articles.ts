import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { api } from "@/utils/api";

export interface IntCreateArticle {
	title: string;
	description: string;
	body: string;
	tagList: string[];
}

export const useArticleStore = defineStore("article", () => {
	// const articles = ref([]);
	const tags: Ref<string[]> = ref([]);

	const createBlog = (payload: IntCreateArticle, element: HTMLElement) =>
		api.post("articles", { article: payload }, element);
	const getArticles = (offset, element: HTMLElement) =>
		api.get("articles/", { offset, limit: 10 }, element);

	const getTags = (element: HTMLElement) => {
		if (tags.value.length) {
			return Promise.resolve({ tags: tags.value });
		}

		return api.get("tags", {}, element).then((data: { tags: string[] }) => {
			tags.value = data.tags;
			return data;
		});
	};

	return { getTags, createBlog, tags, getArticles };
});
