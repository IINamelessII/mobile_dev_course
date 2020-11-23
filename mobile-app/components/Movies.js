import React, {useState} from 'react';
import {StyleSheet, FlatList, ScrollView, SafeAreaView, TextInput, TouchableOpacity, Text} from 'react-native';
import Swipeout from 'react-native-swipeout';
import Movie from './Movie';

const Movies = ({movies, onRemoveMovie}) => {
  const [enteredQuery, setEnteredQoery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([...movies]);

  const enteredQueryHandler = query => {
    setEnteredQoery(query);

    query = query.trim().toLowerCase();
    setFilteredMovies(movies.filter(mv => mv.Title.toLowerCase().includes(query)));
  };

  const removeMovieHandler = imdbId => {
    onRemoveMovie(imdbId);
    setFilteredMovies(currentMovies => currentMovies.filter(mv => mv.imdbID === imdbId));
  };

  const renderMovie = movie => {
    const swipeoutParams = [{
      text: '-',
      sensitivity: 80,
      backgroundColor: 'red',
      underlayColor: 'transparent',
      onPress: () => removeMovieHandler(movie.item.imdbID),
    }];

    return (
      <Swipeout
        autoclose={true}
        backgroundColor='transparent'
        right={swipeoutParams}
      >
        <TouchableOpacity>
          <Movie data={movie.item} />
        </TouchableOpacity>
      </Swipeout>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <TextInput
          style={styles.search}
          numberOfLines={1}
          autoCapitalize='none'
          autoCorrect={false}
          clearButtonMode='always'
          placeholder='Start typing a Title...'
          value={enteredQuery}
          onChangeText={enteredQueryHandler}
        />
        {
          filteredMovies.length
            ? <FlatList data={filteredMovies} renderItem={renderMovie} keyExtractor={mv => mv.imdbID} />
            : <Text style={styles.empty}>There are no Movies with requested Title</Text>
        }
      </SafeAreaView>
    </ScrollView>
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
    elevation: 5
  },
  empty: {
    alignSelf: 'center',
    height: '100%',
    lineHeight: 75
  }
});

export default Movies;
