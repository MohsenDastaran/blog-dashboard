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
	const getTags = (element: HTMLElement) => {
		if (tags.value.length) {
			return Promise.resolve({ tags: tags.value });
		}

		// If not, make the API call and return the promise
		return api.get("tags", {}, element).then((data) => {
			tags.value = data.tags;
			return data; // Or return data.tags if you only need the tags array
		});
	};
	// const loginUser = (payload: IntUserRequest) =>
	// 	api.post("users/login", { user: payload }).then((data: { user: IntUser }) => {
	// 		return data;
	// 	});

	return { getTags, createBlog, tags };
});
