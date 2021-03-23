import React from 'react';
import Square from './Square';
import styled from 'styled-components/native';

const ROWS = 11;
const COLUMNS = 10;

let board: Number[][] = new Array<Array<Number>>(ROWS);
board = board.fill(new Array<Number>(COLUMNS).fill(0));

const Board = () => {

   return (
      <View>
        {
          board.map((row: Number[], index: Number) => {
            return (
              <Row key={`row-${index}`}>
                {                   
                  row.map((column: Number, indexCol: Number) => {
                    return (
                      <Square key={`col-${index}-${indexCol}`}/>
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
  margin-top: 5px;
  align-items: center;
`;

const Row = styled.View`
  display: flex;
  flex-direction: row;
`;

export default Board;
