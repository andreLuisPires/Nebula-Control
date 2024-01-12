<template>
    <q-page padding>
    <q-form class="row justify-center q-pt-xl" @submit.prevent="handlePasswordReset">
      <p class="col-12 text-h5 text-center">Redefinir Senha</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">

        <q-input 
            label="Nova senha" 
            outlined 
            v-model="password" 
        />

        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Enviar Email"
            color="primary"
            class="full-width"
            outline
            rounded
            type="submit"
          />

          <!-- <q-btn
            label="Voltar"
            color="primary"
            class="full-width"
            rounded
            flat
            :to="{ name: 'login' }"
            size="sm"
          /> -->
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter, useRoute } from 'vue-router'
import router from 'src/router'



export default defineComponent({
    name: 'PageResetPassword',
    setup() {
        const { resetPassword } = useAuthUser()
        const router = useRouter()
        const route = useRoute()
        const token = route.query.token

        const password = ref('')

        const handlePasswordReset = async () => {
            await resetPassword(token, password.value)
            router.push({ name: 'login'})
        }

        return {
            password,
            handlePasswordReset
        }
    },
})
</script>
