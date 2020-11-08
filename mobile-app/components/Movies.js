import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import Movie from './Movie';

const Movies = () => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		(async () => {
			let response = await fetch('https://8aebb2537381.ngrok.io/movies')
			let responseData = await response.json();
			setMovies(responseData.Search);
		})();
	}, []);

	const renderMovie = movie => (
		<Movie
			title={movie.item['Title']}
			year={movie.item['Year']}
			type={movie.item['Type']}
			poster={movie.item['Poster']}
		/>
	);

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={movies}
				renderItem={renderMovie}
				keyExtractor={movie => movie['imdbID']}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
			marginTop: 20,
	},
});

export default Movies;
