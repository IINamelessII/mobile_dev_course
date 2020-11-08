import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const InfoTab = () => {
  return (
    <View style={styles.container}>
      <Text>Yea, another Hello World ¯\_(ツ)_/¯</Text>
      <Text>Made by: Oleh Serikov from IV-72</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default InfoTab;
