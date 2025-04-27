import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/externos",
  },
  {
    path: "/externos",
    name: "Externos",
    component: () => import("@/views/ExternosView.vue"),
    meta: {
      title: "Aspectos Externos - ELEGABAT Analytics"
    }
  },
  {
    path: "/internos",
    name: "Internos",
    component: () => import("@/views/InternosView.vue"),
    meta: {
      title: "Aspectos Internos - ELEGABAT Analytics"
    }
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Añadir esto para ayudar con la depuración y cambiar el título de la página
router.beforeEach((to, from, next) => {
  console.log(`Navegando de ${from.path} a ${to.path}`);
  
  // Actualizar el título de la página
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  
  next();
});

export default router;