import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Divider} from 'react-native-elements';
import Spinner from './Spinner';
import Image from 'react-native-image-progress';

const Movie = ({data}) => {
  const navigation = useNavigation();

  const openFullMovie = () => {
    navigation.navigate('Full Movie', {imdbId: data.imdbID});
  };

  return (
    <TouchableOpacity onPress={openFullMovie}>
      <View style={styles.wrapper}>
        <Image
          style={styles.poster}
          source={{uri: data.Poster}}
          onPress={openFullMovie}
          indicator={Spinner}
          threshold={100}
        />
        <View style={styles.info}>
          <Text style={styles.text}>{data.Title}</Text>
          <Text style={styles.text}>{data.Year}</Text>
          <Text style={styles.text}>{data.Type}</Text>
          <Divider style={styles.divider} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    margin: 1.5,
    padding: 20,
  },
  poster: {
    width: 85,
    height: 135,
  },
  info: {
    flex: 1,
    marginLeft: 15,
  },
  text: {
    marginBottom: 5,
  },
  divider: {
    backgroundColor: 'black',
  },
});

export default Movie;
