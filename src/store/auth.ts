import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
	const isLoggedIn = ref(false);

	const setIsLoggedIn = (value: boolean) => {
		isLoggedIn.value = value;
	};

	return { isLoggedIn, setIsLoggedIn };
});
