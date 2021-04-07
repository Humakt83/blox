 import React, {PropsWithChildren, ReactNode} from 'react';
 import {
   SafeAreaView,
   ScrollView,
 } from 'react-native';
 import LinearGradient from 'react-native-linear-gradient';
 
 import {COLORS} from '../../Constants';
 
 const MainContainer: React.FC<PropsWithChildren<ReactNode>> = props => {
   
   return (
     <SafeAreaView>
      <LinearGradient start={{x:1, y: 1}} end={{x:0, y:0}} colors={[COLORS.white, COLORS.white, COLORS.lightgray, COLORS.black]}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {props.children}
        </ScrollView>
      </LinearGradient>
     </SafeAreaView>
      
   );
};
 
export default MainContainer;

 