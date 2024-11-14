import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "@/utils/api";
import { enuStorageKey, storage } from "@/utils/storage";

export interface IntUserRequest extends Record<string, unknown> {
	email: string;
	password: string;
	username: string;
}
interface IntUser {
	id: number;
	email: string;
	username: string;
	bio: string;
	image: string;
	token: string;
}

export const useAuthStore = defineStore("auth", () => {
	const isLoggedIn = ref(false);

	const setIsLoggedIn = (value: boolean) => {
		isLoggedIn.value = value;
	};

	const registerUser = (payload: IntUserRequest) =>
		api.post("users", { user: payload }).then((data: IntUser) => {
			storage.set({ key: enuStorageKey.token, value: data.token });
			const { token, ...userWithoutToken } = data;
			storage.set({ key: enuStorageKey.user, value: userWithoutToken });
			return data;
		});

	return { isLoggedIn, setIsLoggedIn, registerUser };
});
