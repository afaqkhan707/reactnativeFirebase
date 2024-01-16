import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { HandleSignIn } from '../../redux/Actions/actions';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import Button from '../../components/button';

const loginSchema = yup.object().shape({
  email: yup.string().label('email').email().required(),
  password: yup
    .string()
    .label('password')
    .required()
    .min(6, 'Seems a bit shot...')
    .max(12, 'Too long, try a shot password'),
});

const Login = () => {
  const [isSignupLoading, setIsSignUploading] = useState(false);
  const [isLoginLoading, setIsLoginloading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSignupBtn = () => {
    navigation.navigate('signup');
  };
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={(values) => {
        try {
          setIsLoginloading(true);
          dispatch(HandleSignIn(values.email, values.password));
        } catch (e) {
          console.log(e, 'error');
        } finally {
          setIsLoginloading(false);
        }
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <StatusBar translucent={false} backgroundColor='white' />
          <Text style={styles.heading}>Login</Text>
          <TextInput
            style={styles.inputFields}
            placeholder='email'
            onChangeText={handleChange('email')}
            value={values.email}
            onBlur={handleBlur('email')}
          />
          <TextInput
            style={styles.inputFields}
            placeholder='password'
            onChangeText={handleChange('password')}
            value={values.password}
            onBlur={handleBlur('password')}
            secureTextEntry
          />
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          {touched.email && errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}{' '}
          <Button
            isloading={isLoginLoading}
            title={'Login'}
            onPress={handleSubmit}
          />
          <Button
            isloading={false}
            title={'Signup'}
            onPress={handleSignupBtn}
          />
        </View>
      )}
    </Formik>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
    backgroundColor: 'white',
  },
  inputFields: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  heading: {
    fontSize: 20,
    fontFamily: 'mon-b',
  },
  loginButton: {
    backgroundColor: '#F9ED32',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    // width:200
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'mon-r',
    textAlign: 'center',
  },
});
