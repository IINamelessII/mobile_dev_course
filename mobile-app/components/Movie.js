import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Movie = ({title, year, type, poster}) => {
  const [posterImg, setPosterImg] = useState(null);

  useEffect(() => {
    (async () => {
      let response = await fetch('https://8aebb2537381.ngrok.io/static/posters/' + poster);
      let responseBlob = await response.blob();
      setPosterImg(responseBlob);
    })();
  }, []);

  return (
    <View style={styles.wrapper}>
      <Image style={styles.poster} source={posterImg}></Image>
      <View style={styles.info}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>{year}</Text>
        <Text style={styles.text}>{type}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    margin: 1.5,
    padding: 20,
    borderBottomWidth: .2,
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