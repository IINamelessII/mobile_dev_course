import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, SafeAreaView, TextInput, TouchableOpacity, Text} from 'react-native';
import Movie from './Movie';

const Movies = () => {
  const [enteredQuery, setEnteredQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const formattedQuery = enteredQuery.trim().toLowerCase();

    if (formattedQuery.length >= 3) {
      const url = `http://www.omdbapi.com/?apikey=7e9fe69e&s=${formattedQuery}&page=1`;

      (async () => {
        const response = await fetch(url);
        const responseData = await response.json();

        if (responseData.Search !== undefined) {
          setFilteredMovies(responseData.Search);
        }
        setIsLoaded(responseData.Response !== 'False');
      })();
    }
  }, [enteredQuery]);

  const removeMovieHandler = imdbId => {
    setFilteredMovies(currentMovies => currentMovies.filter(mv => mv.imdbID === imdbId));
  };

  const renderMovie = movie => (
    <TouchableOpacity>
      <Movie data={movie.item} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.search}
        numberOfLines={1}
        autoCapitalize='none'
        autoCorrect={false}
        clearButtonMode='always'
        placeholder='Start typing a Title...'
        value={enteredQuery}
        onChangeText={setEnteredQuery}
      />
      {
        filteredMovies?.length !== 0 && isLoaded
          ? <FlatList data={filteredMovies} renderItem={renderMovie} keyExtractor={mv => mv.imdbID} />
          : <Text style={styles.empty}>There are no Movies with requested Title</Text>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  search: {
    marginHorizontal: 20,
    paddingVertical: 6.5,
    paddingHorizontal: 12.5,
    borderRadius: 7.5,
    backgroundColor: 'white',
    color: 'black',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 5,
  },
  empty: {
    alignSelf: 'center',
    height: '100%',
    lineHeight: 75,
  },
});

export default Movies;
