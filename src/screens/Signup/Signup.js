import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import MyButton from '../../components/custom-button';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const handleSignup = () => {
    navigation.navigate('login');
  };
  const handleLoginNavigation = () => {
    navigation.navigate('login');
  };
  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor='#fff' />
      <Text style={styles.heading}>Sign Up</Text>
      <TextInput
        placeholder='Enter your Name'
        name='name'
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />
      <TextInput
        placeholder='Enter your Email'
        name='email'
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder='Enter your Password'
        name='email'
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        style={styles.input}
      />
      <MyButton title='Signup' onPress={handleSignup} />
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
