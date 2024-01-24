import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Dashboard from '../screens/Dashboard';
import Todo from '../screens/Todo';
import Profile from '../screens/Account';
import { useDispatch, useSelector } from 'react-redux';
import { LoggedUser } from '../redux/slices/firebaseActions';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  const dispatch = useDispatch();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(LoggedUser());
    setIsUserLoggedIn(isLoggedIn);
    console.log('first value', isUserLoggedIn);
  }, []);

  useEffect(() => {
    console.log('2nd value', isLoggedIn);
    setIsUserLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={!isUserLoggedIn ? 'login' : 'dashboard'}
      >
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
        <Stack.Screen
          name='profile'
          component={Profile}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
