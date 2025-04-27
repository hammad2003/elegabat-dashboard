<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Aspectos Internos</ion-title>
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
          <h1>ELEGABAT Analytics Internos</h1>
          <p class="subtitle">Análisis de usuarios, transacciones y métodos de pago</p>
        </div>
        <div class="header-actions">
          <ion-chip color="primary" class="update-badge">
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
              <div class="kpi-icon" style="background-color: rgba(102, 16, 242, 0.1);">
                <ion-icon :icon="personAddOutline" color="primary"></ion-icon>
              </div>
              <div class="kpi-data">
                <div class="kpi-value">{{ formatNumber(nuevosRegistros) }}</div>
                <div class="kpi-label">Nuevos Registros</div>
                <div class="kpi-trend trend-up">
                  <ion-icon :icon="trendingUpOutline"></ion-icon>
                  <span>16.7% vs mes anterior</span>
                </div>
              </div>
            </div>
          </ion-col>
          
          <ion-col size="12" size-sm="6" size-md="3">
            <div class="kpi-card">
              <div class="kpi-icon" style="background-color: rgba(59, 89, 152, 0.1);">
                <ion-icon :icon="calendarOutline" color="secondary"></ion-icon>
              </div>
              <div class="kpi-data">
                <div class="kpi-value">{{ edadMedia }}</div>
                <div class="kpi-label">Edad Media</div>
                <div class="kpi-trend trend-up">
                  <ion-icon :icon="trendingUpOutline"></ion-icon>
                  <span>2 años vs mes anterior</span>
                </div>
              </div>
            </div>
          </ion-col>
          
          <ion-col size="12" size-sm="6" size-md="3">
            <div class="kpi-card">
              <div class="kpi-icon" style="background-color: rgba(40, 167, 69, 0.1);">
                <ion-icon :icon="walletOutline" color="success"></ion-icon>
              </div>
              <div class="kpi-data">
                <div class="kpi-value">{{ formatCurrency(saldoPromedio) }}</div>
                <div class="kpi-label">Saldo Promedio</div>
                <div class="kpi-trend trend-up">
                  <ion-icon :icon="trendingUpOutline"></ion-icon>
                  <span>55.4% vs mes anterior</span>
                </div>
              </div>
            </div>
          </ion-col>
          
          <ion-col size="12" size-sm="6" size-md="3">
            <div class="kpi-card">
              <div class="kpi-icon" style="background-color: rgba(220, 53, 69, 0.1);">
                <ion-icon :icon="logoEuro" color="danger"></ion-icon>
              </div>
              <div class="kpi-data">
                <div class="kpi-value">{{ metodoPagoPopular }}</div>
                <div class="kpi-label">Método Popular</div>
                <div class="kpi-trend">
                  <span>60% de transacciones</span>
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
                <h3>Evolución de Registros</h3>
                <div class="chart-badge">ChartJS</div>
              </div>
              <div class="chart-wrapper">
                <canvas ref="registrosChart"></canvas>
              </div>
            </div>
          </ion-col>
          
          <ion-col size="12" size-lg="4">
            <div class="chart-container">
              <div class="chart-header">
                <h3>Métodos de Ingreso</h3>
                <div class="chart-badge">ECharts</div>
              </div>
              <div class="chart-wrapper">
                <v-chart class="chart" :option="metodosIngresoOptions" autoresize />
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
                <h3>Indicadores Internos</h3>
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
                      <tr v-for="(item, index) in tablaInterna" :key="index">
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
                <h3>Usuarios Activos Diarios</h3>
                <div class="chart-badge real-time">TIEMPO REAL</div>
              </div>
              <div class="chart-wrapper">
                <apexchart
                  type="area"
                  height="300"
                  :options="usuariosActivosOptions"
                  :series="usuariosActivosSeries"
                ></apexchart>
              </div>
            </div>
          </ion-col>
        </ion-row>
        
        <ion-row>
          <ion-col size="12" size-md="6">
            <div class="chart-container">
              <div class="chart-header">
                <h3>Transacciones Mensuales</h3>
                <div class="chart-badge">ApexCharts</div>
              </div>
              <div class="chart-wrapper">
                <apexchart
                  type="bar"
                  height="300"
                  :options="transaccionesOptions"
                  :series="transaccionesSeries"
                ></apexchart>
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
  personAddOutline, 
  calendarOutline, 
  walletOutline, 
  logoEuro,
  refreshOutline,
  timeOutline,
  trendingUpOutline
} from 'ionicons/icons';
import { Chart } from 'chart.js/auto';
import { ref, onMounted, onUnmounted, shallowRef } from 'vue';
import moment from 'moment';

// Referencias para ChartJS
const registrosChart = ref(null);
let chartInstance = null;

// Estado y datos
const lastUpdate = ref(moment().format('DD/MM/YYYY HH:mm'));
const nuevosRegistros = ref(140000);
const edadMedia = ref(22);
const saldoPromedio = ref(1433);
const metodoPagoPopular = ref('Bitcoin');

// Tabla con barras - Personalizado
const tablaInterna = shallowRef([
  { mes: "Ene 22", tipo: "Nuevos Registros", valor: "100000" },
  { mes: "Feb 22", tipo: "Nuevos Registros", valor: "120000" },
  { mes: "Mar 22", tipo: "Nuevos Registros", valor: "140000" },
  { mes: "Ene 22", tipo: "Media: Edad", valor: "20" },
  { mes: "Feb 22", tipo: "Media: Edad", valor: "18" },
  { mes: "Mar 22", tipo: "Media: Edad", valor: "22" },
  { mes: "Ene 22", tipo: "Saldo inicial", valor: "546" },
  { mes: "Feb 22", tipo: "Saldo inicial", valor: "922" },
  { mes: "Mar 22", tipo: "Saldo inicial", valor: "1433" },
]);

const getBarWidth = (valor, tipo) => {
  if (tipo.includes("Nuevos Registros")) {
    const num = parseInt(valor.replace(/\D/g, ""));
    return (num / 140000) * 100 + "%";
  } else if (tipo.includes("Media: Edad")) {
    const num = parseInt(valor.replace(/\D/g, ""));
    return (num / 25) * 100 + "%";
  } else if (tipo.includes("Saldo inicial")) {
    const num = parseFloat(valor.replace(/\D/g, ""));
    return (num / 1500) * 100 + "%";
  }
  return "0%";
};

const getBarPercentage = (valor, tipo) => {
  return getBarWidth(valor, tipo);
};

const formatValue = (valor, tipo) => {
  if (tipo.includes("Nuevos Registros")) {
    return formatNumber(valor);
  } else if (tipo.includes("Media: Edad")) {
    return valor + " años";
  } else if (tipo.includes("Saldo inicial")) {
    return formatCurrency(valor);
  }
  return valor;
};

// Usuarios Activos Chart - Tiempo Real (ApexCharts)
const usuariosActivosSeries = shallowRef([
  {
    name: "Usuarios Activos",
    data: [5326, 2541, 1112, 3566, 8677, 16555, 21339, 15999, 14233, 22454],
  },
]);

const usuariosActivosOptions = shallowRef({
  chart: {
    type: "area",
    toolbar: {
      show: false,
    },
    animations: {
      enabled: true,
      easing: "linear",
      dynamicAnimation: {
        speed: 1000,
      },
    },
    background: 'transparent',
  },
  colors: ["#6610f2"],
  stroke: {
    curve: "smooth",
    width: 3,
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.3,
      stops: [0, 90, 100]
    }
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
      text: "Usuarios Activos",
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
      },
    },
  },
  annotations: {
    yaxis: [
      {
        y: 15000,
        borderColor: "#28a745",
        label: {
          borderColor: "#28a745",
          style: {
            color: "#fff",
            background: "#28a745",
          },
          text: "Objetivo",
        },
      },
    ],
  },
});

// Transacciones Chart - ApexCharts
const transaccionesSeries = shallowRef([
  {
    name: "Depósitos",
    data: [7522699, 2666789, 0, 5786439, 3359121, 0, 0, 0, 455966, 510112],
  },
  {
    name: "Retiros",
    data: [0, 0, 4823463, 0, 0, 4069000, 2369811, 1822384, 0, 0],
  }
]);

const transaccionesOptions = shallowRef({
  chart: {
    type: "bar",
    toolbar: {
      show: false,
    },
    background: 'transparent',
    stacked: false,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      borderRadius: 5,
    },
  },
  colors: ['#28a745', '#dc3545'],
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [
      "Ene 22",
      "Feb 22",
      "Mar 22",
      "Abr 22",
      "May 22",
      "Jun 22",
      "Jul 22",
      "Ago 22",
      "Sep 22",
      "Oct 22",
    ],
    labels: {
      style: {
        colors: "#333",
      },
    },
  },
  yaxis: {
    title: {
      text: "Monto (€)",
      style: {
        color: "#333",
      },
    },
    labels: {
      formatter: function (val) {
        return (val / 1000000).toFixed(1) + "M";
      },
      style: {
        colors: "#333",
      },
    },
  },
  tooltip: {
    theme: "dark",
    y: {
      formatter: function (val) {
        return val.toLocaleString('es-ES') + " €";
      },
    },
    shared: true,
    intersect: false,
  },
  legend: {
    position: 'top',
  }
});

// Métodos de Ingreso Chart - Using ECharts
const metodosIngresoOptions = shallowRef({
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b}: {c}% ({d}%)",
  },
  legend: {
    orient: "vertical",
    right: 10,
    top: "center",
    data: [
      "Bitcoin",
      "Ethereum",
      "PayPal",
      "Tarjeta de Crédito",
      "Transferencia Bancaria",
      "Skrill",
      "Stripe",
      "Apple Pay",
    ],
  },
  series: [
    {
      name: "Método de Ingreso",
      type: "pie",
      radius: ["50%", "70%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "18",
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 60, name: "Bitcoin" },
        { value: 30, name: "Ethereum" },
        { value: 5, name: "PayPal" },
        { value: 2, name: "Tarjeta de Crédito" },
        { value: 1, name: "Transferencia Bancaria" },
        { value: 0.5, name: "Skrill" },
        { value: 0.3, name: "Stripe" },
        { value: 0.2, name: "Apple Pay" },
      ],
      itemStyle: {
        color: function (params) {
          const colorList = ["#6610f2", "#3b5998", "#0088cc", "#dc3545", "#28a745", "#fd7e14", "#20c997", "#17a2b8"];
          return colorList[params.dataIndex];
        },
      },
    },
  ],
});

// Europe Map Chart for Internal Users - ECharts
const europeMapOptions = shallowRef({
  title: {
    text: "",
    left: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: "{b}: {c} usuarios internos",
  },
  visualMap: {
    min: 0,
    max: 1500000,
    text: ["Alto", "Bajo"],
    realtime: false,
    calculable: true,
    inRange: {
      color: ["#e6e6ff", "#6610f2"],
    },
  },
  series: [
    {
      name: "Usuarios Internos",
      type: "map",
      map: "europe",
      roam: true,
      emphasis: {
        label: {
          show: true,
        },
        itemStyle: {
          areaColor: "#6610f2",
        },
      },
      data: [
        { name: "Spain", value: 1460482 },
        { name: "Germany", value: 556387 },
        { name: "Italy", value: 347707 },
        { name: "United Kingdom", value: 208680 },
        { name: "Portugal", value: 139027 },
        { name: "France", value: 94500 },
        { name: "Netherlands", value: 78000 },
        { name: "Belgium", value: 62000 },
        { name: "Switzerland", value: 49000 },
        { name: "Austria", value: 43500 },
        { name: "Poland", value: 38000 },
        { name: "Sweden", value: 32500 },
        { name: "Norway", value: 27000 },
        { name: "Denmark", value: 21500 },
        { name: "Finland", value: 16000 },
        { name: "Greece", value: 10500 },
        { name: "Ireland", value: 9500 },
        { name: "Czech Republic", value: 8500 },
        { name: "Hungary", value: 7500 },
        { name: "Romania", value: 6000 },
      ],
    },
  ],
});

// Datos para el gráfico de evolución de registros (ChartJS)
const registrosMensualesData = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  datasets: [
    {
      type: 'bar',
      label: 'Nuevos Registros',
      data: [100000, 120000, 140000, 130000, 150000, 160000, 170000, 180000, 165000, 155000, 175000, 190000],
      backgroundColor: '#6610f2',
      order: 2
    },
    {
      type: 'line',
      label: 'Tendencia',
      data: [100000, 120000, 140000, 130000, 150000, 160000, 170000, 180000, 165000, 155000, 175000, 190000],
      borderColor: '#dc3545',
      borderWidth: 2,
      fill: false,
      tension: 0.4,
      order: 1
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

// Actualización de datos en tiempo real
let intervalId = null;

const updateUsuariosActivosData = () => {
  const newData = usuariosActivosSeries.value.map((series) => {
    return {
      ...series,
      data: series.data.map((val) => {
        // Random fluctuation between -10% and +10%
        const fluctuation = Math.random() * 0.2 - 0.1;
        return val ? Math.max(0, Math.round(val * (1 + fluctuation))) : 0;
      }),
    };
  });
  usuariosActivosSeries.value = newData;
};

// Función para refrescar datos
const refreshData = () => {
  // Actualizar KPIs con pequeñas variaciones
  nuevosRegistros.value = Math.round(nuevosRegistros.value * (1 + (Math.random() * 0.1 - 0.05)));
  edadMedia.value = Math.max(18, Math.min(30, edadMedia.value + Math.floor(Math.random() * 3) - 1));
  saldoPromedio.value = Math.round(saldoPromedio.value * (1 + (Math.random() * 0.1 - 0.05)));
  
  // Actualizar datos de gráficos
  updateUsuariosActivosData();
  
  // Actualizar ChartJS
  if (chartInstance) {
    chartInstance.data.datasets[0].data = registrosMensualesData.datasets[0].data.map(val => 
      Math.round(val * (1 + (Math.random() * 0.1 - 0.05)))
    );
    chartInstance.data.datasets[1].data = chartInstance.data.datasets[0].data;
    chartInstance.update();
  }
  
  // Actualizar marca de tiempo
  lastUpdate.value = moment().format('DD/MM/YYYY HH:mm');
};

onMounted(() => {
  // Iniciar actualización en tiempo real
  intervalId = setInterval(updateUsuariosActivosData, 3000);
    
  // Inicializar gráfico ChartJS
  if (registrosChart.value) {
    const ctx = registrosChart.value.getContext('2d');
    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: registrosMensualesData,
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
  background: #6610f2;
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
  background-color: #6610f2;
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