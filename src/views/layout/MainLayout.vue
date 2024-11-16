<template>
	<ConfirmDialog />
	<div class="main-layout">
		<header class="header">
			<div class="header-left">
				<h2>Arvan Challenge</h2>
				<span>Welcome {{ useAuthStore().user?.username }}</span>
			</div>
			<button @click="onLogout" class="logout-button desktop-only">Logout</button>
			<button
				@click="toggleSidebar"
				class="hamburger-menu"
				aria-label="Toggle sidebar"
			>
				<!-- SVG for the hamburger menu icon -->
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect y="4" width="24" height="2" rx="1" fill="currentColor" />
					<rect y="11" width="24" height="2" rx="1" fill="currentColor" />
					<rect y="18" width="24" height="2" rx="1" fill="currentColor" />
				</svg>
			</button>
		</header>

		<!-- Sidebar -->
		<aside :class="['sidebar', { 'sidebar-open': sidebarOpen }]">
			<h2>Post</h2>
			<nav>
				<ul>
					<li>
						<router-link
							:class="{ active: useRoute().name === 'Articles' }"
							to="/articles"
							exact
							>All Articles</router-link
						>
					</li>
					<li>
						<router-link
							:class="{ active: useRoute().name === 'CreateArticles' }"
							to="/articles/create"
							>New Article</router-link
						>
					</li>
				</ul>
			</nav>
			<!-- Logout button in sidebar for mobile view -->
			<button @click="onLogout" class="sidebar-logout mobile-only">Logout</button>
		</aside>

		<!-- Main Content -->
		<div class="content">
			<router-view v-slot="{ Component, route }">
				<Transition name="fade" mode="out-in">
					<!-- Ensure the key is correctly managed here -->
					<component :is="Component" :key="route.name"></component>
				</Transition>
			</router-view>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { enuStorageKey, storage } from "@/utils/storage";
import { useAuthStore } from "@/store/auth";
import { useConfirm } from "primevue/useconfirm";
import ConfirmDialog from "primevue/confirmdialog";
import { ref } from "vue";

const confirm = useConfirm();
const sidebarOpen = ref(false);

const toggleSidebar = () => {
	sidebarOpen.value = !sidebarOpen.value;
};

const onLogout = () => {
	confirm.require({
		message: "Are you sure about this? we don't want to see you go :(",
		header: "Logout",
		rejectProps: {
			label: "No",
			severity: "secondary",
			style: "padding: 0 15px 5px 15px",
			outlined: true,
		},
		acceptProps: {
			label: "Yes",
			severity: "danger",
		},
		accept: () => {
			useAuthStore().logoutUser();
		},
	});
};
</script>

<style scoped>
/* Header Styles */
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: var(--charcoal-grey);
	color: white;
	padding: 10px 20px;
	height: 60px;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 2;
}

.header-left {
	display: flex;
	align-items: baseline;
	gap: 15px;
	font-size: 18px;
}
.header-left h2 {
	font-size: 22px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	letter-spacing: normal;
}

.logout-button {
	background: none;
	border: 1px solid var(--dark-sky-blue);
	color: var(--dark-sky-blue);
	padding: 10px 20px;
	border-radius: 5px;
	cursor: pointer;
}

.desktop-only {
	display: block;
}

.mobile-only {
	display: none;
}

/* Hamburger Menu */
.hamburger-menu {
	background: none;
	border: none;
	color: var(--dark-sky-blue);
	display: none;
	font-size: 24px;
	position: absolute;
	z-index: 50;
	top: 15px;
	right: 17px;
	cursor: pointer;
}

.hamburger-menu svg {
	width: 24px;
	height: 24px;
}

/* Sidebar Styles */
.sidebar {
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 250px;
	background-color: var(--water-blue);
	color: white;
	margin-top: 60px;
	transition: transform 0.3s ease;
	z-index: 2;
}

.sidebar h2 {
	margin: 10px 0;
	padding: 10px 20px;
	font-size: 20px;
	font-weight: bold;
}

.sidebar nav ul {
	list-style: none;
	margin: 0;
	padding: 0;
}

/* .sidebar nav ul li {
	padding: 15px 20px;
} */

.sidebar nav ul li a {
	color: white;
	text-decoration: none;
	display: block;
	padding: 17px 10px 17px 40px;
	border-radius: 5px;
	transition: background-color 0.3s;
}

.sidebar nav ul li a.active {
	background-color: rgba(255, 255, 255, 0.2);
}
.sidebar nav ul li a:hover {
	background-color: rgba(255, 255, 255, 0.3);
}

.sidebar-logout {
	background: none;
	border: 1px solid white;
	color: white;
	padding: 10px;
	margin: 20px;
	border-radius: 5px;
	cursor: pointer;
	width: calc(100% - 40px);
	text-align: center;
	transition: background-color 0.3s;
}

.sidebar-logout:hover {
	background-color: rgba(255, 255, 255, 0.2);
}

/* Main Content */
.content {
	margin-left: 250px;
	margin-top: 60px;
	padding: 20px;
}

@media (max-width: 768px) {
	.sidebar {
		width: 100%;
		transform: translateX(-100%);
	}

	.sidebar-open {
		transform: translateX(-20%);
		padding-left: 20%;
	}

	.content,
	.header {
		margin-left: 0;
	}

	.hamburger-menu {
		display: block;
	}

	.desktop-only {
		display: none;
	}

	.mobile-only {
		display: block;
	}
	.header-left {
		font-size: 12px;
	}
	.header-left h2 {
		font-size: 16px;
	}
}
</style>
