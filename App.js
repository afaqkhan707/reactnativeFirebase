import { StyleSheet } from 'react-native';
import MyStack from './src/routes';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <MyStack />
    </Provider>
  );
}

