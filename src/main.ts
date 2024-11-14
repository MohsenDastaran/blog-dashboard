import { createApp } from "vue";
import "@/assets/style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import router from "./router";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);

app.mount("#app");
createApp(App)
	.use(router)
	.use(pinia)
	.use(PrimeVue, {
		theme: {
			preset: Aura,
			options: {
				darkModeSelector: false || "none",
			},
		},
	})
	.mount("#app");
