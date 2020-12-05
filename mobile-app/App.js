import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {FontAwesome5, AntDesign, Ionicons} from '@expo/vector-icons';

import InfoTab from './components/InfoTab';
import Gallery from './components/Gallery';
import Movies from './components/Movies';
import FullMovie from './components/FullMovie';
import NewMovie from './components/NewMovie';

const Tab = createBottomTabNavigator();
const MoviesStack = createStackNavigator();

const App = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      let response = await fetch('https://de57b61d0341.ngrok.io/movies')
      let responseData = await response.json();
      setMovies(responseData);
    })();
  }, []);

  const onRemoveMovieHandler = imdbId => {
    setMovies(currentMovies => currentMovies.filter(mv => mv.imdbID !== imdbId));
  };

  const onAddMovieHandler = movie => {
    setMovies(currentMovies => [...currentMovies, movie]);
  };

  const routing = ({route}) => ({
    tabBarIcon: ({focused, color, size}) => {
      const activeSize = focused ? size * 1.05 : size * .85;

      if (route.name === 'Info') {
        return <FontAwesome5 name='info' size={activeSize} color={color} />;
      } else if (route.name === 'Movies') {
        return <AntDesign name='database' size={activeSize} color={color} />;
      } else if (route.name === 'Add Movie') {
        return <AntDesign name='plussquare' size={activeSize} color={color} />;
      } else if (route.name === 'Gallery') {
        return <Ionicons name='ios-images' size={activeSize} color={color} />;
      }
    }
  });

  const MoviesStackScreen = () => (
    <MoviesStack.Navigator>
      <MoviesStack.Screen
        name='Movies'
        children={() => <Movies movies={movies} onRemoveMovie={onRemoveMovieHandler} />}
      />
      <MoviesStack.Screen
        name='Full Movie'
        component={FullMovie}
      />
    </MoviesStack.Navigator>
  );

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={routing}
        tabBarOptions={{
          inactiveTintColor: 'black',
          activeTintColor: 'blue'
        }}>
        <Tab.Screen name='Gallery' component={Gallery} />
        <Tab.Screen name='Movies' component={MoviesStackScreen} />
        <Tab.Screen name='Add Movie' children={() => <NewMovie onAddMovie={onAddMovieHandler} />} />
        <Tab.Screen name='Info' component={InfoTab} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
