import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "@/utils/api";

export interface IntUser extends Record<string, unknown> {
	email: string;
	password: string;
	username: string;
}

export const useAuthStore = defineStore("auth", () => {
	const isLoggedIn = ref(false);

	const setIsLoggedIn = (value: boolean) => {
		isLoggedIn.value = value;
	};

	const registerUser = (payload: IntUser) => {
		return api.post("users", { user: payload });
	};

	return { isLoggedIn, setIsLoggedIn, registerUser };
});
