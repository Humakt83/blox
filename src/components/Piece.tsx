import React from 'react';
import styled from 'styled-components/native';
import { Shape } from '../logic/Block';
import Square from './Square';
import {View} from 'react-native';

type Props = {
  shape: Shape,
  dragStartFn?: Function,
  small?: boolean
}

const Piece : React.FC<Props> = ({shape, dragStartFn, small = false}) => {

  return (
    <View>
      {
        shape.block.formation.map((row: number[], index: number) => {
          return (
            <Row key={`row-${index}`}>
              {                   
                row.map((column: number, indexCol: number) => {
                  return (
                    <Square 
                      color={column}
                      key={`col-${index}-${indexCol}`}
                      dragStartFn={dragStartFn}
                      y={index}
                      x={indexCol}
                      small={small}
                    />
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


const Row = styled.View`
  display: flex;
  flex-direction: row;
`;

export default Piece;
