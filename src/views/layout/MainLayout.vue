<template>
	<ConfirmDialog />
	<div class="main-layout">
		<header class="header">
			<div class="header-left">
				<span>Arvan Challenge</span>
				<span>Welcome {{ username }}</span>
			</div>
			<button @click="onLogout" class="logout-button">Logout</button>
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
					<li><router-link to="/articles" exact>All Articles</router-link></li>
					<li><router-link to="/articles/new">New Article</router-link></li>
				</ul>
			</nav>
		</aside>

		<!-- Main Content -->
		<div class="content">
			<RouterView />
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

const username = "User"; // Use a reactive variable if dynamic updates are needed
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
}

.header-left {
	display: flex;
	gap: 15px;
	font-size: 18px;
}

.logout-button {
	background: none;
	border: 1px solid var(--dark-sky-blue);
	color: var(--dark-sky-blue);
	padding: 5px 10px;
	border-radius: 5px;
	cursor: pointer;
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
	top: 18px;
	right: 20px;
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
}

.sidebar h2 {
	margin: 0;
	padding: 10px 20px;
	font-size: 20px;
	font-weight: bold;
}

.sidebar nav ul {
	list-style: none;
	padding: 0;
}

.sidebar nav ul li {
	padding: 15px 20px;
}

.sidebar nav ul li a {
	color: white;
	text-decoration: none;
}

/* Main Content */
.content {
	margin-left: 250px;
	padding: 20px;
}

@media (max-width: 768px) {
	.sidebar {
		width: 100%;
		transform: translateX(-100%);
	}

	.sidebar-open {
		transform: translateX(0);
	}

	.content,
	.header {
		margin-left: 0;
	}

	.hamburger-menu {
		display: block;
	}
}
</style>
