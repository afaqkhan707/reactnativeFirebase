import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import MyButton from '../../components/custom-button';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { StatusBar } from 'expo-status-bar';
import { loginSchema } from '../../schemas/formikSchemas';

const Login = () => {
  const navigation = useNavigation();

 

  const handleSubmit = (values) => {
    console.log('Submitted values:', values);
  };
  const handleSignupNavigation = () => {
    navigation.navigate('signup');
  };
  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor='white' />
      <Text style={styles.heading}>Login</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, values, errors, touched }) => (
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
              // disabled={!values.isValid}
            />
            <MyButton title='Signup' onPress={handleSignupNavigation} />
          </>
        )}
      </Formik>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
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
});
