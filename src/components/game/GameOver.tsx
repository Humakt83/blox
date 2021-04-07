import React from 'react';
import styled from 'styled-components/native';
import {COLORS, PLAYER_COLOR_MAP} from '../../Constants';
import {flatten} from 'lodash';
import ActionButton from '../common/ActionButton';

type Props = {
  board: number[][],
  restart: Function
}

const GameOver : React.FC<Props> = ({board, restart}) => {

  const getPlayerStats = (color: number, board: number[][]): {name: string, amount: number} => {
    const name = Object.keys(COLORS).find((k: string, index: number) => PLAYER_COLOR_MAP[color] === Object.values(COLORS)[index]) || 'unknown';
    const amount = flatten(board).filter((column: number) => column === color + 1).length;
    return {name, amount};
  };

  const getWinnerText = (stats: {name: string, amount: number}[] ): string => {
    const winner = stats.reduce((prev, next) => next.amount > prev.amount ? next : prev);
    const isDraw = stats.filter(st => st.amount === winner.amount).length > 1;
    return isDraw? 'DRAW!' : `${winner.name} IS VICTORIOUS!`;
  }

  const playerStats = PLAYER_COLOR_MAP.map((color: string, index: number) => getPlayerStats(index, board));

  return (
    <Shadow>
      <Container>
        <TitleText>Game Over!</TitleText>
        <TitleText>{getWinnerText(playerStats)}</TitleText>
        {playerStats.map((stats, index) => {
          return (
            <Text key={`stats-${index}`}>{stats.name}: {stats.amount}</Text>
          )
        })}
        <ActionButton text="RESTART" clickFn={restart} />
      </Container>
    </Shadow>
  );
};


const Shadow = styled.View`
  position: absolute;
  z-index: 20;
  width: 100%;
  height: 100%;
  background: ${COLORS.black};
  opacity: 0.8;
  align-items: center;
`;
  
const Container = styled.View`
  display: flex;
  border-radius: 3px;
  align-items: center;
  margin-top: 50px;
  padding: 15px;
  background: ${COLORS.black};
  width: 80%;
`;
  
const TitleText = styled.Text`
    color: ${COLORS.white}
    font-size: 24px;
    font-weight: bold;
    text-transform: uppercase;
`;

const Text = styled.Text`
  color: ${COLORS.white};
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 5px;
`;

export default GameOver;
