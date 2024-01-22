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
  deleteDoc,
  where,
  query,
} from 'firebase/firestore';
import { setCurrentUser, setError, setLoading, setLogout } from './authSlice';
import { addTodo, setLoadingAdd } from '../slices/todoSlice';

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
    dispatch(
      setCurrentUser({ userDetails: userDetails, status: true, error: null })
    );
    navigation.navigate('dashboard');
  } catch (error) {
    // console.log('error in login', error);
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const Logout = (navigation) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    await signOut(auth);
    dispatch(setCurrentUser({ userDetails: null, status: false, error: null }));
    console.log('Logout successful');
    // navigation.navigate('signup');
  } catch (error) {
    console.error('Error in logoutUser:', error);
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const postTodo = (todo, userId, navigation) => async (dispatch) => {
  try {
    dispatch(setLoadingAdd(true));
    const postTodo = {
      title: todo.title,
      description: todo.description,
      userId,
    };
    const resp = await addDoc(collection(firestore, 'todos'), postTodo);
    navigation.navigate('Home');
  } catch (error) {
    console.log('error in todo', error.message);
  } finally {
    dispatch(setLoadingAdd(false));
  }
};

export const removeTodo = (todoId) => async (dispatch) => {
  try {
    const deletedTodo = await deleteDoc(doc(firestore, 'todos', todoId));
  } catch (error) {
    console.log('deleting Todo Error', error.message);
  } finally {
  }
};

export const fetchTodos = (userId) => async (dispatch) => {
  const docRef = query(
    collection(firestore, 'todos'),
    where('userId', '==', userId)
  );
  onSnapshot(docRef, (snapshot) => {
    const todo = [];
    snapshot.forEach((doc) => {
      todo.push({ ...doc.data(), id: doc.id });
    });
    dispatch(addTodo(todo));
    // console.log(todo, 'todo');
  });
};

// export const LoggedUser = () => async (dispatch) => {
//   await onAuthStateChanged(auth, (user) => {
//     if (user) {
//       dispatch(setCurrentUser(user));
//     } else {
//       dispatch(setCurrentUser(null));
//     }
//   });
// };
