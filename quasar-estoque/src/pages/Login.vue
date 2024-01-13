<template>
  <q-page padding>
    <q-form class="row justify-center q-pt-xl" @submit.prevent="handleLogin">
      <p class="col-12 text-h5 text-center">Login</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-xs">
        <q-input 
          label="Email" 
          v-model="form.email" 
          outlined
          type="email"
          lazy-rules
          :rules="[val => (val && val.length > 10) || 'O Email é obrigatório.']"
        />
        <q-input
          label="Senha"
          v-model="form.password"
          outlined
          :type="isPwd ? 'password' : 'text'"
          lazy-rules
          :rules="[val => (val && val.length >= 6) || 'A Senha é obrigatório.']"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <div class="full-width q-pt-md q-mb-md">
          <q-btn
            label="Login"
            color="primary"
            class="full-width"
            outline
            rounded
            type="submit"
          />
        </div>
        <div class="full-width q-gutter-y-sm">
          <q-btn
            label="Registrar-se"
            color="primary"
            class="full-width"
            rounded
            flat
            to="/register"
            size="sm"
          />
          <q-btn
            label="Esqueceu a senha?"
            color="primary"
            class="full-width"
            rounded
            flat
            :to="{ name: 'forgot-password'}"
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
  name: "PageLogin",

  setup() {
    const router = useRouter();
    const { login } = useAuthUser();
    const { notifyError } = useNotify()

    const form = ref({
      email: "",
      password: "",
    });

    const handleLogin = async () => {
      try {
        await login(form.value);
        router.push({ name: "me" });
      } catch (error) {
        notifyError(error.message)
      }
    };

    return {
      form,
      handleLogin,
      password: ref(""),
      isPwd: ref(true),
    };
  },
});
</script>
