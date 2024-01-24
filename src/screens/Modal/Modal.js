import React, { useState, useEffect } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { removeTodo, updateTodo } from '../../redux/slices/firebaseActions';
import CustomModalDelete from '../../components/custom-modal';
import { useNavigation } from '@react-navigation/native';

const MyModal = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [editTodo, setEditTodo] = useState({ title: '', description: '' });
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    setEditTodo(item);
  }, [item]);

  const deleteTodo = (todoId) => {
    dispatch(removeTodo(todoId));
  };

  const closeModal = () => {
    setIsEditable(false);
    setModalVisible(!modalVisible);
  };
  const updateTodoHandle = (updateTodoId) => {
    dispatch(updateTodo(editTodo, updateTodoId));
    setIsEditable(false);
    setModalVisible(!modalVisible);
    navigation.navigate('Home');
  };
  return (
    <>
      {/* <StatusBar translucent={false} backgroundColor='#000' /> */}
      <Pressable
        style={[styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text>{item.title}</Text>
      </Pressable>

      <View style={styles.centeredView}>
        <Modal
          animationType='fade'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={closeModal}
            >
              <Entypo name='cross' size={24} color='black' />
            </Pressable>
            <View style={styles.modalView}>
              {isEditable ? (
                <TouchableOpacity style={styles.todo}>
                  <TextInput
                    onChangeText={(title) =>
                      setEditTodo((prevTodo) => ({ ...prevTodo, title }))
                    }
                    value={editTodo.title}
                  />
                </TouchableOpacity>
              ) : (
                <Text style={styles.titleText}>{editTodo.title}</Text>
              )}
              {isEditable ? (
                <TouchableOpacity style={styles.todo}>
                  <TextInput
                    onChangeText={(description) =>
                      setEditTodo((prevTodo) => ({ ...prevTodo, description }))
                    }
                    value={editTodo.description}
                    multiline
                    numberOfLines={5}
                  />
                </TouchableOpacity>
              ) : (
                <Text style={styles.modalText}>{editTodo.description}</Text>
              )}
              <View style={styles.bottomNote}>
                <TouchableOpacity style={styles.iconCss}>
                  <CustomModalDelete
                    title='Are you sure you want to delete the document?'
                    okText='Delete'
                    cancelText='Cancel'
                    type='icon'
                    onPress={() => deleteTodo(item.id)}
                  />
                </TouchableOpacity>
                {isEditable && (
                  <TouchableOpacity
                    onPress={() => updateTodoHandle(item.id)}
                    style={styles.iconCss}
                  >
                    <AntDesign name='save' size={24} color='black' />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => setIsEditable(true)}
                  style={styles.iconCss}
                >
                  <AntDesign name='edit' size={24} color='black' />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, .6);',
    // padding: 20,
    paddingHorizontal: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    minHeight: 400,
    minWidth: '100%',
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#4C9EEB',
    borderRadius: 8,
    elevation: 4,
    paddingHorizontal: 20,
    paddingVertical: 55,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  title: {
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleText: {
    marginBottom: 15,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    textAlign: 'center',
    fontSize: 24,
  },
  bottomNote: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 1,
    borderRadius: 16,
    bottom: 20,
  },
  todo: {
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginBottom: 10,
  },
  iconCss: {
    padding: 8,
  },
});

export default MyModal;
