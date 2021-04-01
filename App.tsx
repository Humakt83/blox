/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
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

 import Game from './src/components/Game';

 const App = () => {
  
   return (
     <SafeAreaView>
       <ScrollView contentInsetAdjustmentBehavior="automatic">
         <Game />
       </ScrollView>
     </SafeAreaView>
   );
 };

 export default App;
