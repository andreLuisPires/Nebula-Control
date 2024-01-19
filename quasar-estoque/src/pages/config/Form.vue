<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">Cadastro de Configurações</p>
      </div>
      <q-form
        class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md"
        @submit.prevent="handleSubmit"
      >
        <q-input
          label="Nome da Loja"
          v-model="form.name"
          outlined
          :rules="[(val) => (val && val.length > 0) || 'O Nome da loja é obrigatório.']"
        />

        <q-input
          label="Número da loja"
          v-model="form.phone"
          outlined
          mask="(##) #####-####"
          unmasked-value
          :rules="[(val) => (val && val.length > 0) || 'O Número é obrigatório.']"
        />

        <div class="row justify-center q-gutter-md q-pa-md">
            <q-color v-model="form.primary" class="col-md-4 col-sm-12 col-xs-12" />
            <q-color v-model="form.secondary" class="col-md-4 col-sm-12 col-xs-12" />
        </div>

        <q-btn
          label="Salvar"
          color="primary"
          class="full-width"
          rounded
          type="submit"
        />

        <q-btn
          label="Cancelar"
          color="primary"
          class="full-width"
          rounded
          flat
          :to="{ name: 'category' }"
        />
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";
import UseBrand from 'src/composables/UseBrand'

export default defineComponent({
  name: "PageFormConfig",
  setup() {
    const table = "config";
    const router = useRouter();
    const { post, list, update } = useApi();
    const { notifyError, notifySucess } = useNotify();
    const { setBrand } = UseBrand()

    let config = {};
    const form = ref({
      name: "",
      phone: '',
      primary: '',
      secondary: ''
    });

    onMounted(() => {
      handleGetConfig()
    });

    const handleSubmit = async () => {
      try {
        if (form.value.id) {
          await update(table, form.value);
          notifySucess("Atualizado com sucesso!");
        } else {
          await post(table, form.value);
          notifySucess("Cadastrado com sucesso!");
        }
        setBrand(form.value.primary, form.value.secondary)
        router.push({ name: "me" });
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handleGetConfig = async () => {
      try {
        config = await list(table)
        form.value = config[0]
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      handleSubmit,
      form
    };
  },
});
</script>
