import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, firestore } from '../../firebase/firebaseConf';
import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import { setCurrentUser, setError, setLoading } from './authSlice';
import { useState } from 'react';

// Handle Signup New User
export const registerUser = (values, navigation) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const resp = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    const userId = resp.user.uid;
    const userDetails = {
      username: values.name,
      email: values.email,
      userId,
    };

    await setDoc(doc(firestore, 'users', userId), userDetails);
    dispatch(setCurrentUser(userDetails));
    navigation.navigate('login');
  } catch (error) {
    dispatch(setError(error.code));
  } finally {
    dispatch(setLoading(false));
  }
};

// Handle Login Old User
export const loginUser = (values, navigation) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const resp = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    const userId = resp.user.uid;

    const userDoc = await getDoc(doc(firestore, 'users', userId));
    const userDetails = userDoc.data();
    dispatch(setCurrentUser(userDetails));
    navigation.navigate('dashboard');
  } catch (error) {
    // console.log('error in login', error);
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const logoutUser = (navigation) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    await signOut(auth);
    dispatch(setCurrentUser(null));
    // Clear any additional user-related state if needed
    navigation.navigate('login');
  } catch (error) {
    // console.error('Error in logoutUser:', error);
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const postTodo = (todo, userId, navigation) => async (dispatch) => {
  try {
    const postTodo = {
      title: todo.title,
      description: todo.description,
      userId,
    };
    const resp = await addDoc(collection(firestore, 'todos'), postTodo);
    navigation.navigate('dashboard');
    // console.log(resp, 'setData');
  } catch (error) {
    // console.log('error in todo', error.message);
  }
};

// export const fetchTodos = () => async () => {
//   const [todos, setTodos] = useState([]);
//   const q = query(collection(db, 'todos'));
//   onSnapshot(q, (querySnapshot) => {
//     const notes = [];
//     querySnapshot.forEach((doc) => {
//       notes.push({ ...doc.data(), id: doc.id });
//     });
//     setTodos(notes);
//     console.log('notes', doc);
//   });
// };
// const fetchTodos = await getDocs(collection(firestore, 'todos'));
// fetchTodos.forEach((item) => console.log('object item', item));
// console.log('data from api', fetchTodos);
// };
