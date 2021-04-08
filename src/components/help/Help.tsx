import React from 'react';

import styled from 'styled-components/native';
import MainContainer from '../common/MainContainer';
import Paragraph from './Paragraph';

const Help = () => {

  return (
    <MainContainer>
      <View>
        <Header>Help</Header>
        <Paragraph content="Goal of the game is to fill as many squares on the board with your pieces as possible." />
        <Paragraph content="Winner is the player who has with filled most squares on the board with his or her pieces. Solid plan is to use the larger pieces first as the smaller ones are easier to fit later." />
        <Paragraph content="You have one active piece shown that you can rotate to fit the board better. Drag the active piece and drop it on a highlighted area on the board. You can change the active piece by touching other pieces of the same color underneath it. Opponent pieces are also shown in a list so you can plan easier what pieces to place. Press the skip button if you cannot place a piece on the board."/>
        <Paragraph content="Game ends after you have placed your last piece or no pieces can be placed on the board anymore."/>
      </View>
    </MainContainer>
  );
};

const View = styled.View`
  display: flex;
  margin-top: 15px;
  align-items: center;
  text-align: center;
`;

const Header = styled.Text`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 15px;
`;

export default Help;
