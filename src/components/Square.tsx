import React from 'react';
import styled from 'styled-components/native';

const COLOR_MAP = ['white', 'red'];

type Props = {
  color?: number;
  movable?: boolean;
}

const Square: React.FC<Props> = ({color = 0, movable = false}) => {

  const opacity = color === -1 ? 0 : 1;

  const View = styled.View`
    width: 30px;
    height: 30px;
    background: ${movable? 'yellow' : COLOR_MAP[Math.max(0, color)]};
    border: 1px solid black;
    opacity: ${opacity}
  `;

  const GradientA = styled.View`
    z-index: 2;
    width: 10px;
    height: 30px;
    background: white;
    opacity: 0.6;
    margin-left: 10px;
  ` 

  const GradientB = styled.View`
    z-index: 1;
    width: 20px;
    height: 30px;
    background: white;
    opacity: 0.3;
    margin-left: 10px;
  ` 

   return (
    <View>
      <GradientB>
        <GradientA/>
      </GradientB>
    </View>
   );
};

export default Square;
