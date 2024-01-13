<template>
  <q-page padding>
    <q-form class="row justify-center q-pt-xl" @submit.prevent="handleRegister">
      <p class="col-12 text-h5 text-center">Cadastrar</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-xs">
        <q-input 
          label="Nome" 
          outlined 
          v-model="form.name"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'O Nome é obrigatório.']"
        />
        <q-input 
          label="Email" 
          outlined 
          v-model="form.email" 
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'O Email é obrigatório.']"
          type="email"
        />
        <q-input 
          label="Senha" 
          outlined 
          v-model="form.password"
          lazy-rules
          :rules="[val => (val && val.length >= 6) || 'A Senha é obrigatório, mínimo de seis caracteres.']"
        />
        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Registrar-se"
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
import { defineComponent, ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import { useRouter } from "vue-router";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "RegisterPage",

  setup() {
    const router = useRouter();
    const { register } = useAuthUser();
    const { notifyError,notifySucess } = useNotify()

    const form = ref({
      name: '',
      email: '',
      password: '',
    });

    const handleRegister = async () => {
      try {
        await register(form.value);
        notifySucess('Cadastrado com sucesso!')
        router.push({
          name: "email-confirmation",
          query: { email: form.value.email }
        });
      } catch (error) {
        notifyError(error.message)
      }
    };

    return {
      form,
      handleRegister,
    };
  },
});
</script>
