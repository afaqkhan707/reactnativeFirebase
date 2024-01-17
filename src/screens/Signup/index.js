import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import MyButton from '../../components/custom-button';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { signupSchema } from '../../schemas/formikSchemas';

const Signup = () => {
  const navigation = useNavigation();

  const handleLoginNavigation = () => {
    navigation.navigate('login');
  };
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  };
  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor='#fff' />
      <Text style={styles.heading}>Sign Up</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={signupSchema}
        onSubmit={(values) => {
          console.log('values', values);
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
              placeholder='Enter Name'
              name='name'
              value={values.name}
              onChangeText={handleChange('name')}
              style={styles.input}
            />
            {touched.name && errors.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}
            <TextInput
              placeholder='Enter Email'
              name='email'
              onChangeText={handleChange('email')}
              value={values.email}
              onBlur={handleBlur('email')}
              style={styles.input}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <TextInput
              placeholder='Enter Password'
              name='password'
              onChangeText={handleChange('password')}
              value={values.password}
              onBlur={handleBlur('password')}
              secureTextEntry={true}
              style={styles.input}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <TextInput
              placeholder='Confirm Password'
              name='confirm_password'
              onChangeText={handleChange('confirm_password')}
              value={values.confirm_password}
              onBlur={handleBlur('confirm_password')}
              secureTextEntry={true}
              style={styles.input}
            />
            {touched.confirm_password && errors.confirm_password && (
              <Text style={styles.errorText}>{errors.confirm_password}</Text>
            )}
            <MyButton title='Signup' onPress={handleSubmit} />
          </>
        )}
      </Formik>
      <MyButton title='Login' onPress={handleLoginNavigation} />
    </View>
  );
};

export default Signup;

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
