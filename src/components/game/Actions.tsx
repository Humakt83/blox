import React from 'react';
import { Direction, Shape } from '../../logic/Block';
import { DraxView } from 'react-native-drax';
import styled from 'styled-components/native';
import Piece from './Piece';
import ActionButton from '../common/ActionButton';

type Props = {
  rotatePiece: Function,
  activeShape: Shape,
  restart: Function,
  skip: Function,
  dragStartFn: Function,
  help: Function,
  toMain: Function
}

const Actions: React.FC<Props> = ({rotatePiece, activeShape, restart, skip, dragStartFn, help, toMain}) => {

  return (
    <View>
      <CommandMenu>
        <ActionButton clickFn={skip} text="SKIP" />
        <ActionButton clickFn={restart} text="RESTART" />
      </CommandMenu>
      <PieceView>
        <RotateButton onPress={() => rotatePiece(Direction.CLOCKWISE)}>
          <RotateButtonText>↩️</RotateButtonText>
        </RotateButton>
        <DraxView payload={activeShape}>
          <Piece large={true} shape={activeShape} dragStartFn={dragStartFn}/>
        </DraxView>
        <RotateButton onPress={() => rotatePiece(Direction.COUNTERCLOCKWISE)}>
          <RotateButtonText>↪️</RotateButtonText>
        </RotateButton>
      </PieceView>
      <CommandMenu>
        <ActionButton clickFn={toMain} text="MAIN" />
        <ActionButton clickFn={help} text="HELP" />
      </CommandMenu>
    </View>
  );
};

const View = styled.View`
  display: flex;
  flex-direction: row;
`;

const RotateButton = styled.TouchableOpacity`
  width: 30px;
  height: 30px;  
  background-color: rgb(46, 185, 250);
  border-radius: 15px;
  align-items: center;
  margin: 0 5px;
  justify-content: center;
`;

const RotateButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

const PieceView = styled.View`
  display: flex;
  flex-direction: row;
`;

const CommandMenu = styled.View`
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export default Actions;
