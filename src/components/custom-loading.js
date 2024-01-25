import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';

const LoadingPage = () => {
  //   const isLoadingPage = useSelector((state) => state.auth.isLoadingPage);

  return (
    <View style={styles.container}>
      <Text>Welcome Todo </Text>
      <Text>Please Waiting </Text>
      <ActivityIndicator size='large' color='#2196F3' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
});

export default LoadingPage;
