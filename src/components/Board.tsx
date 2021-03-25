import React, {useState} from 'react';
import Square from './Square';
import Piece from './Piece';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {rotate, Direction, randomShape, Shape} from '../logic/Block';
import { DraxProvider, DraxView } from 'react-native-drax';

import {Button} from 'react-native';
import styled from 'styled-components/native';
import {createBoard, placePiece, getMovableBoard, getEmptyMovableBoard} from '../logic/Blox';

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
      const newBoard = placePiece(gameBoard, payload, row, column, y, x);
      setGameBoard(newBoard);
      const piece = randomShape();
      setShape(piece);
      setMovableBoard(getEmptyMovableBoard());
    }
  }

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
          <DraxView payload={shape}>
            <Piece shape={shape} dragStartFn={(x: number, y: number) => {
              setPartOfPieceDragged({x, y});
              setMovableBoard(getMovableBoard(gameBoard, shape, y, x));
            }}/>
          </DraxView>
          <Button onPress={() => rotatePiece(Direction.CLOCKWISE)} title='Rotate Clockwise' />
          <Button onPress={() => rotatePiece(Direction.COUNTERCLOCKWISE)} title='Rotate Counterclockwise' />
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

const Row = styled.View`
  display: flex;
  flex-direction: row;
`;

export default Board;
