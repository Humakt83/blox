import React from 'react';
import Square from './Square';
import { DraxView } from 'react-native-drax';
import styled from 'styled-components/native';

type Props = {
  gameBoard: number[][],
  movableBoard: boolean[][],
  putPiece: Function
}

const Board: React.FC<Props> = ({gameBoard, putPiece, movableBoard}) => {

  return (
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
