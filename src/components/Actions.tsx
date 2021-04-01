import React from 'react';
import { Direction, Shape } from '../logic/Block';
import { DraxView } from 'react-native-drax';
import styled from 'styled-components/native';
import Piece from './Piece';

type Props = {
  rotatePiece: Function,
  activeShape: Shape,
  restart: Function,
  skip: Function,
  dragStartFn: Function
}

const Actions: React.FC<Props> = ({rotatePiece, activeShape, restart, skip, dragStartFn}) => {

  return (
    <View>
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
        <Button onPress={() => restart()}>
            <ButtonText>RESTART</ButtonText>
          </Button>
          <Button onPress={() => skip()}>
            <ButtonText>
              SKIP
            </ButtonText>
          </Button>
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

const Button = styled.TouchableOpacity`
  width: 80px;
  height: 30px;
  background-color: rgb(46, 185, 250);
  border-radius: 15px;
  align-items: center;
  justify-content: center;
`

const ButtonText = styled.Text`
  font-size: 13px;
  color: white;
  font-weight: bold;
`

const CommandMenu = styled.View`
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export default Actions;
