import React from 'react';
import {StyleSheet, Text, Image, ScrollView} from 'react-native';
import {Divider} from 'react-native-elements';
import Label from './Label';

export default function FullMovie({route}) {
  const {posterImg, data} = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.poster} source={{uri: posterImg}} />
      <Label label='Title' value={data.Title} />
      <Label label='Year' value={data.Year} />
      <Label label='Genre' value={data.Genre} />
      <Divider style={styles.divider}/>
      <Label label='Director' value={data.Director} />
      <Label label='Actors' value={data.Actors} />
      <Divider style={styles.divider}/>
      <Label label='Country' value={data.Country} />
      <Label label='Language' value={data.Language} />
      <Label label='Rated' value={data.Rated} />
      <Label label='Production' value={data.Production} />
      <Label label='Released' value={data.Released} />
      <Label label='Runtime' value={data.Runtime} />
      <Divider style={styles.divider}/>
      <Label label='Awards' value={data.Awards} />
      <Label label='IMDb Rating' value={data.imdbRating} />
      <Label label='IMDb Votes' value={data.imdbVotes} />
      <Divider style={styles.divider}/>
      <Text style={styles.footer}><Text style={styles.label}>Plot: </Text>{data.Plot || 'Unknown'}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        paddingTop: 35,
        paddingHorizontal: 17.5,
        backgroundColor: '#fff',
    },
    poster: {
        alignSelf: 'center',
        width: 250,
        height: 400,
        marginBottom: 25,
    },
    label: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    divider: {
        marginVertical: 15,
        backgroundColor: '#000',
    },
    footer: {
        paddingBottom: 75,
    },
});
