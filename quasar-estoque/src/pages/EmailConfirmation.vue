<template>
  <q-page padding>
    <p class="text-center q-pa-xs text-body1"><b>Obrigado por se Registrar!</b></p>
    <p class="">
      Por favor confirme o seu email para finalizar o registro <b>{{ $route.query.email }}</b>
    </p>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageEmailConfirmation'
})
</script>
