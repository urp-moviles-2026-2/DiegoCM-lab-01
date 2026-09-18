import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
 return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.contenedor}
        edges={['top', 'left', 'right', 'bottom']}
      >
        
        <View style={styles.encabezado}>
          <View style={styles.iconoCheck}>
            <Ionicons name="checkmark" size={20} color="white" />
          </View>
          <Text style={styles.tituloEncabezado}>Tareas</Text>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#F1F0FB',
  },
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  iconoCheck: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#6cef5b',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  tituloEncabezado: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F1F3D',
  },
 
});
