const { defineComponent, ref, onMounted, onBeforeUnmount } = Vue;

export default defineComponent({
  name: "BackToTop",
  setup() {
    const isVisible = ref(false);

    const updateVisibility = () => {
      isVisible.value = window.scrollY > 300;
    };

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    onMounted(() => {
      window.addEventListener("scroll", updateVisibility);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("scroll", updateVisibility);
    });

    return {
      isVisible,
      scrollToTop
    };
  },
  template: `
    <button
      v-if="isVisible"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-blue-500 bg-opacity-70 text-white shadow-lg backdrop-blur-md transition duration-300 hover:bg-opacity-100 hover:bg-blue-600"
    >
    回到頂部
    </button>
  `
});