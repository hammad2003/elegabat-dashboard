import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { IonicVue } from '@ionic/vue';
import VueApexCharts from 'vue3-apexcharts';

// Importaciones para ECharts
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { MapChart, PieChart, BarChart, LineChart } from 'echarts/charts';
import { 
  TitleComponent, 
  TooltipComponent, 
  VisualMapComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components';
import VChart from 'vue-echarts';

// Registrar componentes de ECharts
use([
  CanvasRenderer,
  MapChart,
  PieChart,
  BarChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
  LegendComponent,
  GridComponent
]);

// Importar Chart.js
import Chart from 'chart.js/auto';

// Registrar mapas
import { registerMaps } from './assets/register-maps';
registerMaps();

// Importar estilos
import '@ionic/vue/css/core.css';
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

// Importar tema personalizado
import './theme/variables.css';
import './theme/custom.css';

const app = createApp(App)
  .use(IonicVue)
  .use(router);

// Registrar componentes globales
app.component('v-chart', VChart);
app.component('apexchart', VueApexCharts);

router.isReady().then(() => {
  app.mount('#app');
});