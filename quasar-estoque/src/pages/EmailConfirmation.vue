<template>
  <q-page padding>
    <p class="text-center q-pa-xs text-body1"><b>Obrigado por se Registrar!</b></p>
    <p class="">
      Por favor confirme o seu email para finalizar o registro <b>{{ $route.query.email }}</b>
    </p>
    <div class="full-width q-mt-xl">
          <q-btn
            label="Login"
            color="primary"
            class="full-width"
            flat
            to="/login"
          />
        </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageEmailConfirmation'
})
</script>
