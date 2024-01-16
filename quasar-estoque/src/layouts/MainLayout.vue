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
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import useAuthUser from "src/composables/UseAuthUser";
import { useRouter } from "vue-router";
import { useQuasar } from 'quasar'

const linksList = [
  {
    title: 'Home',
    caption: '',
    icon: 'mdi-home',
    routeName: 'me',
  },
  {
    title: 'Category',
    caption: '',
    icon: 'mdi-shape-outline',
    routeName: 'category',
  }
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const { user, logout } = useAuthUser();
    const router = useRouter()
    const $q = useQuasar()

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
