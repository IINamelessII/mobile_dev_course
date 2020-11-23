import React from 'react';
import {StyleSheet, Text} from 'react-native';

export default function Label({label, value}) {
  return (
    <Text>
      <Text style={styles.label}>{label}: </Text>
      {value || 'Unknown'}
    </Text>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    fontWeight: "bold"
  }
});
