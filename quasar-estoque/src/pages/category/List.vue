<template>
  <q-page padding>
    <div class="row">
      <q-table
        :rows="categories"
        :columns="columns"
        row-key="calories"
        class="col-12"
        :loading="loading"
      >
        <template v-slot:top>
          <span class="text-h6">
            Categoria
          </span>
          <q-space />
          <q-btn
            v-if="$q.platform.is.desktop"
            label="Adicionar"
            color="primary"
            icon="mdi-plus"
            dense
            :to="{ name: 'form-category'}"
          />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-xs">
            <q-btn icon="mdi-pencil-outline" color="info" dense size="sm" @click="handleEdit(props.row)">
              <q-tooltip>Editar</q-tooltip>
            </q-btn>
            <q-btn icon="mdi-delete-outline" color="negative" dense size="sm" @click="handleRemoveCategory(props.row)">
              <q-tooltip>Remover</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
    <q-page-sticky 
      position="bottom-right" 
      :offset="[18, 18]"
    >
      <q-btn 
        fab 
        icon="mdi-plus" 
        color="primary" 
        :to="{ name: 'form-category'}"
        v-if="$q.platform.is.mobile"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
const columns = [
  { name: "name", align: "left", label: "Name", field: "name", sortable: true },
  {
    name: "actions",
    align: "right",
    label: "Actions",
    field: "actions",
    sortable: true,
  },
];

import { defineComponent, ref, onMounted } from "vue";
import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";


export default defineComponent({
  name: "PageCategoryList",
  setup() {
    const categories = ref([])
    const loading = ref(true)
    const router = useRouter()
    const table = 'category'
    const $q = useQuasar()

    const { list, remove } = useApi()
    const { notifyError, notifySucess } = useNotify()

    const handleListCategories = async () => {
      try {
        loading.value = true
        categories.value = await list(table)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleEdit = (category) => {
      router.push({ name: 'form-category', params: { id: category.id } })
    }

    const handleRemoveCategory = async (category) => {
      try {
        $q.dialog({
          title: 'Confirme',
          message: `Deseja remover ${category.name} ?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(table, category.id)
          notifySucess('Deletado com sucesso!')
          handleListCategories()
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      handleListCategories()
    })

    return {
      columns,
      categories,
      loading,
      handleEdit,
      handleRemoveCategory
    };
  },
});
</script>