import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "@/utils/api";
import { enuStorageKey, storage } from "@/utils/storage";
import router from "@/router";

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
	const user = ref({});
	const token = ref("");

	const setIsLoggedIn = (value: boolean) => {
		isLoggedIn.value = value;
	};

	const setUserCredentialsInApp = (payload: IntUser) => {
		user.value = payload;
		token.value = payload.token;
		setIsLoggedIn(true);
	};
	const setUserCredentials = (payload: IntUser) => {
		setUserCredentialsInApp(payload);
		const { token, ...userWithoutToken } = payload;
		storage.set({ key: enuStorageKey.token, value: token });
		storage.set({ key: enuStorageKey.user, value: userWithoutToken });
	};
	const logoutUser = () => {
		setIsLoggedIn(false);
		user.value = {};
		storage.remove(enuStorageKey.token);
		storage.remove(enuStorageKey.user);
		router.push("/login");
	};

	const registerUser = (payload: IntUserRequest) =>
		api.post("users", { user: payload }).then((data: { user: IntUser }) => {
			setUserCredentials(data.user);
			return data;
		});
	const loginUser = (payload: IntUserRequest) =>
		api.post("users/login", { user: payload }).then((data: { user: IntUser }) => {
			setUserCredentials(data.user);
			return data;
		});

	return {
		isLoggedIn,
		setIsLoggedIn,
		registerUser,
		loginUser,
		logoutUser,
		setUserCredentials,
		setUserCredentialsInApp,
		user,
	};
});
