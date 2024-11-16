import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { api } from "@/utils/api";

export interface IntCreateArticle {
	title: string;
	description: string;
	body: string;
	tagList: string[];
	slug?: string;
}
export interface IntArticle {
	slug: string;
	title: string;
	description: string;
	body: string;
	tagList: string[];
	createdAt: Date;
	updatedAt: Date;
	favorited: boolean;
	favoritesCount: number;
	author: Author;
}

export interface Author {
	username: string;
	bio: null;
	image: string;
	following: boolean;
}

export const useArticleStore = defineStore("article", () => {
	const articleForEdit: Ref<IntArticle | null> = ref(null);
	const tags: Ref<string[]> = ref([]);

	const setArticleForEdit = (article: IntArticle) => {
		articleForEdit.value = article;
	};
	const createArticle = (payload: IntCreateArticle, element: HTMLElement) =>
		api.post("articles", { article: payload }, element);
	const editArticle = (payload: IntCreateArticle, element: HTMLElement) =>
		api.put(`articles/${payload.slug}`, { article: payload }, element);

	const getArticles = (offset: number, element: HTMLElement) =>
		api.get("articles/", { offset: offset || 0, limit: 10 }, element);
	const getArticleBySlug = (slug: string, element: HTMLElement) =>
		api.get(`articles/${slug}`, {}, element);

	const deleteArticle = (slug: string, element: HTMLElement) =>
		api.delete(`articles/${slug}`, {}, element);

	const getTags = (element: HTMLElement) => {
		if (tags.value.length) {
			return Promise.resolve({ tags: tags.value });
		}

		return api.get("tags", {}, element).then((data: { tags: string[] }) => {
			tags.value = data.tags;
			return data;
		});
	};

	return {
		getTags,
		createArticle,
		tags,
		getArticles,
		deleteArticle,
		setArticleForEdit,
		articleForEdit,
		getArticleBySlug,
		editArticle,
	};
});
