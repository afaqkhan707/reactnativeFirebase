import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { fetchTodos } from '../../redux/slices/firebaseActions';
import { firestore } from '../../firebase/firebaseConf';
import { query, collection, onSnapshot } from 'firebase/firestore';
import MyModal from '../Modal/Modal';

const Home = () => {
  const auth = useSelector((state) => state.auth);
  const userId = useSelector((state) => state.auth.currentUser.userId);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const addTodo = () => {
    navigation.navigate('todo');
  };
  const [todos, setTodos] = useState();

  if (!auth.isLoggedIn) {
    return;
  }

  useEffect(() => {
    if (userId) dispatch(fetchTodos(userId));
  }, []);

  const todosList = useSelector((state) => state.todo.todos);
  useEffect(() => {
    setTodos(todosList);
    console.log('todos', todosList);
  }, [todosList]);
  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor='#fff' />

      <View style={styles.header}>
        <Text style={styles.userName}>
          Welcome ,{auth?.currentUser?.username}
        </Text>
        <TouchableOpacity style={styles.addIcon}>
          <Feather
            name='plus-square'
            size={24}
            color='black'
            onPress={addTodo}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        contentContainerStyle={{
          gap: 10,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <MyModal item={item} />
          </TouchableOpacity>
        )}
        numColumns={2}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    flex: 1,
  },
  card: {
    width: '49%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  userName: {
    fontSize: 20,
  },
  addIcon: { paddingHorizontal: 10, paddingVertical: 10 },
});
