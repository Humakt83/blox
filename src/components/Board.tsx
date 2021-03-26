import React, {useState} from 'react';
import Square from './Square';
import Piece from './Piece';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {rotate, Direction, randomShape, Shape} from '../logic/Block';
import { DraxProvider, DraxView } from 'react-native-drax';

import {Button} from 'react-native';
import styled from 'styled-components/native';
import {createBoard, placePiece, getMovableBoard, getEmptyMovableBoard} from '../logic/Blox';
import {makeAIMove} from '../logic/AI';

const Board = () => {

  const [shape, setShape] = useState(randomShape());
  const [gameBoard, setGameBoard] = useState(createBoard());
  const [movableBoard, setMovableBoard] = useState(getEmptyMovableBoard());
  const [partOfPieceDragged, setPartOfPieceDragged] = useState({x: 0, y: 0});

  const rotatePiece = (direction: Direction) => {
    setShape(rotate(shape, direction));
  };

  const putPiece = (payload: Shape, row: number, column: number) => {
    if (movableBoard[row][column]) {
      const {x, y} = partOfPieceDragged;
      let newBoard = placePiece(gameBoard, payload, row, column, y, x);
      newBoard = makeAIMove(newBoard);
      setGameBoard(newBoard);
      const piece = randomShape();
      setShape(piece);
      setMovableBoard(getEmptyMovableBoard());
    }
  };

  const restart = () => {
    setGameBoard(createBoard());
    setShape(randomShape());
    setMovableBoard(getEmptyMovableBoard());
  };

  const skip = () => {
    setGameBoard(makeAIMove(gameBoard));
  };

  return (
    <GestureHandlerRootView>
      <DraxProvider>
        <View>
          {
            gameBoard.map((row: number[], index: number) => {
              return (
                <Row key={`row-${index}`}>
                  {                   
                    row.map((column: number, indexCol: number) => {
                      return (
                        <DraxView 
                            onReceiveDragDrop={({ dragged: { payload } }) => putPiece(payload, index, indexCol)}
                            key={`drax-${index}-${indexCol}`}>
                          <Square color={column} movable={movableBoard[index][indexCol]} key={`col-${index}-${indexCol}`}/>
                        </DraxView>
                      )
                    })
                  }
                </Row>
              )
            })
          }            
        </View>
        <View>
          <PieceView>
            <RotateButton onPress={() => rotatePiece(Direction.CLOCKWISE)}>
              <RotateButtonText>↩️</RotateButtonText>
            </RotateButton>
            <DraxView payload={shape}>
              <Piece shape={shape} dragStartFn={(x: number, y: number) => {
                setPartOfPieceDragged({x, y});
                setMovableBoard(getMovableBoard(gameBoard, shape, y, x));
              }}/>
            </DraxView>
            <RotateButton onPress={() => rotatePiece(Direction.COUNTERCLOCKWISE)}>
              <RotateButtonText>↪️</RotateButtonText>
            </RotateButton>
          </PieceView>
          <Button onPress={restart} title="Restart"/>
          <Button onPress={skip} title="Skip"/>
        </View>
      </DraxProvider>
    </GestureHandlerRootView>
  );
};

const View = styled.View`
  display: flex;
  margin-top: 15px;
  align-items: center;
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

const Row = styled.View`
  display: flex;
  flex-direction: row;
`;

export default Board;
