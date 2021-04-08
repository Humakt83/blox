import React, {useState} from 'react';

import ActionButton from '../common/ActionButton';
import styled from 'styled-components/native';
import MainContainer from '../common/MainContainer'
import Title from './Title';
import {Difficulty} from '../../logic/Difficulty'
import DifficultySelector from './DifficultySelector';

const Start = ({navigation}: any) => {

  const [difficulty, setDifficulty] = useState(Difficulty.NORMAL);

  const startGame = () => {
    navigation.navigate('Game', {difficulty});
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
        <DifficultySelector difficulty={difficulty} setDifficultyFn={setDifficulty} />
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
