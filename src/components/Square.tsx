import React from 'react';
import styled from 'styled-components/native';

const COLOR_MAP = ['white', 'red', 'black'];

type Props = {
  x?: number,
  y?: number,
  color?: number,
  movable?: boolean,
  dragStartFn?: Function,
  small?: boolean
}

const Square: React.FC<Props> = ({x, y, color = 0, movable = false, dragStartFn, small = false}) => {

  const opacity = color === -1 ? 0 : 1;
  const size = small ? 12: 30;

  const View = styled.View`
    width: ${size}px;
    height: ${size}px;
    background: ${movable? 'yellow' : COLOR_MAP[Math.max(0, color)]};
    border: 1px solid black;
    opacity: ${opacity}
  `;

  const GradientA = styled.View`
    z-index: 2;
    width: ${size / 3}px;
    height: ${size}px;
    background: white;
    opacity: 0.6;
    margin-left: ${size / 3}px;
  `;

  const GradientB = styled.View`
    z-index: 1;
    width: ${size * 2 / 3}px;
    height: ${size}px;
    background: white;
    opacity: 0.3;
    margin-left: ${size / 3}px;
  `;

   return (
    <View onTouchStart={() => {
      if (dragStartFn) {
        dragStartFn(x, y);
      }
    }}>
      <GradientB>
        <GradientA/>
      </GradientB>
    </View>
   );
};

export default Square;
