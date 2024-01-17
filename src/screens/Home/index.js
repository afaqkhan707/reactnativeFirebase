import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const auth = useSelector((state) => state.auth);
  const navigation = useNavigation();
  // if (!auth.isLoggedIn) {
  //   return;
  // }

  const addTodo = () => {
    navigation.navigate('todo');
  };
  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor='#fff' />

      <View style={styles.header}>
        <Text style={styles.userName}>
          User Name,{auth?.currentUser?.username}
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
        data={DATA}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{
          gap: 10,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
        numColumns={2}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Home;
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    width: '49%',
    height: 80,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
