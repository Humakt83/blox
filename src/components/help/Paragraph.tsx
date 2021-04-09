import React from 'react';

import styled from 'styled-components/native';
import {COLORS} from '../../Constants';

type Props = {
  content: string;
};

const Paragraph: React.FC<Props> = ({content}) => {
  return (
    <Block>
      <Text>{content}</Text>
    </Block>
  );
};

const Block = styled.View`
  margin-bottom: 7px;
  padding: 5px;
  background-color: ${COLORS.white};
  border-radius: 3px;
  width: 340px;
`;

const Text = styled.Text`
  margin-bottom: 10px;
`;

export default Paragraph;
