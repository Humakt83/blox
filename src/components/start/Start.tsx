import React from 'react';

import ActionButton from '../common/ActionButton';
import styled from 'styled-components/native';
import MainContainer from '../common/MainContainer'
import Title from './Title';

const Start = ({navigation}: any) => {

  const startGame = () => {
    navigation.navigate('Game');
  };

  return (
    <MainContainer>
      <View>
        <Title />
        <ActionButton text="START" clickFn={() => startGame()}/>
      </View>
    </MainContainer>
  );
};

const View = styled.View`
  display: flex;
  margin-top: 15px;
  align-items: center;
`;

export default Start;
