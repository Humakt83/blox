import React, {useState} from 'react';
import Square from './Square';
import Piece from './Piece';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {UShape, rotate, Direction} from '../logic/Block';
import { DraxProvider, DraxView } from 'react-native-drax';

import {Button} from 'react-native';
import styled from 'styled-components/native';

const ROWS = 11;
const COLUMNS = 10;

let board: number[][] = new Array<Array<number>>(ROWS);
for (let i = 0; i < ROWS; i++) {
  board[i] = new Array<number>(COLUMNS).fill(0);
}

const Board = () => {

  const [gameBoard, setGameBoard] = useState(board);

  const [shape, setShape] = useState(new UShape());


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
                            const newBoard = [...gameBoard];
                            const formation = payload.block.formation;
                            const yAdjustment = ROWS < (index + formation.length) ? Math.abs(ROWS - (index + formation.length)) : 0
                            const xAdjustment = COLUMNS < (indexCol + formation[0].length) ? Math.abs(COLUMNS - (indexCol + formation[0].length)) : 0
                            for (let y = index; y < index + formation.length; y++) {
                              for (let x = indexCol; x < indexCol + formation[0].length; x++) {
                                if (formation[y-index][x-indexCol] > 0) {
                                  newBoard[y-yAdjustment][x-xAdjustment] = formation[y-index][x-indexCol];
                                }
                              }
                            }
                            setGameBoard(newBoard);
                          }} key={`drax-${index}-${indexCol}`}>
                            <Square color={column} key={`col-${index}-${indexCol}`}/>
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
            <Button onPress={() => setShape(rotate(shape, Direction.CLOCKWISE))} title='Rotate Clockwise' />
            <Button onPress={() => setShape(rotate(shape, Direction.COUNTERCLOCKWISE))} title='Rotate Counterclockwise' />
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
