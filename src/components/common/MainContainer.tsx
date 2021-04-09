import React, {PropsWithChildren, ReactNode} from 'react';
import {SafeAreaView} from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

import {COLORS} from '../../Constants';

const MainContainer: React.FC<PropsWithChildren<ReactNode>> = props => {
  return (
    <SafeAreaView>
      <LinearGradient
        start={{x: 1, y: 1}}
        end={{x: 0, y: 0}}
        colors={[COLORS.white, COLORS.white, COLORS.lightgray, COLORS.black]}>
        <View>{props.children}</View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const View = styled.ScrollView`
  display: flex;
  min-height: 100%;
  min-width: 100%;
`;

export default MainContainer;
