<template>
  <q-page padding>
    <div class="row">
      <q-table
        title="Category"
        :rows="rows"
        :columns="columns"
        row-key="calories"
        class="col-12"
      >
        <template v-slot:top>
          <span class="text-h6">
            Categoria
          </span>
          <q-space />
          <q-btn 
            label="Adicionar"
            color="primary"
          />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-xs">
            <q-btn icon="mdi-pencil-outline" color="info" dense size="sm">
              <q-tooltip>Editar</q-tooltip>
            </q-btn>
            <q-btn icon="mdi-delete-outline" color="negative" dense size="sm">
              <q-tooltip>Remover</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
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

const rows = [
  {
    id: "123",
    name: "Tênis",
  },
];

import { defineComponent } from "vue";

export default defineComponent({
  name: "PageCategoryList",
  setup() {
    return {
      columns,
      rows,
    };
  },
});
</script>