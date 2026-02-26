import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Sidebar = ({ selectedPolygon }) => {
  if (!selectedPolygon) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Selecciona un polígono para ver detalles</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalles del Polígono</Text>

      <View style={styles.detailRow}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{selectedPolygon.id}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Casillas:</Text>
        <Text style={styles.value}>{selectedPolygon.casillas}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Color:</Text>
        <View
          style={[
            styles.colorBox,
            { backgroundColor: selectedPolygon.color },
          ]}
        />
      </View>

      {selectedPolygon.conflicto && (
        <View style={styles.conflictWarning}>
          <Text style={styles.conflictText}>⚠️ Este polígono tiene conflictos</Text>
        </View>
      )}

      <View style={styles.coordsSection}>
        <Text style={styles.label}>Coordenadas:</Text>
        {selectedPolygon.coordenadas.map((coord, index) => (
          <Text key={index} style={styles.coordText}>
            [{coord[0].toFixed(3)}, {coord[1].toFixed(3)}]
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
  colorBox: {
    width: 30,
    height: 30,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  conflictWarning: {
    backgroundColor: '#ffe0e0',
    padding: 10,
    borderRadius: 6,
    marginVertical: 10,
    borderLeftWidth: 4,
    borderLeftColor: 'red',
  },
  conflictText: {
    color: 'red',
    fontWeight: '600',
    fontSize: 12,
  },
  coordsSection: {
    marginTop: 15,
  },
  coordText: {
    fontSize: 12,
    color: '#666',
    marginVertical: 3,
    fontFamily: 'monospace',
  },
});

export default Sidebar;
