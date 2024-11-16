import { ElLoading } from "element-plus";
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/base.css";
import "element-plus/theme-chalk/el-overlay.css";
import { ofetch } from "ofetch";
import { enuStorageKey, storage } from "./storage";

enum APIMETHODSTYPES {
	GET = "get",
	DELETE = "delete",
	POST = "post",
	PUT = "put",
	PATCH = "patch",
}

type ApiRequestData = {
	url: string;
	method: APIMETHODSTYPES;
	body?: Record<string, unknown>;
	queryParams?: Record<string, any>; // Added queryParams field
	element?: HTMLElement;
};

const useApi = (data: ApiRequestData) =>
	new Promise((resolve, reject) => {
		const loadingInstance = ElLoading.service(
			data.element ? { target: data.element } : { fullscreen: true }
		);

		let url = data.url.startsWith("http")
			? data.url
			: import.meta.env.VITE_BASE_URL + `${data.url}`;

		// Add query parameters to the URL for GET requests
		if (data.method === APIMETHODSTYPES.GET && data.queryParams) {
			const queryString = new URLSearchParams(data.queryParams).toString();
			if (queryString) {
				url += `?${queryString}`;
			}
		}

		ofetch(url, {
			method: data.method,
			body: data.body,
			headers: { Authorization: `Token ${storage.get(enuStorageKey.token)}` },
		})
			.then((res: unknown) => {
				resolve(res);
			})
			.catch((err) => reject(err.data))
			.finally(() => {
				loadingInstance.close();
			});
	});

export const api = {
	get: (
		url: string,
		queryParams?: Record<string, unknown>,
		element?: HTMLElement
	) => useApi({ url, method: APIMETHODSTYPES.GET, queryParams, element }),
	delete: (
		url: string,
		queryParams?: Record<string, unknown>,
		element?: HTMLElement
	) => useApi({ url, method: APIMETHODSTYPES.DELETE, queryParams, element }),
	post: (url: string, body: Record<string, unknown>, element?: HTMLElement) =>
		useApi({ url, method: APIMETHODSTYPES.POST, body, element }),
	put: (url: string, body: Record<string, unknown>, element?: HTMLElement) =>
		useApi({ url, method: APIMETHODSTYPES.PUT, body, element }),
	patch: (url: string, body: Record<string, unknown>, element?: HTMLElement) =>
		useApi({ url, method: APIMETHODSTYPES.PATCH, body, element }),
};
