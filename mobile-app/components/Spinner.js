import React from 'react';
import {ScrollView, ActivityIndicator, StyleSheet} from 'react-native';

const Spinner = () => (
  <ScrollView contentContainerStyle={[styles.container, styles.horizontal]}>
    <ActivityIndicator size='large' color='blue' />
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default Spinner;
