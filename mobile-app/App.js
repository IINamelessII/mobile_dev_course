import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import InfoTab from './components/InfoTab';
import Movies from './components/Movies';
import {FontAwesome5} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const App = () => {

  const routing = ({route}) => ({
    tabBarIcon: ({focused, color, size}) => {
      const activeSize = focused ? size * 1.05 : size * .85;

      if (route.name === 'Info') {
        return <FontAwesome5 name='info' size={activeSize} color={color} />;
      } else if (route.name === 'Movies') {
        return <MaterialCommunityIcons name='library-movie' size={activeSize} color={color} />;
      }
    }
  });
  
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={routing}
        tabBarOptions={{
          inactiveTintColor: 'black',
          activeTintColor: 'blue'
        }}>
        <Tab.Screen name='Info' component={InfoTab} />
        <Tab.Screen name='Movies' component={Movies} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
