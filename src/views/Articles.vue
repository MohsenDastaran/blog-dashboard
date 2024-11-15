<template>
	<div class="article" ref="createArticleForm">
		<h2>All Posts</h2>
		<DataTable
			:value="customers"
			paginator
			:rows="5"
			:rowsPerPageOptions="[5, 10, 20, 50]"
			tableStyle="min-width: 50rem"
		>
			<Column field="name" header="Name" style="width: 25%"></Column>
			<Column field="country.name" header="Country" style="width: 25%"></Column>
			<Column field="company" header="Company" style="width: 25%"></Column>
			<Column
				field="representative.name"
				header="Representative"
				style="width: 25%"
			></Column>
		</DataTable>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const customers = ref([
	{
		id: 1000,
		name: "James Butt",
		country: {
			name: "Algeria",
			code: "dz",
		},
		company: "Benton, John B Jr",
		date: "2015-09-13",
		status: "unqualified",
		verified: true,
		activity: 17,
		representative: {
			name: "Ioni Bowcher",
			image: "ionibowcher.png",
		},
		balance: 70663,
	},
	{
		id: 1000,
		name: "James Butt",
		country: {
			name: "Algeria",
			code: "dz",
		},
		company: "Benton, John B Jr",
		date: "2015-09-13",
		status: "unqualified",
		verified: true,
		activity: 17,
		representative: {
			name: "Ioni Bowcher",
			image: "ionibowcher.png",
		},
		balance: 70663,
	},
]);
</script>
