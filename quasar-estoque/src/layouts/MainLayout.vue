<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>Estoque</q-toolbar-title>

        <dark-mode-toogle />

        <q-btn-dropdown flat color="white" icon="person">
          <div class="column items-center q-pa-md q-">
            <q-avatar size="50px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="Foto de perfil" />
            </q-avatar>
            <div class="text-subtitle1 q-mt-md q-mb-xs">
              {{ user.user_metadata.name }}
            </div>

            <q-btn
              color="primary"
              label="Sair"
              push
              size="sm"
              v-close-popup
              @click="handleLogout"
            />
          </div>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition 
          appear
          enter-active-class="animated fadeInUp"
          leave-active-class="animated fadeOutDown"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import useAuthUser from "src/composables/UseAuthUser";
import { useRouter } from "vue-router";
import { useQuasar } from 'quasar'
import useApi from "src/composables/UseApi";
import DarkModeToogle from "src/components/DarkModeToggle.vue";


const linksList = [
  {
    title: 'Ínicio',
    caption: '',
    icon: 'mdi-home',
    routeName: 'me',
  },
  {
    title: 'Categoria',
    caption: '',
    icon: 'mdi-shape-outline',
    routeName: 'category',
  },
  {
    title: 'Produtos',
    caption: '',
    icon: 'mdi-archive',
    routeName: 'product',
  },
  {
    title: 'Configurações',
    caption: '',
    icon: 'mdi-cog',
    routeName: 'form-config',
  }
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
    DarkModeToogle
  },

  setup() {
    const leftDrawerOpen = ref(false);

    const { user, logout } = useAuthUser();
    const router = useRouter()
    const $q = useQuasar()
    const { getBrand } = useApi()

    onMounted(() => {
      getBrand()
    })

    const handleLogout = async () => {
      $q.dialog({
        title: 'Sair',
        message: 'Você realmente deseja sair?',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        await logout()
        router.replace({ name: 'login'})
      })
    }

    return {
      user,
      handleLogout,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
