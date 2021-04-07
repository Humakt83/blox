/**
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {COLORS} from './src/Constants';
import Game from './src/components/Game';

const App = () => {
  
  return (
    <SafeAreaView>
      <LinearGradient start={{x:1, y: 1}} end={{x:0, y:0}} colors={[COLORS.white, COLORS.white, COLORS.lightgray, COLORS.black]}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Game />
      </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default App;
