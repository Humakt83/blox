import React from 'react';
import styled from 'styled-components/native';
import { Shape } from '../logic/Block';
import Square from './Square';

type Props = {
  shape: Shape,
}

const Piece : React.FC<Props> = ({shape}) => {

  return (
    <>
      {
        shape.block.formation.map((row: number[], index: Number) => {
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
    </>
  );
};


const Row = styled.View`
  display: flex;
  flex-direction: row;
`;

export default Piece;
