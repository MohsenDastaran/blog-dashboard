import { createRouter, createWebHistory } from "vue-router";
import type {
	RouteLocationNormalized,
	RouteLocationNormalizedLoaded,
	NavigationGuardNext,
} from "vue-router";
import AuthLayout from "@/views/auth/AuthLayout.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	strict: true,
	routes: [
		{
			path: "/",
			component: AuthLayout,
			children: [
				{
					path: "register",
					name: "Register",
					component: () => import("@/views/auth/Register.vue"),
					alias: "/register",
				},
			],
		},
		{ path: "/:pathMatch(.*)*", redirect: { name: "Error" } },
	],
});

router.beforeEach(
	(
		to: RouteLocationNormalized,
		_from: RouteLocationNormalizedLoaded,
		next: NavigationGuardNext
	) => {
		// @check login status
		if (true) {
			next();
		} else {
			next("/login");
		}
	}
);

export default router;
