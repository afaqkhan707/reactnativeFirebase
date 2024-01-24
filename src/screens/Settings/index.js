import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../components/custom-button';
import { Logout } from '../../redux/slices/firebaseActions';
import CustomModalDelete from '../../components/custom-modal';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(Logout(navigation));
    navigation.replace('login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.userContainer}>
        <View style={styles.avatarContainer}></View>
        <View>
          <Text style={styles.username}>{auth.currentUser.username}</Text>
          <Text style={styles.email}>{auth.currentUser.email}</Text>
        </View>
      </View>
      <View style={styles.settingsContainer}>
        <TouchableOpacity
          style={styles.settingOption}
          onPress={() => navigation.navigate('profile')}
        >
          <Text>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingOption}
          onPress={() => console.log('Notifications')}
        >
          <Text>Notifications</Text>
        </TouchableOpacity>
      </View>
      {/* <Button
        title='Logout'
        onPress={handleLogout}
        isLoading={auth.isLoading}
      /> */}
      {/* <Button
        style={styles.logoutButton}
        title={
          <CustomModalDelete
            title='Are you sure you want to Logout?'
            okText='Logout'
            cancelText='Cancel'
            onPress={() => handleLogout()}
            openBtn='Logout your Account'
          />
        }
        isLoading={auth.isLoading}
      /> */}

      <CustomModalDelete
        title='Are you sure you want to Logout?'
        okText='Logout'
        cancelText='Cancel'
        onPress={() => handleLogout()}
        type='logout'
        isloading={auth.isLoading}
      />

      {/* isLoading={auth.isLoading} */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'lightblue',
    marginRight: 15,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
  settingsContainer: {
    marginBottom: 20,
  },
  settingOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  logoutButton: {
    backgroundColor: '#F9ED32',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SettingsScreen;
