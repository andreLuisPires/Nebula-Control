<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="col-12 text-center text-h5" v-if="brand.name">
          {{ brand.name}}
        </q-toolbar-title>
        <q-toolbar-title class="col-12 text-center text-h5" v-else>
          Controle De Estoque
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import useApi from "src/composables/UseApi";

export default defineComponent({
  name: "LoginLayout",

  setup() {
    const { getBrand, brand } = useApi()

    onMounted(() => {
      getBrand()
    })

    return {
      brand
    };
  },
});
</script>
