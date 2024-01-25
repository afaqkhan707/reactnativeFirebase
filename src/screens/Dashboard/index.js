import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home';
import { StyleSheet, Text } from 'react-native';
import Settings from '../Settings';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Todo from '../Todo';
import { Entypo } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

const Dashboard = () => {
  const auth = useSelector((state) => state.auth);

  if (!auth.isLoggedIn) {
    return <Text>Please Login</Text>;
  }

  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: () => <AntDesign name='home' size={24} color='black' />,
        }}
      />
      <Tab.Screen
        name='Add Note'
        component={Todo}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Entypo name='add-to-list' size={24} color='black' />
          ),
        }}
      />
      <Tab.Screen
        name='Settings'
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons name='settings-outline' size={24} color='black' />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
