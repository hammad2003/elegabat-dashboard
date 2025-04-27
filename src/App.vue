<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-content>
          <div class="menu-header">
            <div class="logo">ELEGABAT Analytics</div>
            <div class="subtitle">Plataforma de Inteligencia de Apuestas</div>
          </div>
          
          <ion-list id="inbox-list" lines="none">
            <ion-menu-toggle auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item
                @click="selectedIndex = i"
                router-direction="root"
                :router-link="p.url"
                detail="false"
                class="menu-item"
                :class="{ selected: selectedIndex === i }"
              >
                <ion-icon
                  slot="start"
                  :ios="p.iosIcon"
                  :md="p.mdIcon"
                ></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
          
          <div class="menu-footer">
            <div class="version">v2.0.0</div>
            <div class="copyright">© 2025 ELEGABAT</div>
          </div>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script setup>
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonSplitPane,
} from "@ionic/vue";
import { ref, watch } from "vue";
import { useRoute } from 'vue-router';
import { 
  barChartOutline, 
  barChartSharp, 
  pieChartOutline, 
  pieChartSharp
} from "ionicons/icons";

const selectedIndex = ref(0);
const route = useRoute();

const appPages = [
  {
    title: "Aspectos Externos",
    url: "/externos",
    iosIcon: barChartOutline,
    mdIcon: barChartSharp,
  },
  {
    title: "Aspectos Internos",
    url: "/internos",
    iosIcon: pieChartOutline,
    mdIcon: pieChartSharp,
  }
];

// Actualizar el índice seleccionado basado en la ruta actual
watch(() => route.path, (path) => {
  const index = appPages.findIndex(page => page.url === path);
  if (index !== -1) {
    selectedIndex.value = index;
  }
}, { immediate: true });
</script>

<style scoped>
/* Estilos del menú */
.menu-header {
  padding: 24px 16px;
  background-color: var(--ion-color-primary);
  color: white;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.menu-header .logo {
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.menu-header .subtitle {
  font-size: 0.8rem;
  opacity: 0.9;
  margin-top: 6px;
}

ion-menu ion-content {
  --background: #f5f7fa;
}

#inbox-list {
  margin: 16px 0;
  background: transparent;
}

.menu-item {
  margin: 0 12px 8px 12px;
  border-radius: 8px;
  --background: transparent;
  --color: var(--ion-color-dark);
  font-weight: 500;
  transition: all 0.2s ease;
  --padding-start: 12px;
  --inner-padding-end: 12px;
}

.menu-item:hover {
  --background: rgba(var(--ion-color-primary-rgb), 0.1);
}

.menu-item.selected {
  --background: var(--ion-color-primary);
  --color: white;
  font-weight: 600;
}

.menu-item.selected ion-icon {
  color: white;
}

.menu-item ion-icon {
  color: var(--ion-color-primary);
  margin-right: 12px;
  font-size: 1.2rem;
}

.menu-footer {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
  color: var(--ion-color-medium);
  font-size: 0.75rem;
  padding: 0 16px;
}

.menu-footer .version {
  margin-bottom: 4px;
  font-weight: 500;
}

.menu-footer .copyright {
  opacity: 0.8;
}

/* Animaciones */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.ion-page {
  animation: fadeIn 0.3s ease-out;
}

/* Responsive */
@media (max-width: 768px) {
  .menu-header {
    padding: 18px 12px;
  }
  
  .menu-header .logo {
    font-size: 1.2rem;
  }
  
  .menu-item {
    margin: 0 8px 6px 8px;
    --padding-start: 8px;
    --inner-padding-end: 8px;
  }
}
</style>