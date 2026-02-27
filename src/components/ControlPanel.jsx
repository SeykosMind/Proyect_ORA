import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { generarAres, validarAres, generarZores } from '../services/api';

const ControlPanel = ({ onFilesSelected, stats }) => {
  const [loading, setLoading] = useState(false);

  const pickKML = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/vnd.google-earth.kml+xml',
      });
      if (result.type === 'success') {
        onFilesSelected({ kml: result });
      }
    } catch (error) {
      console.error('Error picking KML:', error);
    }
  };

  const pickCSV = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
      });
      if (result.type === 'success') {
        onFilesSelected({ csv: result });
      }
    } catch (error) {
      console.error('Error picking CSV:', error);
    }
  };

  const procesarArchivos = async () => {
    setLoading(true);
    try {
      // Aquí se llamaría al endpoint de upload
      console.log('Procesando archivos...');
    } catch (error) {
      console.error('Error procesando archivos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerarAres = async () => {
    setLoading(true);
    try {
      const response = await generarAres();
      console.log('ARES generados:', response);
    } catch (error) {
      console.error('Error generando ARES:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerarZores = async () => {
    setLoading(true);
    try {
      const response = await generarZores();
      console.log('ZORES generados:', response);
    } catch (error) {
      console.error('Error generando ZORES:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Contadores */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Secciones</Text>
          <Text style={styles.statValue}>{stats?.secciones || 0}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>ARES</Text>
          <Text style={styles.statValue}>{stats?.ares || 0}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Conflictos</Text>
          <Text style={styles.statValue}>{stats?.conflictos || 0}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>ZORES</Text>
          <Text style={styles.statValue}>{stats?.zores || 0}</Text>
        </View>
      </View>

      {/* Botones de selección de archivos */}
      <TouchableOpacity style={styles.button} onPress={pickKML}>
        <Text style={styles.buttonText}>📁 Seleccionar KML</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={pickCSV}>
        <Text style={styles.buttonText}>📁 Seleccionar CSV</Text>
      </TouchableOpacity>

      {/* Botón de procesar archivos */}
      <TouchableOpacity
        style={[styles.button, styles.primaryButton]}
        onPress={procesarArchivos}
        disabled={loading}
      >
        <Text style={styles.buttonText}>⚙️ Procesar Archivos</Text>
      </TouchableOpacity>

      {/* Botón de generar ARES */}
      <TouchableOpacity
        style={[
          styles.button,
          styles.primaryButton,
          stats?.secciones === 0 && styles.disabledButton,
        ]}
        onPress={handleGenerarAres}
        disabled={stats?.secciones === 0 || loading}
      >
        <Text style={styles.buttonText}>🔧 Generar ARES</Text>
      </TouchableOpacity>

      {/* Botón de generar ZORES */}
      <TouchableOpacity
        style={[
          styles.button,
          styles.primaryButton,
          stats?.ares === 0 && styles.disabledButton,
        ]}
        onPress={handleGenerarZores}
        disabled={stats?.ares === 0 || loading}
      >
        <Text style={styles.buttonText}>🎯 Generar ZORES</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  statBox: {
    width: '23%',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  disabledButton: {
    backgroundColor: '#ccc',
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default ControlPanel;
