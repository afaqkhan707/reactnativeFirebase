import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home';
import Settings from '../Settings';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Todo from '../Todo';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Dashboard = () => {
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
