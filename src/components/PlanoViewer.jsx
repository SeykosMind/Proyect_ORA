import React, { useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Svg, { Polygon, Circle } from 'react-native-svg';

const PlanoViewer = ({ polygons, onPolygonPress }) => {
  const [selectedPolygon, setSelectedPolygon] = useState(null);
  const { width: screenWidth } = Dimensions.get('window');

  // Calcular altura manteniendo proporción (asumiendo 16:9)
  const viewerHeight = (screenWidth * 9) / 16;

  const handlePolygonPress = (polygon) => {
    setSelectedPolygon(polygon);
    if (onPolygonPress) {
      onPolygonPress(polygon);
    }
  };

  const normalizedToPixels = (coords) => {
    return coords.map(([x, y]) => [x * screenWidth, y * viewerHeight]);
  };

  const polygonPointsToString = (pixelCoords) => {
    return pixelCoords.map(([x, y]) => `${x},${y}`).join(' ');
  };

  return (
    <View style={{ width: screenWidth, height: viewerHeight, backgroundColor: '#f0f0f0', position: 'relative' }}>
      <Svg width={screenWidth} height={viewerHeight} viewBox={`0 0 ${screenWidth} ${viewerHeight}`}>
        {polygons.map((polygon) => {
          const pixelCoords = normalizedToPixels(polygon.coordenadas);
          const points = polygonPointsToString(pixelCoords);
          const strokeColor = polygon.conflicto ? 'red' : polygon.color;
          const strokeWidth = polygon.conflicto ? 3 : 2;

          return (
            <TouchableOpacity
              key={polygon.id}
              onPress={() => handlePolygonPress(polygon)}
              activeOpacity={0.7}
            >
              <Polygon
                points={points}
                fill={polygon.color}
                fillOpacity={0.6}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
              />
            </TouchableOpacity>
          );
        })}
      </Svg>

      {/* Tooltip cuando se selecciona un polígono */}
      {selectedPolygon && (
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            left: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 10,
            borderRadius: 5,
            zIndex: 100,
          }}
        >
          <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
            ID: {selectedPolygon.id}
          </Text>
          <Text style={{ color: 'white', fontSize: 12 }}>
            Casillas: {selectedPolygon.casillas}
          </Text>
          {selectedPolygon.conflicto && (
            <Text style={{ color: 'red', fontSize: 12, fontWeight: 'bold' }}>
              ⚠️ Conflicto
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

export default PlanoViewer;
