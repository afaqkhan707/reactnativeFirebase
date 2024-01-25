import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from 'react-native';
import Button from './custom-button';
import { AntDesign } from '@expo/vector-icons';

const CustomModalDelete = ({
  title,
  okText,
  cancelText,
  onPress,
  type,
  isLoading,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOk = () => {
    onPress();
    setModalVisible(false);
  };

  return (
    <>
      {type == 'logout' && (
        <Button
          title='Logout'
          onPress={() => setModalVisible(true)}
          isLoading={isLoading}
        />
      )}
      {type == 'icon' && (
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <AntDesign name='delete' size={24} color='black' />
        </TouchableOpacity>
      )}
      <View style={styles.container}>
        <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{title}</Text>
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.buttonDelete]}
                onPress={handleOk}
              >
                <Text style={styles.textStyle}>{okText}</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>{cancelText}</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .6);',
    backgroundColor: 'red',
  },
  modalView: {
    position: 'fixed',
    top: '50%',
    // bottom: 50%,
    // left: '50%',
    // right: 0,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
    flex: 1,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
    borderRadius: 8,
    flex: 1,
  },
  openBtnText: {
    backgroundColor: 'green',
  },
  buttonDelete: {
    backgroundColor: 'red',
  },
  buttonCancel: {
    backgroundColor: 'black',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default CustomModalDelete;
