import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

function TareaItem({ tarea }) {
  return (
    <View style={styles.tarjetaTarea}>
      <Text style={styles.textoTarea}>{tarea.texto}</Text>
    </View>
  );
}

export default function App() {
  const [texto, setTexto] = useState('');
  const [tareas, setTareas] = useState([]);

  function agregarTarea() {
    const textoLimpio = texto.trim();
    if (textoLimpio === '') return; // no agregar vacías ni solo espacios

    const nuevaTarea = {
      id: Date.now().toString(),
      texto: textoLimpio,
    };

    setTareas((actuales) => [...actuales, nuevaTarea]); // sin mutar
    setTexto('');
  }

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

      
        <View style={styles.tarjetaEntrada}>
          <View style={styles.cajaInput}>
            <Ionicons name="create-outline" size={18} color="#7C7FE0" />
            <TextInput
              style={styles.input}
              value={texto}
              onChangeText={setTexto}
              placeholder="Escribe una nueva tarea…"
              placeholderTextColor="#9AA0C8"
            />
          </View>

          <Pressable style={styles.botonAgregar} onPress={agregarTarea}>
            <Ionicons name="add" size={20} color="white" />
            <Text style={styles.textoBotonAgregar}>Añadir tarea</Text>
          </Pressable>
        </View>

        
        <FlatList
          data={tareas}
          contentContainerStyle={styles.listaContenido}
          renderItem={({ item }) => <TareaItem tarea={item} />}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text style={styles.textoVacio}>
              No tienes tareas todavía. ¡Agrega la primera!
            </Text>
          }
        />
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
    backgroundColor: '#5B5FEF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  tituloEncabezado: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F1F3D',
  },
  tarjetaEntrada: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  cajaInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEFFC',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: '#1F1F3D',
  },
  botonAgregar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5B5FEF',
    borderRadius: 12,
    paddingVertical: 12,
  },
  textoBotonAgregar: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 6,
  },
  listaContenido: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  tarjetaTarea: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E7E7F5',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  textoTarea: {
    fontSize: 15,
    color: '#1F1F3D',
  },
  textoVacio: {
    textAlign: 'center',
    color: '#9AA0C8',
    marginTop: 40,
    fontSize: 14,
  },
});
