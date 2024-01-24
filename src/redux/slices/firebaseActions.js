import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
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
  updateDoc,
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
    setCurrentUser({ userDetails: userDetails, status: true, error: null });
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
    console.log('error in login', error.code);
    dispatch(setError(error.code));
  } finally {
    dispatch(setLoading(false));
  }
};

export const Logout = (navigation) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    await signOut(auth);
    dispatch(setCurrentUser({ userDetails: null, status: false, error: null }));
    dispatch(addTodo([]));
    console.log('Logout successful');
    navigation.navigate('login');
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
export const updateTodo = (localTodo, todoId) => async (dispatch) => {
  const title = localTodo.title;
  const description = localTodo.description;

  console.log('title', title);
  console.log('title', description);

  try {
    updateDoc(doc(firestore, 'todos', todoId), {
      title,
      description,
    });
  } catch (error) {
    console.log('updating Todo Error', error.message);
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
  });
};

export const LoggedUser = () => async (dispatch) => {
  try {
    let userData = null;
    await onAuthStateChanged(auth, (user) => {
      userData = user;
      console.log('userData', user.uid);
    });
    if (userData) {
      const userId = await userData?.uid;
      const userDoc = await getDoc(doc(firestore, 'users', userId));
      const userDetails = userDoc.data();
      dispatch(
        setCurrentUser({ userDetails: userDetails, status: true, error: null })
      );
    }
  } catch (e) {
    // console.log(e, 'is user logged in');
  } finally {
  }
};
