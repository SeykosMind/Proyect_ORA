import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import PlanoViewer from './src/components/PlanoViewer';
import ControlPanel from './src/components/ControlPanel';
import Sidebar from './src/components/Sidebar';

// Datos de prueba: 10 polígonos con coordenadas normalizadas
const MOCK_POLYGONS = [
  {
    id: 'POL-001',
    coordenadas: [[0.1, 0.1], [0.3, 0.1], [0.3, 0.3], [0.1, 0.3]],
    color: '#FF6B6B',
    casillas: 4,
    conflicto: false,
  },
  {
    id: 'POL-002',
    coordenadas: [[0.35, 0.1], [0.55, 0.1], [0.55, 0.3], [0.35, 0.3]],
    color: '#4ECDC4',
    casillas: 5,
    conflicto: true,
  },
  {
    id: 'POL-003',
    coordenadas: [[0.6, 0.1], [0.8, 0.1], [0.8, 0.3], [0.6, 0.3]],
    color: '#45B7D1',
    casillas: 3,
    conflicto: false,
  },
  {
    id: 'POL-004',
    coordenadas: [[0.1, 0.35], [0.3, 0.35], [0.3, 0.55], [0.1, 0.55]],
    color: '#FFA07A',
    casillas: 6,
    conflicto: false,
  },
  {
    id: 'POL-005',
    coordenadas: [[0.35, 0.35], [0.55, 0.35], [0.55, 0.55], [0.35, 0.55]],
    color: '#98D8C8',
    casillas: 7,
    conflicto: true,
  },
  {
    id: 'POL-006',
    coordenadas: [[0.6, 0.35], [0.8, 0.35], [0.8, 0.55], [0.6, 0.55]],
    color: '#F7DC6F',
    casillas: 2,
    conflicto: false,
  },
  {
    id: 'POL-007',
    coordenadas: [[0.1, 0.6], [0.3, 0.6], [0.3, 0.8], [0.1, 0.8]],
    color: '#BB8FCE',
    casillas: 8,
    conflicto: false,
  },
  {
    id: 'POL-008',
    coordenadas: [[0.35, 0.6], [0.55, 0.6], [0.55, 0.8], [0.35, 0.8]],
    color: '#85C1E2',
    casillas: 4,
    conflicto: false,
  },
  {
    id: 'POL-009',
    coordenadas: [[0.6, 0.6], [0.8, 0.6], [0.8, 0.8], [0.6, 0.8]],
    color: '#F8B88B',
    casillas: 5,
    conflicto: false,
  },
  {
    id: 'POL-010',
    coordenadas: [[0.25, 0.85], [0.45, 0.85], [0.45, 0.95], [0.25, 0.95]],
    color: '#A9DFBF',
    casillas: 1,
    conflicto: false,
  },
];

export default function App() {
  const [selectedPolygon, setSelectedPolygon] = useState(null);
  const [stats, setStats] = useState({
    secciones: 0,
    ares: 0,
    conflictos: 2, // Contamos los polígonos con conflicto
    zores: 0,
  });

  const handlePolygonPress = (polygon) => {
    setSelectedPolygon(polygon);
  };

  const handleFilesSelected = (files) => {
    console.log('Archivos seleccionados:', files);
    // Aquí se procesarían los archivos
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Ares-Zores</Text>
          <Text style={styles.subtitle}>Planificación Geoespacial</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.viewerSection}>
          <PlanoViewer
            polygons={MOCK_POLYGONS}
            onPolygonPress={handlePolygonPress}
          />
        </View>

        <View style={styles.panelSection}>
          <ControlPanel
            onFilesSelected={handleFilesSelected}
            stats={stats}
          />
        </View>

        <View style={styles.sidebarSection}>
          <Sidebar selectedPolygon={selectedPolygon} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 12,
    color: '#e0e0e0',
    marginTop: 2,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  viewerSection: {
    flex: 1,
    backgroundColor: '#fff',
  },
  panelSection: {
    maxHeight: 350,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  sidebarSection: {
    maxHeight: 200,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});

// Importar Text para que funcione en App.js
import { Text } from 'react-native';
