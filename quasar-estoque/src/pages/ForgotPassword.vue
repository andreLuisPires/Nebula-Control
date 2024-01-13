<template>
  <q-page padding>
    <q-form class="row justify-center q-pt-xl" @submit.prevent="handleForgotPassword">
      <p class="col-12 text-h5 text-center">Redefinir Senha</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-xs">

        <q-input 
            label="Email" 
            outlined 
            v-model="email"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'O Email é obrigatório.']"
            type="email"
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

          <q-btn
            label="Voltar"
            color="primary"
            class="full-width"
            rounded
            flat
            :to="{ name: 'login' }"
            size="sm"
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

export default defineComponent({
    setup () {
        const { sendPasswordRestEmail } = useAuthUser()
        const email = ref('')
        const { notifyError,notifySucess } = useNotify()

        const handleForgotPassword = async () => {
          try {
            await sendPasswordRestEmail(email.value)
            notifySucess(`E-mail de redefinição de senha enviado para: ${email.value}`)
          } catch (error) {
            notifyError(error.message)
          }
        }

        return {
            email,
            handleForgotPassword
        }
    },
})
</script>

