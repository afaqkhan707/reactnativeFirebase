import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';

const CustomModalDelete = ({ icon, onPress }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
    onPress();
    setModalVisible(false);
  };

  return (
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
          <Text style={styles.modalText}>
            Are you sure you want to delete the document?
          </Text>
          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.buttonDelete]}
              onPress={handleDelete}
            >
              <Text style={styles.textStyle}>Delete</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonCancel]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        // style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text>{icon}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2, // Negative height to move the shadow below
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
