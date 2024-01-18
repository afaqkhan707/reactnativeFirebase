import React, { useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  StatusBar,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
const MyModal = ({ title, description }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Pressable
        style={[styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>{title}</Text>
      </Pressable>
      <View style={styles.centeredView}>
        <StatusBar translucent={false} backgroundColor='#fff' />

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
              <Text style={styles.modalText}>{title}</Text>
              <Text style={styles.modalText}>{description}</Text>
              {/* <View style={styles.bottomNote}>
                <AntDesign name='delete' size={24} color='black' />
                <AntDesign name='edit' size={24} color='black' />
              </View> */}
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
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, .5);',
    padding: 20,
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
    backgroundColor: '#F194FF',
    borderRadius: 16,
    // width: '30%',
    padding: 10,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: '#333',
    fontWeight: 'bold',
    // textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
//   bottomNote: {
//     flexDirection: 'row',
//   },
});

export default MyModal;
