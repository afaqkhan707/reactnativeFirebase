import React, { useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { removeTodo } from '../../redux/slices/firebaseActions';
import CustomModalDelete from '../../components/custom-modal';
const MyModal = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const deleteTodo = (todoId) => {
    dispatch(removeTodo(todoId));
    console.log('todoId', todoId);
  };
  return (
    <>
      {/* <StatusBar translucent={false} backgroundColor='#fff' /> */}
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
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Entypo name='cross' size={24} color='black' />
            </Pressable>
            <View style={styles.modalView}>
              <Text style={styles.titleText}>{item.title}</Text>
              <Text style={styles.modalText}>{item.description}</Text>

              <View style={styles.bottomNote}>
                <TouchableOpacity>
                  <CustomModalDelete
                    icon={<AntDesign name='delete' size={24} color='black' />}
                    onPress={() => deleteTodo(item.id)}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
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
    backgroundColor: 'pink',
    padding: 12,
    borderRadius: 16,
    bottom: 20,
  },
});

export default MyModal;
