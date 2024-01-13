<template>
    <q-page padding>
    <q-form class="row justify-center q-pt-xl" @submit.prevent="handlePasswordReset">
      <p class="col-12 text-h5 text-center">Redefinir Senha</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-xs">

        <q-input 
            label="Nova senha" 
            outlined 
            v-model="password"
            lazy-rules
          :rules="[val => (val && val.length >= 6) || 'A Senha é obrigatório, mínimo de seis caracteres.']"
        />

        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Atualizar Senha"
            color="primary"
            class="full-width"
            outline
            rounded
            type="submit"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from "src/composables/UseNotify";
import { useRouter, useRoute } from 'vue-router'



export default defineComponent({
    name: 'PageResetPassword',
    setup() {
        const { resetPassword } = useAuthUser()
        const { notifyError,notifySucess } = useNotify()
        const router = useRouter()
        const route = useRoute()
        const token = route.query.token

        const password = ref('')

        const handlePasswordReset = async () => {
          try {
            await resetPassword(token, password.value)
            notifySucess('Senha atualizada!')
            router.push({ name: 'login'})
          } catch (error) {
            notifyError(error.message)
          }
        }

        return {
            password,
            handlePasswordReset
        }
    },
})
</script>
