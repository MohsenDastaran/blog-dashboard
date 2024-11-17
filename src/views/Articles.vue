<template>
  <div ref="articles-container">
    <h2>All Posts</h2>
    <DataTable
      :value="articles"
      :rows="rowsNumber"
      scrollable
      scrollHeight="65vh"
      :pt="{
        root: { style: 'height: 70vh;' },
      }"
    >
      <Column header="#">
        <template #body="{ index }">
          {{
            (router.currentRoute.value.params.page - 1) * rowsNumber +
              index +
              1 || index + 1
          }}
        </template>
      </Column>
      <Column field="title" header="Title" style="max-width: 20rem"></Column>
      <Column
        field="author.username"
        header="Author"
        style="max-width: 10rem"
      ></Column>
      <Column field="tagList" header="Tags"
        ><template #body="{ data }">
          <Tag
            style="margin: 0 3px 3px"
            severity="info"
            v-for="eachTag in data.tagList.slice(0, 10)"
            :value="eachTag"
            >{{ eachTag }}</Tag
          > <span v-if="data.tagList.length > 10">...</span>
        </template></Column
      >
      <Column field="body" header="Excerpt" style="max-width: 55rem"
        ><template #body="{ data }">
          {{ getFirst20Words(data.body) }}
        </template></Column
      >
      <Column field="createdAt" header="Created" style="min-width: 15rem"
        ><template #body="{ data }">
          {{ formatDate(data.createdAt) }}
        </template></Column
      >
      <Column header="Action"
        ><template #body="{ data }">
          <ActionButton
            @edit="onEdit(data)"
            @delete="onDelete(data)"
          /> </template
      ></Column>
    </DataTable>
    <Paginator
      ref="Paginator"
      :template="{
        '960px': ' PrevPageLink CurrentPageReport NextPageLink ',
        default: 'PrevPageLink PageLinks NextPageLink   ',
      }"
      :rows="rowsNumber"
      :totalRecords="totalCount"
      @page="onPageChange"
    >
    </Paginator>
  </div>
</template>

<script setup>
import { ref, onMounted, useTemplateRef } from "vue";
import { useArticleStore } from "@/store/articles";
import Tag from "primevue/tag";
import router from "@/router";
import ActionButton from "@/components/ActionButton.vue";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
const confirm = useConfirm();

const rowsNumber = 10;
const toast = useToast();

const articlesContainer = useTemplateRef("articles-container");
const paginatorRef = useTemplateRef("Paginator");
const store = useArticleStore();

const articles = ref([]);
const totalCount = ref(0);

function getFirst20Words(str) {
  const words = str.split(/\s+/);
  return words.length <= 20 ? str : words.slice(0, 20).join(" ") + " ...";
}
const onPageChange = (data) => {
  if (data.page) router.push(`/articles/page/${data.page + 1}`);
  else router.push("/articles");

  fetchArticles(data.page * rowsNumber);
};
const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const fetchArticles = (offset) => {
  store
    .getArticles(offset, articlesContainer.value)
    .then((incomingArticles) => {
      articles.value = incomingArticles.articles;
      totalCount.value = incomingArticles.articlesCount;
    });
};

const onEdit = (info) => {
  store.setArticleForEdit(info);
  router.push(`/Articles/edit/${info.slug}`);
};
const onDelete = (info) => {
  confirm.require({
    message: "Are you sure to delete Article?",
    header: "Delete Article",
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
      store
        .deleteArticle(info.slug, articlesContainer.value)
        .then(() => {
          toast.add({
            severity: "success",
            detail: "Article deleted successfuly",
            life: 3000,
          });
          fetchArticles();
        })
        .catch((err) => {
          toast.add({
            severity: "error",
            summary: "Error",
            detail: err?.message || "Something went wrong",
            life: 3000,
          });
        });
    },
  });
};

const observePagination = () => {
  if (!paginatorRef.value) return;

  const observer = new MutationObserver(() => {
    const targetButton =
      paginatorRef.value.$el.querySelectorAll(".p-paginator-page");
    targetButton[router.currentRoute.value.params.page - 1].click();

    observer.disconnect(); // Stop observing once the element is found
  });

  observer.observe(paginatorRef.value.$el, { childList: true, subtree: true });
};
onMounted(() => {
  // Wait for the DOM to be fully updated
  if (router.currentRoute.value.params.page) observePagination();
  fetchArticles();
});
</script>
