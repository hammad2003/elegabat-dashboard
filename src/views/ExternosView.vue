<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Aspectos Externos</ion-title>
        <ion-buttons slot="end">
          <ion-button fill="clear" @click="refreshData">
            <ion-icon slot="icon-only" :icon="refreshOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="dashboard-content">
      <!-- Encabezado del Dashboard -->
      <div class="dashboard-header">
        <div class="header-text">
          <h1>ELEGABAT Analytics Externos</h1>
          <p class="subtitle">Análisis de apuestas, usuarios y rendimiento</p>
        </div>
        <div class="header-actions">
          <ion-chip color="danger" class="update-badge">
            <ion-icon :icon="timeOutline"></ion-icon>
            <ion-label>Actualizado: {{ lastUpdate }}</ion-label>
          </ion-chip>
        </div>
      </div>
      
      <!-- Sección de KPIs -->
      <ion-grid class="kpi-grid">
        <ion-row>
          <ion-col size="12" size-sm="6" size-md="3">
            <div class="kpi-card">
              <div class="kpi-icon" style="background-color: rgba(153, 0, 0, 0.1);">
                <ion-icon :icon="cashOutline" color="danger"></ion-icon>
              </div>
              <div class="kpi-data">
                <div class="kpi-value">{{ formatCurrency(totalApuestas) }}</div>
                <div class="kpi-label">Total Apostado</div>
                <div class="kpi-trend trend-up">
                  <ion-icon :icon="trendingUpOutline"></ion-icon>
                  <span>12.5% vs mes anterior</span>
                </div>
              </div>
            </div>
          </ion-col>
          
          <ion-col size="12" size-sm="6" size-md="3">
            <div class="kpi-card">
              <div class="kpi-icon" style="background-color: rgba(0, 102, 204, 0.1);">
                <ion-icon :icon="peopleOutline" color="primary"></ion-icon>
              </div>
              <div class="kpi-data">
                <div class="kpi-value">{{ formatNumber(totalUsuarios) }}</div>
                <div class="kpi-label">Usuarios Activos</div>
                <div class="kpi-trend trend-up">
                  <ion-icon :icon="trendingUpOutline"></ion-icon>
                  <span>8.3% vs mes anterior</span>
                </div>
              </div>
            </div>
          </ion-col>
          
          <ion-col size="12" size-sm="6" size-md="3">
            <div class="kpi-card">
              <div class="kpi-icon" style="background-color: rgba(40, 167, 69, 0.1);">
                <ion-icon :icon="trendingUpOutline" color="success"></ion-icon>
              </div>
              <div class="kpi-data">
                <div class="kpi-value">{{ formatCurrency(gananciasTotal) }}</div>
                <div class="kpi-label">Ganancias Totales</div>
                <div class="kpi-trend trend-down">
                  <ion-icon :icon="trendingDownOutline"></ion-icon>
                  <span>3.2% vs mes anterior</span>
                </div>
              </div>
            </div>
          </ion-col>
          
          <ion-col size="12" size-sm="6" size-md="3">
            <div class="kpi-card">
              <div class="kpi-icon" style="background-color: rgba(255, 193, 7, 0.1);">
                <ion-icon :icon="footballOutline" color="warning"></ion-icon>
              </div>
              <div class="kpi-data">
                <div class="kpi-value">{{ deportePopular }}</div>
                <div class="kpi-label">Deporte Popular</div>
                <div class="kpi-trend">
                  <span>39.59% de apuestas</span>
                </div>
              </div>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
      
      <!-- Gráficos principales -->
      <ion-grid class="main-charts">
        <ion-row>
          <ion-col size="12" size-lg="8">
            <div class="chart-container">
              <div class="chart-header">
                <h3>Evolución Mensual de Apuestas</h3>
                <div class="chart-badge">ChartJS</div>
              </div>
              <div class="chart-wrapper">
                <canvas ref="evolucionChart"></canvas>
              </div>
            </div>
          </ion-col>
          
          <ion-col size="12" size-lg="4">
            <div class="chart-container">
              <div class="chart-header">
                <h3>Distribución de Apuestas</h3>
                <div class="chart-badge">ApexCharts</div>
              </div>
              <div class="chart-wrapper">
                <apexchart
                  type="donut"
                  height="300"
                  :options="tiposApuestasOptions"
                  :series="tiposApuestasSeries"
                ></apexchart>
              </div>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
      
      <!-- Gráficos secundarios -->
      <ion-grid class="secondary-charts">
        <ion-row>
          <ion-col size="12" size-md="6">
            <div class="chart-container">
              <div class="chart-header">
                <h3>Indicadores de Rendimiento</h3>
                <div class="chart-badge">Tabla Personalizada</div>
              </div>
              <div class="chart-wrapper">
                <div class="performance-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Mes</th>
                        <th>Tipo</th>
                        <th>Valor</th>
                        <th>Comparativa</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in tablaExterna" :key="index">
                        <td>{{ item.mes }}</td>
                        <td>{{ item.tipo }}</td>
                        <td>{{ formatValue(item.valor, item.tipo) }}</td>
                        <td class="bar-cell">
                          <div class="bar-container">
                            <div class="bar" :style="{ width: getBarWidth(item.valor, item.tipo) }"></div>
                            <span class="bar-value">{{ getBarPercentage(item.valor, item.tipo) }}</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </ion-col>
          
          <ion-col size="12" size-md="6">
            <div class="chart-container">
              <div class="chart-header">
                <h3>Uso por Dispositivo</h3>
                <div class="chart-badge real-time">TIEMPO REAL</div>
              </div>
              <div class="chart-wrapper">
                <apexchart
                  type="line"
                  height="300"
                  :options="dispositivosOptions"
                  :series="dispositivosSeries"
                ></apexchart>
              </div>
            </div>
          </ion-col>
        </ion-row>
        
        <ion-row>
          <ion-col size="12" size-md="6">
            <div class="chart-container">
              <div class="chart-header">
                <h3>Apuestas por Deporte</h3>
                <div class="chart-badge">ECharts</div>
              </div>
              <div class="chart-wrapper">
                <v-chart class="chart" :option="deportesOptions" autoresize />
              </div>
            </div>
          </ion-col>
          
          <ion-col size="12" size-md="6">
            <div class="chart-container">
              <div class="chart-header">
                <h3>Distribución Geográfica</h3>
                <div class="chart-badge">Mapa</div>
              </div>
              <div class="chart-wrapper">
                <v-chart class="chart map-chart" :option="europeMapOptions" autoresize />
              </div>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonButtons,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonChip,
  IonLabel
} from "@ionic/vue";
import { 
  cashOutline, 
  peopleOutline, 
  trendingUpOutline, 
  trendingDownOutline,
  footballOutline,
  refreshOutline,
  timeOutline
} from 'ionicons/icons';
import { Chart } from 'chart.js/auto';
import { ref, onMounted, onUnmounted, shallowRef } from 'vue';
import moment from 'moment';

// Referencias para ChartJS
const evolucionChart = ref(null);
let chartInstance = null;

// Estado y datos - usando shallowRef para mejorar rendimiento con datos grandes
const lastUpdate = ref(moment().format('DD/MM/YYYY HH:mm'));
const totalApuestas = ref(13000000);
const totalUsuarios = ref(7365000);
const gananciasTotal = ref(2337000);
const deportePopular = ref('Fútbol');

// Tabla con barras - Personalizado
const tablaExterna = shallowRef([
  { mes: "Ene 22", tipo: "Apuestas Realizadas", valor: "150000" },
  { mes: "Feb 22", tipo: "Apuestas Realizadas", valor: "170000" },
  { mes: "Mar 22", tipo: "Apuestas Realizadas", valor: "200000" },
  { mes: "Ene 22", tipo: "Cantidad Apostada Total", valor: "6000000" },
  { mes: "Feb 22", tipo: "Cantidad Apostada Total", valor: "4000000" },
  { mes: "Mar 22", tipo: "Cantidad Apostada Total", valor: "3000000" },
  { mes: "Ene 22", tipo: "Ganancias Totales", valor: "546000" },
  { mes: "Feb 22", tipo: "Ganancias Totales", valor: "922000" },
  { mes: "Mar 22", tipo: "Ganancias Totales", valor: "869000" },
]);

const getBarWidth = (valor, tipo) => {
  if (tipo.includes("Apuestas Realizadas")) {
    const num = parseInt(valor.replace(/\D/g, ""));
    return (num / 200000) * 100 + "%";
  } else if (tipo.includes("Cantidad Apostada Total")) {
    const num = parseInt(valor.replace(/\D/g, ""));
    return (num / 6000000) * 100 + "%";
  } else if (tipo.includes("Ganancias Totales")) {
    const num = parseInt(valor.replace(/\D/g, ""));
    return (num / 1000000) * 100 + "%";
  }
  return "0%";
};

const getBarPercentage = (valor, tipo) => {
  return getBarWidth(valor, tipo);
};

const formatValue = (valor, tipo) => {
  if (tipo.includes("Apuestas Realizadas")) {
    return formatNumber(valor);
  } else if (tipo.includes("Cantidad Apostada Total") || tipo.includes("Ganancias Totales")) {
    return formatCurrency(valor);
  }
  return valor;
};

// Dispositivos Chart - Real-time data (ApexCharts)
const dispositivosSeries = shallowRef([
  {
    name: "Móvil",
    data: [5326, 2541, 0, 3566, 8677, 16555, 21339, 0, 0, 0],
  },
  {
    name: "PC/Laptop",
    data: [0, 0, 1112, 0, 0, 0, 0, 15999, 14233, 0],
  },
  {
    name: "Tablet",
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 22454],
  },
]);

const dispositivosOptions = shallowRef({
  chart: {
    type: "line",
    animations: {
      enabled: true,
      easing: "linear",
      dynamicAnimation: {
        speed: 1000,
      },
    },
    toolbar: {
      show: false,
    },
    background: 'transparent',
  },
  colors: ["#990000", "#0066cc", "#28a745"],
  stroke: {
    curve: "smooth",
    width: 3,
  },
  xaxis: {
    categories: ["22/01", "23/01", "24/01", "25/01", "26/01", "27/01", "28/01", "29/01", "30/01", "31/01"],
    labels: {
      style: {
        colors: "#333",
      },
    },
  },
  yaxis: {
    title: {
      text: "Cantidad",
      style: {
        color: "#333",
      },
    },
    labels: {
      formatter: function (val) {
        return val.toLocaleString('es-ES');
      },
      style: {
        colors: "#333",
      },
    },
  },
  grid: {
    borderColor: "#e0e0e0",
    row: {
      colors: ["transparent", "transparent"],
    },
  },
  markers: {
    size: 5,
  },
  tooltip: {
    theme: "dark",
    y: {
      formatter: function (val) {
        return val.toLocaleString('es-ES') + " usuarios";
      }
    }
  },
  legend: {
    position: "top",
  },
});

// Real-time data update
let intervalId = null;

const updateDispositivosData = () => {
  const newData = dispositivosSeries.value.map((series) => {
    return {
      ...series,
      data: series.data.map((val) => {
        // Random fluctuation between -10% and +10%
        const fluctuation = Math.random() * 0.2 - 0.1;
        return val ? Math.max(0, Math.round(val * (1 + fluctuation))) : 0;
      }),
    };
  });
  dispositivosSeries.value = newData;
};

// Deportes Chart - Using ECharts
const deportesOptions = shallowRef({
  title: {
    text: "",
    left: "center",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    formatter: function (params) {
      const value = params[0].value;
      return `${params[0].name}: ${value.toLocaleString("es-ES")} €`;
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    data: [
      "Fútbol",
      "Baloncesto",
      "Tenis",
      "Caballos",
      "Galgos",
      "F1/NASCAR",
      "Boxeo",
      "MMA",
      "Rugby",
      "Cricket",
    ],
    axisLabel: {
      interval: 0,
      rotate: 30,
    },
  },
  yAxis: {
    type: "value",
    axisLabel: {
      formatter: function (value) {
        return (value / 1000000).toFixed(1) + "M €";
      },
    },
  },
  series: [
    {
      name: "Cantidad",
      type: "bar",
      data: [
        5613611.86, 3469402.93, 2144208.93, 1325194.0, 819014.93, 506179.07, 312835.86, 193343.21, 119492.65,
        73850.56,
      ],
      itemStyle: {
        color: function (params) {
          // Color gradient based on value
          const colorList = [
            "#990000",
            "#b30000",
            "#cc0000",
            "#e60000",
            "#ff0000",
            "#ff1a1a",
            "#ff3333",
            "#ff4d4d",
            "#ff6666",
            "#ff8080",
          ];
          return colorList[params.dataIndex];
        },
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
      label: {
        show: true,
        position: "top",
        formatter: function (params) {
          return (params.value / 1000000).toFixed(1) + "M";
        },
      },
    },
  ],
});

// Tipos de Apuestas Chart - ApexCharts
const tiposApuestasSeries = shallowRef([39.59, 24.44, 15.1, 9.34, 5.77, 3.57, 2.2, 1.36, 0.84, 0.52]);

const tiposApuestasOptions = shallowRef({
  chart: {
    type: "donut",
    background: 'transparent',
  },
  labels: [
    "Fútbol",
    "Baloncesto",
    "Tenis",
    "Carreras de caballos",
    "Carreras de galgos",
    "F1/NASCAR",
    "Boxeo",
    "MMA",
    "Rugby",
    "Cricket",
  ],
  colors: [
    "#990000",
    "#cc0000",
    "#ff0000",
    "#ff3333",
    "#ff6666",
    "#ff9999",
    "#ffcccc",
    "#0066cc",
    "#0099cc",
    "#00cccc",
  ],
  legend: {
    position: "bottom",
    fontSize: "12px",
    offsetY: 0,
    itemMargin: {
      horizontal: 5,
      vertical: 2
    }
  },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          total: {
            show: true,
            label: "Total Apuestas",
            formatter: function () {
              return "100%";
            },
          },
        },
      },
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
  tooltip: {
    y: {
      formatter: function (val) {
        return val + "%";
      },
    },
  },
});

// Europe Map Chart - ECharts
const europeMapOptions = shallowRef({
  title: {
    text: "",
    left: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: "{b}: {c} usuarios",
  },
  visualMap: {
    min: 0,
    max: 3000000,
    text: ["Alto", "Bajo"],
    realtime: false,
    calculable: true,
    inRange: {
      color: ["#ffe6e6", "#990000"],
    },
  },
  series: [
    {
      name: "Usuarios",
      type: "map",
      map: "europe",
      roam: true,
      emphasis: {
        label: {
          show: true,
        },
        itemStyle: {
          areaColor: "#cc0000",
        },
      },
      data: [
        { name: "Spain", value: 2920965 },
        { name: "Germany", value: 1112775 },
        { name: "Italy", value: 695415 },
        { name: "United Kingdom", value: 417360 },
        { name: "Portugal", value: 278055 },
        { name: "France", value: 189000 },
        { name: "Netherlands", value: 156000 },
        { name: "Belgium", value: 124000 },
        { name: "Switzerland", value: 98000 },
        { name: "Austria", value: 87000 },
        { name: "Poland", value: 76000 },
        { name: "Sweden", value: 65000 },
        { name: "Norway", value: 54000 },
        { name: "Denmark", value: 43000 },
        { name: "Finland", value: 32000 },
        { name: "Greece", value: 21000 },
        { name: "Ireland", value: 19000 },
        { name: "Czech Republic", value: 17000 },
        { name: "Hungary", value: 15000 },
        { name: "Romania", value: 12000 },
      ],
    },
  ],
});

// Datos para el gráfico de evolución mensual (ChartJS)
const evolucionMensualData = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  datasets: [
    {
      label: 'Apuestas 2022',
      data: [150000, 170000, 200000, 185000, 210000, 230000, 245000, 260000, 240000, 220000, 250000, 280000],
      backgroundColor: 'rgba(153, 0, 0, 0.2)',
      borderColor: '#990000',
      borderWidth: 2,
      tension: 0.4,
      fill: true
    },
    {
      label: 'Apuestas 2021',
      data: [120000, 135000, 150000, 160000, 175000, 190000, 200000, 210000, 195000, 180000, 205000, 225000],
      backgroundColor: 'rgba(0, 102, 204, 0.2)',
      borderColor: '#0066cc',
      borderWidth: 2,
      tension: 0.4,
      fill: true
    }
  ]
};

// Funciones de utilidad para formateo
const formatNumber = (value) => {
  const num = parseInt(value.toString().replace(/\D/g, ""));
  return num.toLocaleString('es-ES');
};

const formatCurrency = (value) => {
  const num = parseInt(value.toString().replace(/\D/g, ""));
  return num.toLocaleString('es-ES') + ' €';
};

// Función para refrescar datos
const refreshData = () => {
  // Actualizar KPIs con pequeñas variaciones
  totalApuestas.value = Math.round(totalApuestas.value * (1 + (Math.random() * 0.1 - 0.05)));
  totalUsuarios.value = Math.round(totalUsuarios.value * (1 + (Math.random() * 0.1 - 0.05)));
  gananciasTotal.value = Math.round(gananciasTotal.value * (1 + (Math.random() * 0.1 - 0.05)));
  
  // Actualizar datos de gráficos
  updateDispositivosData();
  
  // Actualizar ChartJS
  if (chartInstance) {
    chartInstance.data.datasets[0].data = evolucionMensualData.datasets[0].data.map(val => 
      Math.round(val * (1 + (Math.random() * 0.1 - 0.05)))
    );
    chartInstance.update();
  }
  
  // Actualizar marca de tiempo
  lastUpdate.value = moment().format('DD/MM/YYYY HH:mm');
};

onMounted(() => {
  // Iniciar actualización en tiempo real
  intervalId = setInterval(updateDispositivosData, 3000);
    
  // Inicializar gráfico ChartJS
  if (evolucionChart.value) {
    const ctx = evolucionChart.value.getContext('2d');
    chartInstance = new Chart(ctx, {
      type: 'line',
      data: evolucionMensualData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y.toLocaleString('es-ES');
                }
                return label;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value.toLocaleString('es-ES');
              }
            }
          }
        }
      }
    });
  }
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
  if (chartInstance) chartInstance.destroy();
});
</script>

<style scoped>
.dashboard-content {
  --background: #f5f7fa;
  padding: 16px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.header-text h1 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.8rem;
  font-weight: 600;
}

.header-text .subtitle {
  margin: 4px 0 0;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.update-badge {
  margin: 0;
}

.kpi-grid {
  margin-bottom: 24px;
}

.kpi-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  height: 100%;
  display: flex;
  align-items: center;
}

.kpi-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
}

.kpi-icon ion-icon {
  font-size: 24px;
}

.kpi-data {
  flex: 1;
}

.kpi-value {
  font-size: 1.4rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 4px;
}

.kpi-label {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 4px;
}

.kpi-trend {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 500;
}

.kpi-trend ion-icon {
  margin-right: 4px;
}

.trend-up {
  color: #28a745;
}

.trend-down {
  color: #dc3545;
}

.main-charts, .secondary-charts {
  margin-bottom: 24px;
}

.chart-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;
  height: 100%;
}

.chart-header {
  padding: 16px 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #2c3e50;
}

.chart-badge {
  background: #e9ecef;
  color: #495057;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
}

.chart-badge.real-time {
  background: #dc3545;
  color: white;
}

.chart-wrapper {
  padding: 16px;
  height: 300px;
}

.performance-table {
  width: 100%;
  overflow-x: auto;
}

.performance-table table {
  width: 100%;
  border-collapse: collapse;
}

.performance-table th {
  background: #f8f9fa;
  padding: 10px 12px;
  text-align: left;
  font-size: 0.8rem;
  color: #495057;
  font-weight: 600;
  text-transform: uppercase;
}

.performance-table td {
  padding: 12px;
  border-bottom: 1px solid #e9ecef;
  font-size: 0.9rem;
  color: #2c3e50;
}

.bar-cell {
  width: 40%;
}

.bar-container {
  display: flex;
  align-items: center;
}

.bar {
  height: 8px;
  border-radius: 4px;
  background-color: #990000;
  margin-right: 8px;
}

.bar-value {
  font-size: 0.8rem;
  color: #7f8c8d;
}

.chart {
  width: 100%;
  height: 100%;
}

.map-chart {
  height: 300px;
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-actions {
    margin-top: 12px;
  }
  
  .kpi-card {
    flex-direction: column;
    text-align: center;
  }
  
  .kpi-icon {
    margin-right: 0;
    margin-bottom: 12px;
  }
  
  .kpi-trend {
    justify-content: center;
  }
}
</style>