import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import { getAuth, initializeAuth } from 'firebase/auth';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: 'AIzaSyDO9tuoshNM4m8HocmVPkVkeR5rS4JTOEo',
  authDomain: 'todo-reactnativefirebase.firebaseapp.com',
  projectId: 'todo-reactnativefirebase',
  storageBucket: 'todo-reactnativefirebase.appspot.com',
  messagingSenderId: '526201475157',
  appId: '1:526201475157:web:f4664711cc641176fe44dc',
};
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

// const auth = initializeApp(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });
// const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth, firestore };
