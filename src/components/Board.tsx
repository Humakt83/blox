import React from 'react';
import Square from './Square';
import Piece from './Piece';
import {UShape} from '../logic/Block';

import styled from 'styled-components/native';

const ROWS = 11;
const COLUMNS = 10;

let board: number[][] = new Array<Array<number>>(ROWS);
board = board.fill(new Array<number>(COLUMNS).fill(0));

const Board = () => {

   return (
      <>
        <View>
          {
            board.map((row: number[], index: Number) => {
              return (
                <Row key={`row-${index}`}>
                  {                   
                    row.map((column: number, indexCol: Number) => {
                      return (
                        <Square color={column} key={`col-${index}-${indexCol}`}/>
                      )
                    })
                  }
                </Row>
              )
            })
          }
            
        </View>
        <View>
          <Piece shape={new UShape()} />
        </View>
      </>
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
