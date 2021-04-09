import React from 'react';

import ActionButton from '../common/ActionButton';
import styled from 'styled-components/native';
import {Difficulty} from '../../logic/Difficulty';
import {COLORS} from '../../Constants';

type Props = {
  difficulty: Difficulty;
  setDifficultyFn: Function;
};

const DifficultySelector: React.FC<Props> = ({difficulty, setDifficultyFn}) => {
  return (
    <View>
      <Text>Difficulty</Text>
      <ButtonsView>
        <ActionButton
          text="NORMAL"
          clickFn={() => setDifficultyFn(Difficulty.NORMAL)}
          disabled={difficulty === Difficulty.NORMAL}
        />
        <ActionButton
          text="HARD"
          clickFn={() => setDifficultyFn(Difficulty.HARD)}
          disabled={difficulty === Difficulty.HARD}
        />
        <ActionButton
          text="EXPERT"
          clickFn={() => setDifficultyFn(Difficulty.EXPERT)}
          disabled={difficulty === Difficulty.EXPERT}
        />
      </ButtonsView>
    </View>
  );
};

const View = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${COLORS.white};
  padding: 2px 5px 10px;
  border-radius: 3px;
`;

const ButtonsView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 270px;
`;

const Text = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

export default DifficultySelector;
