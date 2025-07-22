const { defineComponent, ref, onMounted } = Vue;
import { BASE_URL } from "../utils/baseUrl.js";

export default defineComponent({
  name: "AboutPage",
  setup() {
    const profile = ref({
      name: "Li-Cheng Hsu | 許立晟",
      image: BASE_URL + "images/about/me.JPG",
      title: "Backend Developer | 技術部落格作者",
      bio: "熱愛後端架構設計，擅長整合 Spring Boot、Vue 與容器技術," +
      "打造可部署的服務。",
      links: [
        {
          name: "GitHub",
          url: "https://github.com/lichenghsu",
          icon: BASE_URL + "images/github-mark-white.svg",
          label: "GitHub Profile",
        },
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/lichengxu053/",
          icon: BASE_URL + "images/linkedin-svgrepo-com.svg",
          label: "LinkedIn Profile",
        },
        {
          name: "Email",
          url: "mailto:lichengxu053@gmail.com",
          icon: BASE_URL + "images/icons8-gmail-480.svg",
          label: "lichengxu053@gmail.com",
        },
      ],
    });

    return {
      profile,
    };
  },

  template: `
<div class="about max-w-xl mx-auto p-6 text-center">
<h1 class="text-3xl font-bold mb-4">{{ profile.title }}</h1>
<br />

  <img src="https://github-readme-stats.vercel.app/api?username=lichenghsu&show_icons=true&theme=dark" class="w-full rounded-xl mb-6" />

  <h1 class="text-2xl font-bold mb-2">{{ profile.name }}</h1>
  <p class="mb-4">{{ profile.bio }}</p>

    <img
      :src="profile.image"
      alt="Profile"
      class="w-40 h-40 rounded-full object-cover mx-auto"
      style="width: 300px; height: 300px; border-radius: 50%; object-fit: cover; display: block; margin: auto;"
    />

  <div class="flex flex-wrap gap-2 mt-4">
    <img src="https://img.shields.io/github/followers/lichenghsu?label=followers&style=social" />
    <img src="https://img.shields.io/github/stars/lichenghsu/pet-shop-backend-rest-api?style=flat-square" />
    <img src="https://img.shields.io/badge/springboot-ready-brightgreen" />
    <img src="https://img.shields.io/badge/vue3-SPA-blue" />
    <img src="https://img.shields.io/badge/proxmox-lxc-orange" />
  </div>

 <div class="mt-6">
  <h3 class="text-xl font-bold mb-4 flex items-center justify-center gap-2">
    我的開發者連結
  </h3>


  <div class="flex flex-col items-center gap-4">
    <a
      v-for="link in profile.links"
      :key="link.name"
      :href="link.url"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center gap-3 px-4 py-2 w-full max-w-xs rounded-lg bg-gray-800 hover:bg-gray-700 shadow text-white"
    >
      <img :src="link.icon" style="width: 24px; height: 24px;" />
      <span class="text-sm">{{ link.name }}</span>
    </a>
  </div>
</div>
<div>`,
});
