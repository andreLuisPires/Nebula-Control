<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-md-4 col-xs-12 col-sm-6">
        <CardDashboard
          table="category"
          label="Categorias"
          icon="mdi-shape-outline"

        />
      </div>
      <div class="col-md-4 col-xs-12 col-sm-6">
        <CardDashboard
          table="product"
          label="Produtos"
          icon="mdi-archive"
        />
      </div>
    </div>
    <!-- <div v-if="user">
      <p>Olá, <b>{{ user.user_metadata.name }}</b>.</p>
    </div> -->
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'

export default defineComponent({
  name: 'PageMe',
  components: {
    CardDashboard: defineAsyncComponent(() => import('components/CardDashboard.vue'))
  },
  setup () {
    const { user } = useAuthUser()

    return {
      user
    }
  }
})
</script>
