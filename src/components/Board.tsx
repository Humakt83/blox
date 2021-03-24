import React, {useState} from 'react';
import Square from './Square';
import Piece from './Piece';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {rotate, Direction, randomShape} from '../logic/Block';
import { DraxProvider, DraxView } from 'react-native-drax';

import {Button} from 'react-native';
import styled from 'styled-components/native';
import {createBoard, placePiece, getMovableBoard} from '../logic/Blox';

const Board = () => {

  const [shape, setShape] = useState(randomShape());
  const [gameBoard, setGameBoard] = useState(createBoard());
  const [movableBoard, setMovableBoard] = useState(getMovableBoard(gameBoard, shape));

  const rotatePiece = (direction: Direction) => {
    const piece = rotate(shape, direction);
    setShape(piece);
    setMovableBoard(getMovableBoard(gameBoard, piece));
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
                        <DraxView onReceiveDragDrop={({ dragged: { payload } }) => {
                          if (movableBoard[index][indexCol]) {
                            const newBoard = placePiece(gameBoard, payload, index, indexCol);
                            setGameBoard(newBoard);
                            const piece = randomShape();
                            setShape(piece);
                            setMovableBoard(getMovableBoard(newBoard, piece));
                          }
                        }} key={`drax-${index}-${indexCol}`}>
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
            <Piece shape={shape} />
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
