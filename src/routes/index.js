import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Dashboard from '../screens/Dashboard';
import Todo from '../screens/Todo';
import Profile from '../screens/Account';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentUser,
  setError,
  setIsLoadingPage,
} from '../redux/slices/authSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';

import { auth, firestore } from '../firebase/firebaseConf';
import LoadingPage from '../components/custom-loading';
const Stack = createNativeStackNavigator();

const MyStack = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLoadingPage(true));
  }, []);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isLoadingPage = useSelector((state) => state.auth.isLoadingPage);

  const checkUser = async () => {
    dispatch(setIsLoadingPage(true));

    try {
      await onAuthStateChanged(auth, async (user) => {
        console.log('User', user?.uid);
        if (user) {
          const userId = user.uid;
          const userDoc = await getDoc(doc(firestore, 'users', userId));
          // console.log('userDoc', userDoc);
          if (userDoc.exists()) {
            const userDetails = userDoc.data();
            dispatch(
              setCurrentUser({
                userDetails: userDetails,
                status: true,
                error: null,
              })
            );
          } else {
            dispatch(setError('User not Found'));
          }
        } else {
          dispatch(
            setCurrentUser({
              userDetails: null,
              status: false,
              error: null,
            })
          );
          // dispatch(setIsLoadingPage(false));
        }
      });
    } catch (err) {
      dispatch(setError('User Error', err));
    } finally {
      dispatch(setIsLoadingPage(false));
    }
  };

  useEffect(() => {
    checkUser();
    console.log(' status', isLoggedIn);
  }, [!isLoggedIn]);

  if (isLoadingPage) {
    return <LoadingPage />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'dashboard' : 'login'}>
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
