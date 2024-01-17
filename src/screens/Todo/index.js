import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import Button from '../../components/custom-button';
import { postTodo } from '../../redux/slices/firebaseActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Todo = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userId = useSelector((state) => state.auth.currentUser.userId);
  const [todo, setTodo] = useState({ title: '', description: '' });
  const handleTodo = () => {
    dispatch(postTodo(todo, userId, navigation));
  };
  const handleCancelTodo = () => {
    navigation.goBack('dashboard');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Todo Here</Text>
      <TouchableOpacity style={styles.title}>
        <TextInput
          placeholder='Enter Title'
          onChangeText={(title) =>
            setTodo((prevTodo) => ({ ...prevTodo, title }))
          }
          value={todo.title}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.description}>
        <TextInput
          placeholder='Enter Description'
          onChangeText={(description) =>
            setTodo((prevTodo) => ({ ...prevTodo, description }))
          }
          value={todo.description}
          multiline
          numberOfLines={5}
        />
      </TouchableOpacity>
      <View style={styles.buttons}>
        <Button title='Cancel' onPress={handleCancelTodo} />
        <Button title='Add' onPress={handleTodo} />
      </View>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    gap: 20,
  },
  heading: {
    fontSize: 30,
  },
  title: {
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#1E9B1F',
    padding: 10,
  },
  description: {
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#1E9B1F',
    padding: 10,
    // height: 200,
  },
  buttons: {
    width: '40%',
    flexDirection: 'row',
    gap: 60,
  },
});
