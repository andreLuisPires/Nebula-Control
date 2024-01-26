import { defineComponent, defineAsyncComponent } from "vue";
import useAuthUser from "src/composables/UseAuthUser";

export default defineComponent({
  name: "PageMe",
  components: {
    CardDashboard: defineAsyncComponent(() =>
      import("components/CardDashboard.vue")
    ),
  },
  setup() {
    const { user } = useAuthUser();

    const teste = () => {
      router.push({ name: "category" });
    };

    return {
      user,
      teste,
    };
  },
});
