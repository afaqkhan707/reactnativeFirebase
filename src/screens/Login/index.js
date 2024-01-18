import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import MyButton from '../../components/custom-button';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { StatusBar } from 'expo-status-bar';
import { loginSchema } from '../../schemas/formikSchemas';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/firebaseActions';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSignupNavigation = () => {
    navigation.navigate('signup');
  };
  const auth = useSelector((state) => state.auth);
  const initialValues = {
    email: '',
    password: '',
  };
  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor='white' />
      <Text style={styles.heading}>Login</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          console.log('values', values);
          dispatch(loginUser(values, navigation));
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
          <>
            <TextInput
              placeholder='Enter Email'
              name='email'
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              style={styles.input}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <TextInput
              placeholder='Enter Password'
              name='password'
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              style={styles.input}
              secureTextEntry={true}
            />

            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <MyButton
              title='Login'
              onPress={() => handleSubmit(values)}
              disabled={!values.isValid}
              isLoading={auth.isLoading}
            />
            <View style={styles.view}>
              <Text>Already have an account?</Text>
              <Text style={styles.link} onPress={handleSignupNavigation}>
                Login
              </Text>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    // width: '100%',
    // height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    marginBottom: 10,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: '100%',
    borderWidth: 1,
    borderColor: 'grey',
    marginTop: 8,
    borderRadius: 7,
  },
  errorText: {
    color: 'red',
  },
  view: {
    flexDirection: 'row',
    marginTop: 10,
  },
  link: {
    color: '#0000ff',
    marginLeft: 10,
  },
});
