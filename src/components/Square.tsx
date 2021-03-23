import React from 'react';
import styled from 'styled-components/native';

const COLOR_MAP = ['white', 'red'];

type Props = {
  color: number;
}

const Square: React.FC<Props> = ({color = 0}) => {

  const opacity = color === -1 ? 0 : 1;

  const View = styled.View`
    width: 35px;
    height: 35px;
    background: ${COLOR_MAP[Math.max(0, color)]};
    border: 1px solid black;
    opacity: ${opacity}
  `;

   return (
     <View />
   );
};

export default Square;
