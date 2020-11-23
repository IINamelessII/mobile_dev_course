import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native'

const Movie = ({data}) => {
  const [posterImg, setPosterImg] = useState('data:image/png;base64,');
  const navigation = useNavigation();

  const openFullMovie = () => {
    navigation.navigate('Full Movie', {posterImg, data});
  };

  useEffect(() => {
    (async () => {
      if (!data.Poster) {
        return;
      }

      let response = await fetch('https://de57b61d0341.ngrok.io/static/posters/' + data.Poster);
      let responseBlob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(responseBlob);
      reader.onloadend = () => setPosterImg(reader.result);
    })();
  }, []);

  return (
    <TouchableOpacity onPress={openFullMovie}>
      <View style={styles.wrapper}>
        <Image
          source={{uri: posterImg}}
          style={styles.poster}
        />
        <View style={styles.info}>
          <Text style={styles.text}>{data.Title}</Text>
          <Text style={styles.text}>{data.Year}</Text>
          <Text style={styles.text}>{data.Type}</Text>
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
});

export default Movie;
