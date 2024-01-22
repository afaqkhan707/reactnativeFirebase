import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Dashboard from '../screens/Dashboard';
import Todo from '../screens/Todo';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='login'>
        <Stack.Screen
          name='login'
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='signup'
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='dashboard'
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='todo'
          component={Todo}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
