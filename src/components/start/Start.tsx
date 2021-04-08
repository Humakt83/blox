import React from 'react';

import ActionButton from '../common/ActionButton';
import styled from 'styled-components/native';
import MainContainer from '../common/MainContainer'
import Title from './Title';

const Start = ({navigation}: any) => {

  const startGame = () => {
    navigation.navigate('Game');
  };

  const help = () => {
    navigation.navigate('Help');
  }

  return (
    <MainContainer>
      <View>
        <Title />
        <ActionButton text="START" clickFn={startGame}/>
        <ButtonSeparator />
        <ActionButton text="HELP" clickFn={help} />
      </View>
    </MainContainer>
  );
};

const View = styled.View`
  display: flex;
  margin-top: 15px;
  align-items: center;
`;

const ButtonSeparator = styled.View`
  margin-bottom: 10px;
`

export default Start;
