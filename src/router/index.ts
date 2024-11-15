import { useAuthStore } from "@/store/auth";
import { createRouter, createWebHistory } from "vue-router";
import type {
	RouteLocationNormalized,
	RouteLocationNormalizedLoaded,
	NavigationGuardNext,
} from "vue-router";

function createRoute(name: string, isChild: boolean = false) {
	return {
		path: isChild ? "" : "/" + name.toLowerCase(),
		name,
		alias: `/${name.toLowerCase()}`,
	};
}
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	strict: true,
	routes: [
		{
			name: "auth",
			path: "/auth",
			component: () => import("@/views/layout/AuthLayout.vue"),
			children: [
				{
					...createRoute("Register", true),
					component: () => import("@/views/auth/Register.vue"),
				},
				{
					...createRoute("Login", true),
					component: () => import("@/views/auth/Login.vue"),
				},
			],
		},
		{
			...createRoute(""),
			redirect: { name: "Articles" },
			component: () => import("@/views/layout/MainLayout.vue"),

			children: [
				{
					...createRoute("Articles"),
					component: () => import("@/views/Articles.vue"),
				},
			],
		},
		{
			path: "/NotFound",
			name: "NotFound",
			component: () => import("@/views/error/NotFound.vue"),
		},
		{ path: "/:pathMatch(.*)*", redirect: { name: "NotFound" } },
	],
});

router.beforeEach(
	(
		to: RouteLocationNormalized,
		_from: RouteLocationNormalizedLoaded,
		next: NavigationGuardNext
	) => {
		const authStore = useAuthStore();

		// Check if the user is logged in
		if (authStore.isLoggedIn || to.name === "NotFound") {
			if (to.path === "/") next("/Articles");
			next();
		} else {
			const matched = to.matched.map((r) => r.name);
			if (matched.includes("auth")) {
				next();
			} else {
				next("/login");
			}
		}
	}
);

export default router;
