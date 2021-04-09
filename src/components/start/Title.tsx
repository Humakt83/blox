import React from 'react';

import styled from 'styled-components/native';
import {COLORS} from '../../Constants';

const Title = () => {
  return (
    <BlackText>
      Blo<BlueText>X</BlueText>ro<RedText>X</RedText>
    </BlackText>
  );
};

const BlackText = styled.Text`
  color: ${COLORS.black};
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const RedText = styled.Text`
  color: ${COLORS.red};
`;

const BlueText = styled.Text`
  color: ${COLORS.blue};
`;

export default Title;
