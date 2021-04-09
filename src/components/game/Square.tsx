import React from 'react';
import styled from 'styled-components/native';
import { COLORS, PLAYER_COLOR_MAP } from '../../Constants';

export enum SquareSizes {
  XS, S, M
}

export const COLOR_MAP = [COLORS.white].concat(PLAYER_COLOR_MAP) ;

const convertSize = (size: SquareSizes) : number => {
  switch(size) {
    case SquareSizes.XS:
      return 6;
    case SquareSizes.S: 
      return 12;
    default:
      return 30;
  }
}

type Props = {
  x?: number,
  y?: number,
  color?: number,
  movable?: boolean,
  dragStartFn?: Function,
  clickFn?: Function,
  squareSize?: SquareSizes
}

const Square: React.FC<Props> = ({x, y, color = 0, movable = false, dragStartFn, clickFn, squareSize = SquareSizes.M}) => {

  const opacity = color === -1 ? 0 : 1;
  const size = convertSize(squareSize) ;

  const Container = styled.View`
    width: ${size}px;
    height: ${size}px;
  `;
  
  const View = styled.View`
    border: 1px solid ${COLORS.black};
    z-index: 1;
    width: ${size}px;
    height: ${size}px;
    background: ${movable? COLORS.yellow : COLOR_MAP[Math.max(0, color)]};
    opacity: ${opacity};
  `;

  const GradientA = styled.View`
    z-index: 3;
    width: ${size / 3}px;
    height: ${size}px;
    background: ${COLORS.white};
    opacity: 0.6;
    position: absolute;
  `;

  const GradientB = styled.View`
    z-index: 2;
    width: ${size * 2 / 3}px;
    height: ${size}px;
    background: ${COLORS.white};
    opacity: 0.3;
    position: absolute;
  `;

  return (
    <Container onTouchEnd={() => {
      if (clickFn) {
        clickFn(x, y)
      }
    }} onTouchStart={() => {
      if (dragStartFn) {
        dragStartFn(x, y);
      }
    }}>
      <View>
        <GradientB>
          <GradientA>
          </GradientA>
        </GradientB>
      </View>
    </Container>
  );
};

export default Square;
