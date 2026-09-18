import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { Ionicons } from '@expo/vector-icons';


function TareaItem({
  tarea,
  onEliminar,
  editando,
  textoEdicion,
  onIniciarEdicion,
  onCambiarTextoEdicion,
  onGuardarEdicion,
  onCancelarEdicion,
}) {
  return (
    <View style={styles.pista}>
      <ReanimatedSwipeable
        renderRightActions={() => (
          <Pressable
            style={styles.botonEliminar}
            onPress={() => onEliminar(tarea.id)}
          >
            <Ionicons name="trash-outline" size={20} color="white" />
            <Text style={styles.textoEliminar}>Eliminar</Text>
          </Pressable>
        )}
        overshootRight={false}
        enabled={!editando} 
      >
        {editando ? (
        
          <View style={styles.tarjetaTarea}>
            <TextInput
              style={styles.inputEdicion}
              value={textoEdicion}
              onChangeText={onCambiarTextoEdicion}
              autoFocus
            />
            <View style={styles.accionesEdicion}>
              <Pressable
                style={styles.botonIconoGuardar}
                onPress={onGuardarEdicion}
              >
                <Ionicons name="checkmark" size={18} color="white" />
              </Pressable>
              <Pressable
                style={styles.botonIconoCancelar}
                onPress={onCancelarEdicion}
              >
                <Ionicons name="close" size={18} color="#6B6B8D" />
              </Pressable>
            </View>
          </View>
        ) : (
         
          <View style={styles.tarjetaTarea}>
            <Text style={styles.textoTarea}>{tarea.texto}</Text>
            <Pressable
              onPress={() => onIniciarEdicion(tarea)}
              hitSlop={8}
            >
              <Ionicons name="pencil-outline" size={18} color="#9AA0C8" />
            </Pressable>
          </View>
        )}
      </ReanimatedSwipeable>
    </View>
  );
}

export default function App() {
  const [texto, setTexto] = useState('');
  const [tareas, setTareas] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [textoEdicion, setTextoEdicion] = useState('');

  function agregarTarea() {
    const textoLimpio = texto.trim();

    if (textoLimpio === '') {
      Alert.alert('Campo vacío', 'Escribe una tarea antes de añadirla.');
      return;
    }

    const nuevaTarea = {
      id: Date.now().toString(),
      texto: textoLimpio,
    };

    setTareas((actuales) => [...actuales, nuevaTarea]);
    setTexto('');
  }

  function eliminarTarea(id) {
    setTareas((actuales) => actuales.filter((tarea) => tarea.id !== id));
  }

  function iniciarEdicion(tarea) {
    setEditandoId(tarea.id);
    setTextoEdicion(tarea.texto);
  }

  function guardarEdicion() {
    const textoLimpio = textoEdicion.trim();

    if (textoLimpio === '') {
      Alert.alert('Campo vacío', 'La tarea no puede quedar en blanco.');
      return;
    }

    setTareas((actuales) =>
      actuales.map((tarea) =>
        tarea.id === editandoId ? { ...tarea, texto: textoLimpio } : tarea
      )
    );
    setEditandoId(null);
    setTextoEdicion('');
  }

  function cancelarEdicion() {
    setEditandoId(null);
    setTextoEdicion('');
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listaContenido}
            renderItem={({ item }) => (
              <TareaItem
                tarea={item}
                onEliminar={eliminarTarea}
                editando={editandoId === item.id}
                textoEdicion={textoEdicion}
                onIniciarEdicion={iniciarEdicion}
                onCambiarTextoEdicion={setTextoEdicion}
                onGuardarEdicion={guardarEdicion}
                onCancelarEdicion={cancelarEdicion}
              />
            )}
            ListEmptyComponent={
              <Text style={styles.textoVacio}>
                No tienes tareas todavía. ¡Agrega la primera!
              </Text>
            }
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
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
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
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
  pista: {
    backgroundColor: '#E4E4F5',
    borderRadius: 16,
    padding: 4,
    marginBottom: 12,
  },
  tarjetaTarea: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textoTarea: {
    fontSize: 15,
    color: '#1F1F3D',
    flex: 1,
    marginRight: 10,
  },
  inputEdicion: {
    flex: 1,
    fontSize: 15,
    color: '#1F1F3D',
    borderBottomWidth: 1,
    borderBottomColor: '#5B5FEF',
    paddingVertical: 2,
    marginRight: 10,
  },
  accionesEdicion: {
    flexDirection: 'row',
    gap: 8,
  },
  botonIconoGuardar: {
    backgroundColor: '#5B5FEF',
    borderRadius: 8,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonIconoCancelar: {
    backgroundColor: '#EDEFFC',
    borderRadius: 8,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonEliminar: {
    backgroundColor: '#D3373E',
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    borderRadius: 12,
    marginLeft: 6,
  },
  textoEliminar: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  textoVacio: {
    textAlign: 'center',
    color: '#9AA0C8',
    marginTop: 40,
    fontSize: 14,
  },
});