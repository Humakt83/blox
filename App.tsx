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

 import Board from './src/components/Board';

 const App = () => {
  
   return (
     <SafeAreaView>
       <ScrollView contentInsetAdjustmentBehavior="automatic">
         <Board />
       </ScrollView>
     </SafeAreaView>
   );
 };

 export default App;
