import { createApp } from "vue";
import "@/assets/style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import router from "./router";
import { createPinia } from "pinia";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";

const pinia = createPinia();

createApp(App)
	.use(router)
	.use(pinia)
	.use(ToastService)
	.use(ConfirmationService)
	.use(PrimeVue, {
		theme: {
			preset: Aura,
			options: {
				darkModeSelector: false || "none",
			},
		},
	})
	.mount("#app");
