import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';

import Game from './src/components/game/Game';
import Start from './src/components/start/Start';

const Stack = createStackNavigator();

const App = () => {

  const options: StackNavigationOptions = {headerShown: false};
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Start" component={Start} options={options} />
        <Stack.Screen name="Game" component={Game} options={options} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
