<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">Cadastro de Produtos</p>
      </div>
      <q-form
        class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md"
        @submit.prevent="handleSubmit"
      >
        
        <q-input
          label="Imagem do produto"
          stack-label
          v-model="img"
          type="file"
          accept="image/*"
        />

        <q-input
          label="Nome do produto"
          v-model="form.name"
          :rules="[(val) => (val && val.length > 0) || 'O Nome é obrigatório.']"
          outlined
          dense
        />

        <q-editor 
          v-model="form.description" 
          min-height="5rem"
        />

        <q-input
          label="Quantidade"
          v-model="form.amount"
          :rules="[(val) => !!val || 'A Quantidade é obrigatório.']"
          type="number"
          outlined
          dense
        />

        <q-input
          label="Preço"
          v-model="form.price"
          :rules="[(val) => !!val || 'O Preço é obrigatório.']"
          prefix="R$"
          outlined
          dense
        />

        <q-select
          v-model="form.category_id"
          :options="optionsCategory"
          label="Categoria"
          option-value="id"
          option-label="name"
          map-options
          emit-value
          outlined
          dense
          :rules="[val => !!val || 'Selecione uma categoria.']"
        />

        <q-btn
          :label="isUpdate ? 'Atualizar' : 'Salvar'"
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
          :to="{ name: 'product' }"
        />
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";
import useAuthUser from "src/composables/UseAuthUser";

export default defineComponent({
  name: "PageFormCategory",
  setup() {
    const table = "product";
    const router = useRouter();
    const route = useRoute();
    const { post, getById, update, listPublic, uploadImg } = useApi();
    const { notifyError, notifySucess } = useNotify();
    const { user } = useAuthUser()

    const isUpdate = computed(() => route.params.id);

    let product = {};
    const optionsCategory = ref([])
    const form = ref({
      name: '',
      description: '',
      amount: 0,
      price: 0,
      category_id: '',
      img_url: ''
    });
    const img = ref([])

    onMounted(() => {
      handleListCategories()
      if (isUpdate.value) {
        handleGetProduct(isUpdate.value);
      }
    });

    const handleListCategories = async () => {
      optionsCategory.value = await listPublic('category', user.value.id)
    }

    const handleSubmit = async () => {
      try {
        if (img.value.length > 0) {
          const imgUrl = await uploadImg(img.value[0], 'products')
          form.value.img_url = imgUrl
        }
        if (isUpdate.value) {
          await update(table, form.value);
          notifySucess("Atualizado com sucesso!");
        } else {
          await post(table, form.value);
          notifySucess("Cadastrado com sucesso!");
        }
        router.push({ name: "product" });
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handleGetProduct = async (id) => {
      try {
        product = await getById(table, id);
        form.value = product;
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      handleSubmit,
      form,
      isUpdate,
      optionsCategory,
      img
    };
  },
});
</script>
