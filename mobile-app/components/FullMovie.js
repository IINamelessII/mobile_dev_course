import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, ScrollView} from 'react-native';
import {Divider} from 'react-native-elements';
import Label from './Label';
import Spinner from './Spinner';
import Image from 'react-native-image-progress';

const FullMovie = ({route}) => {
  const {imdbId} = route.params;
  const [movieData, setMovieData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const url = `http://www.omdbapi.com/?apikey=7e9fe69e&i=${imdbId}`;

    (async () => {
      setIsLoading(true);

      const response = await fetch(url);
      const responseData = await response.json();

      setMovieData(responseData);
      setIsLoading(false);
    })();
  }, []);

  return isLoading ? <Spinner /> : (
    <ScrollView style={styles.container}>
      <Image
        style={styles.poster}
        source={{uri: movieData.Poster}}
        indicator={Spinner}
        threshold={100}
      />
      <Label label='Title' value={movieData.Title} />
      <Label label='Year' value={movieData.Year} />
      <Label label='Genre' value={movieData.Genre} />
      <Divider style={styles.divider}/>
      <Label label='Director' value={movieData.Director} />
      <Label label='Actors' value={movieData.Actors} />
      <Divider style={styles.divider}/>
      <Label label='Country' value={movieData.Country} />
      <Label label='Language' value={movieData.Language} />
      <Label label='Rated' value={movieData.Rated} />
      <Label label='Production' value={movieData.Production} />
      <Label label='Released' value={movieData.Released} />
      <Label label='Runtime' value={movieData.Runtime} />
      <Divider style={styles.divider}/>
      <Label label='Awards' value={movieData.Awards} />
      <Label label='IMDb Rating' value={movieData.imdbRating} />
      <Label label='IMDb Votes' value={movieData.imdbVotes} />
      <Divider style={styles.divider}/>
      <Text style={styles.footer}><Text style={styles.label}>Plot: </Text>{movieData.Plot || 'Unknown'}</Text>
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

export default FullMovie;
