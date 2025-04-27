// Este archivo se encarga de registrar los mapas para ECharts
import * as echarts from 'echarts/core';
import europeGeoJson from './europe.geo.json';
import globalGeoJson from './global.geo.json';

export function registerMaps() {
  try {
    echarts.registerMap('europe', europeGeoJson);
    echarts.registerMap('world', globalGeoJson);
    console.log('Mapas registrados correctamente');
  } catch (error) {
    console.error('Error al registrar mapas:', error);
  }
}