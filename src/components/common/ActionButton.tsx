import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../Constants';

type Props = {
  clickFn: Function,
  text: string,
  disabled?: boolean,
}

const ActionButton: React.FC<Props> = ({clickFn, text, disabled = false}) => {

  const Button = styled.TouchableOpacity`
    width: 80px;
    height: 30px;
    background-color: ${!disabled ? COLORS.blue : COLORS.lightgray};
    border-radius: 5px;
    align-items: center;
    justify-content: center;
  `;

  const click = () => {
    if (!disabled) {
      clickFn();
    }
  }

  return (
    <Button onPress={click}>
        <ButtonText>{text}</ButtonText>
    </Button>
  );
};

const ButtonText = styled.Text`
  font-size: 13px;
  color: ${COLORS.white};
  font-weight: bold;
`;

export default ActionButton;
