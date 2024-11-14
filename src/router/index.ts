import { createRouter, createWebHistory } from "vue-router";
import type {
	RouteLocationNormalized,
	RouteLocationNormalizedLoaded,
	NavigationGuardNext,
} from "vue-router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	strict: true,
	routes: [
		{
			path: "/",
			component: () => import("@/views/auth/AuthLayout.vue"),
			children: [
				{
					path: "register",
					name: "Register",
					component: () => import("@/views/auth/Register.vue"),
					alias: "/register",
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
		// @check login status
		if (true) {
			next();
		} else {
			next("/login");
		}
	}
);

export default router;
